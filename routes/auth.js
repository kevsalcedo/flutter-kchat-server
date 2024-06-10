const { Router } = require("express");
const { check } = require("express-validator");

const { createUser, login, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/new",
  [
    check("name", "The field name is obligatory").not().isEmpty(),
    check("email", "The field email is obligatory").not().isEmpty(),
    check("email", "The field email should be a valid email address")
      .trim()
      .isEmail(),
    check("password", "The field password is obligatory").not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "The field email is obligatory").not().isEmpty(),
    check("email", "The field email should be a valid email address")
      .trim()
      .isEmail(),
    check("password", "The field password is obligatory").not().isEmpty(),
    validateFields,
  ],
  login
);

router.get("/renew", validateJWT,  renewToken);

module.exports = router;

/* path = api/login */
