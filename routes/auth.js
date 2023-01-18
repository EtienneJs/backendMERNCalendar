const { Router } = require("express");
const { check } = require("express-validator");
const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controller/auth");
const { validateError } = require("../middlewares/validate");
const { verifyToken } = require("../middlewares/verifyToken");
const router = Router();

router.post(
  "/new",
  [
    check("name", "El nombre es Obligatorio").not().isEmpty(),
    check("email", "El email es Obligatorio o incorrecto").isEmail(),
    check("password", "El nombre es Obligatorio").isLength({ min: 6 }),
    validateError,
  ],
  createUser
);
router.post(
  "/",
  [
    check("email", "El email es Obligatorio o incorrecto").isEmail(),
    check("password", "El nombre es Obligatorio").isLength({ min: 6 }),
    validateError,
  ],
  loginUser
);
router.get("/renew", verifyToken, revalidateToken);

module.exports = router;
