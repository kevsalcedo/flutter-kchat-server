const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          //No se pudo crear el token
          reject("Token could not be created");
        } else {
          //TOKEN
          resolve(token);
        }
      }
    );
  });
};

const checkJWT = (token = '') => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);

    return [true, uid]
  } catch (error) {
    return [false, null]
  }
}

module.exports = {
  generateJWT,
  checkJWT,
};
