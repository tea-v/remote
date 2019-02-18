import fetch from 'node-fetch';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import memoize from 'lodash/memoize';

type PublicKey = { [key in 'alg' | 'e' | 'kid' | 'kty' | 'n' | 'use']: string };

const { COGNITO_URL, USER_POOL_ID } = process.env;

const userPoolURL = `${COGNITO_URL}/${USER_POOL_ID}`;

const getPublicKeys = async () => {
  const { keys }: { keys: PublicKey[] } = await fetch(
    `${userPoolURL}/.well-known/jwks.json`
  ).then((value) => value.json());
  return keys;
};

const getCertificates = memoize(async () => {
  const publicKeys = await getPublicKeys();
  return publicKeys.reduce(
    (certificates, publicKey) => {
      const { e, kid, kty, n } = publicKey;
      certificates[kid] = jwkToPem({ e, kty, n });
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
    return callback(null, unauthorizedResponse);
  }
  const token = headers.authorization[0].value.slice(7);
  const decodedJWT = jwt.decode(token, { complete: true });
  if (
    !decodedJWT ||
    typeof decodedJWT === 'string' ||
    decodedJWT.payload.iss !== userPoolURL ||
    decodedJWT.payload.token_use !== 'access'
  ) {
    return callback(null, unauthorizedResponse);
  }
  const certificate = (await getCertificates())[decodedJWT.header.kid];
  if (!certificate) {
    return callback(null, unauthorizedResponse);
  }
  jwt.verify(token, certificate, { issuer: userPoolURL }, (err) => {
    if (err) {
      callback(null, unauthorizedResponse);
    } else {
      delete headers.authorization;
      callback(null, request);
    }
  });
};
