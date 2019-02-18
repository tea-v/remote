import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';

const PUBLIC_KEYS = [
  {
    alg: 'RS256',
    e: 'AQAB',
    kid: 'kJnpfESb5GWt5cgmxNCuqDQPG1MJuFeKUZhV9MZNsLQ=',
    kty: 'RSA',
    n:
      'zMIxni3vKrEHEFdVE939uAj9SDeVJwg8vc31jtjlmay8iZMiBK9C8qP_HImcccBA2ipbnxs3Eprgc5Oar9cA6RTP6H2qCgVs7LMqRCxRo-xN82IpWN83eADHVaaw9GYB7U6kc155AT016eX9Gu0IxfKA8ygMWuQ-TAPMabC4rVO83_JoLMROqs2ZgH34S_nVl-ICyCi8mqoldwDKqORJGVk430A3nM1ULOEli62dmPhZIBnsIHv28JREqHc4L5E9MIYqLYWcaGT1ZXoxcSBchBc9lfCMZy6aV0I1qk7JaPAZzjZUAakO8UswP4Ndp9zGWxlKHmcmuKnmQGal9q8LyQ',
    use: 'sig',
  },
  {
    alg: 'RS256',
    e: 'AQAB',
    kid: 'hIQ5et1GN1LzY9P+r23plAdj113AE/EKpC/U7GSsk+o=',
    kty: 'RSA',
    n:
      'iFpxPMv10hEy8Air1bdIkpvG8F8N9aaNhsJkv1EDk54ObeEEL1kebm7TILIyoalA8wNX2yYIQCmlgKjoWiIbuB2bDJZLChEFGkSZB1Wx7nSLgVGQb-hTVC0VyBQuYeAFhBswlL8s9kbkoablGTDkZFMiinFtg3ddk70AaXK-g5OKY984vUfSg0DHBgE2xPRKv1utyUR6E0WFUSdIpImSpviZxmpYGcDHahRCATXSWPMDIH3custY9ge9LWgRTc18fouXhb-LF1fy-l_aAFJSBL7pw6qAxN3tLMju6wo1mY1yixtAsQb8UtgXfMww77uyGrbTfxwNKB5YiDNWgypVaw',
    use: 'sig',
  },
];
const USER_POOL_URL =
  'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_Vj3XvUGw2';

const getCertificates = () =>
  PUBLIC_KEYS.reduce(
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
