import fetch from 'node-fetch';
import jwkToPEM from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import memoize from 'lodash/memoize';

type PublicKey = { [key in 'alg' | 'e' | 'kid' | 'kty' | 'n' | 'use']: string };

const { USER_POOL_URL } = process.env;

const getPublicKeys = async () => {
  const { keys }: { keys: PublicKey[] } = await fetch(
    `${USER_POOL_URL}/.well-known/jwks.json`
  ).then((value) => value.json());
  return keys;
};

const getCertificates = memoize(async () => {
  const publicKeys = await getPublicKeys();
  return publicKeys.reduce(
    (certificates, publicKey) => {
      const { e, kid, kty, n } = publicKey;
      certificates[kid] = jwkToPEM({ e, kty, n });
      return certificates;
    },
    {} as { [key: string]: string }
  );
});

const unauthorizedResponse = {
  status: '401',
  statusDescription: 'Unauthorized',
};

export default async (
  event: { [key: string]: any },
  _context: unknown,
  callback: (error: null, result: object) => any
) => {
  const { request } = event.Records[0].cf;
  const { headers } = request;
  if (!headers.authorization) {
    callback(null, unauthorizedResponse);
    return false;
  }
  const token = headers.authorization[0].value.slice(7);
  const decodedJWT = jwt.decode(token, { complete: true });
  if (!decodedJWT || typeof decodedJWT === 'string') {
    callback(null, unauthorizedResponse);
    return false;
  }
  if (decodedJWT.payload.iss !== USER_POOL_URL) {
    callback(null, unauthorizedResponse);
    return false;
  }
  if (decodedJWT.payload.token_use !== 'access') {
    callback(null, unauthorizedResponse);
    return false;
  }
  const {
    header: { kid },
  } = decodedJWT;
  const certificate = (await getCertificates())[kid];
  if (!certificate) {
    callback(null, unauthorizedResponse);
    return false;
  }
  jwt.verify(token, certificate, { issuer: USER_POOL_URL }, (err) => {
    if (err) {
      callback(null, unauthorizedResponse);
      return false;
    }
    delete headers.authorization;
    callback(null, request);
    return true;
  });
};
