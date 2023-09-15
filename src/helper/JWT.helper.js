const fs = require('node:fs/promises');
const {
  importPKCS8,
  importSPKI,
  SignJWT,
  jwtVerify,
  decodeJwt,
} = require('jose');

/**
 * Encode Payload
 *
 * @param {object} data
 * @param {object} options
 * @returns {Promise<string>}
 */
const Encode = (data = {}, options = {}) =>
  new Promise((resolve, reject) => {
    const algorithm = options.algo || process.env.JWT_ALGO;
    fs.readFile(process.env.JWT_PRIVATE_KEY, { encoding: 'utf-8' }).then(
      (PKCS8) => {
        importPKCS8(PKCS8.toString(), algorithm).then((privateKey) => {
          const JWT = new SignJWT(data)
            .setProtectedHeader({ alg: algorithm })
            .setIssuedAt()
            .setIssuer(options.issuer || process.env.JWT_ISSUER)
            .setAudience(options.audience || process.env.JWT_AUDIENCE)
            .setExpirationTime(options.expiration || process.env.JWT_EXPIRE)
            .sign(privateKey);
          resolve(JWT);
        }, reject);
      },
    );
  });

/**
 * Verify JWT
 *
 * @param {string} token
 * @param {object} options
 * @returns {Promise<import('jose').JWTVerifyResult>}
 */
const Verify = (token, options = {}) =>
  new Promise((resolve, reject) => {
    const algorithm = options.algo || process.env.JWT_ALGO;
    fs.readFile(process.env.JWT_PUBLIC_KEY, { encoding: 'utf-8' }).then(
      (SPKI) => {
        importSPKI(SPKI.toString(), algorithm).then((publicKey) => {
          jwtVerify(token, publicKey, {
            issuer: options.issuer || process.env.JWT_ISSUER,
            audience: options.audience || process.env.JWT_AUDIENCE,
          }).then(resolve, reject);
        }, reject);
      },
      reject,
    );
  });

/**
 * Decode JWT
 *
 * @param {string} token
 * @returns {import('jose').JWTPayload}
 */
const Decode = (token) => decodeJwt(token);

module.exports = {
  Encode,
  Verify,
  Decode,
};
