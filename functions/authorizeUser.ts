import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';

const getCertificates = () =>
  USER_POOL_PUBLIC_KEYS.reduce(
    (certificates, publicKey) => {
      const { e, kid, kty, n } = publicKey;
      certificates[kid] = jwkToPem({ e, kty, n });
      return certificates;
    },
    {} as { [key: string]: string }
  );

const unauthorizedResponse = {
  status: '401',
  statusDescription: 'Unauthorized',
};

export const handler = async (
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
    decodedJWT.payload.iss !== USER_POOL_URL ||
    decodedJWT.payload.token_use !== 'access'
  ) {
    return callback(null, unauthorizedResponse);
  }
  const certificate = (await getCertificates())[decodedJWT.header.kid];
  if (!certificate) {
    return callback(null, unauthorizedResponse);
  }
  jwt.verify(token, certificate, { issuer: USER_POOL_URL }, (err) => {
    if (err) {
      callback(null, unauthorizedResponse);
    } else {
      delete headers.authorization;
      callback(null, request);
    }
  });
};
