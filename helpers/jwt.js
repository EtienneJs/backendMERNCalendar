const jwt = require("jsonwebtoken");

const generateJwt = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SECRET_KEY_TOKEN,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se puede resolver");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJwt,
};
