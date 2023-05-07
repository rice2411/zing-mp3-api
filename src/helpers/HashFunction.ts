import { randomBytes, createHmac } from "crypto";

const saltChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const saltCharsCount = saltChars.length;

function generateSalt(len) {
  let salt;
  if (typeof len !== "number" || len <= 0 || len !== parseInt(<any>len, 10)) {
    throw new Error("Invalid salt length");
  }
  if (randomBytes) {
    return randomBytes(Math.ceil(len / 2))
      .toString("hex")
      .substring(0, len);
  }
  for (let i = 0, salt = ""; i < len; i++) {
    salt += saltChars.charAt(Math.floor(Math.random() * saltCharsCount));
  }
  return salt;
}

function generateHash(algorithm, salt, password, iterations) {
  iterations = iterations || 1;
  try {
    let hash = password;
    for (let i = 0; i < iterations; ++i) {
      hash = createHmac(algorithm, salt).update(hash).digest("hex");
    }

    return algorithm + "$" + salt + "$" + iterations + "$" + hash;
  } catch (e) {
    throw new Error("Invalid message digest algorithm");
  }
}

function makeBackwardCompatible(hashedPassword) {
  const parts = hashedPassword.split("$");
  if (parts.length === 3) {
    parts.splice(2, 0, 1);
    hashedPassword = parts.join("$");
  }

  return hashedPassword;
}

const generate = (password, options = undefined) => {
  if (typeof password !== "string") {
    throw new Error("Invalid password");
  }
  options || (options = {});
  options.algorithm || (options.algorithm = "sha1");
  options.saltLength || options.saltLength === 0 || (options.saltLength = 8);
  options.iterations || (options.iterations = 1);
  const salt = generateSalt(options.saltLength);
  return generateHash(options.algorithm, salt, password, options.iterations);
};

const verify = (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    return false;
  }
  hashedPassword = makeBackwardCompatible(hashedPassword);
  const parts = hashedPassword.split("$");
  if (parts.length !== 4) {
    return false;
  }
  try {
    return (
      generateHash(parts[0], parts[1], password, parts[2]) === hashedPassword
    );
  } catch (e) {}
  return false;
};

const isHashed = (password) => {
  if (!password) {
    return false;
  }
  return password.split("$").length === 4;
};

export default { verify, generate, isHashed };
