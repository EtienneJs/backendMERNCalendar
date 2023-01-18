const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No authenticate",
    });
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    req.uid = payload.uid;
    req.name = payload.name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token No Valido",
    });
  }
  next();
};
module.exports = {
  verifyToken,
};
