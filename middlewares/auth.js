const jwt = require("jsonwebtoken");
const JWT_SECRET =
  process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "dev-secret";

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Se requiere autorización" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: "Se requiere autorización" });
  }

  req.user = payload;
  next();
};
