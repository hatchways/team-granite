const express = require("express");
const router = express.Router();

const { sendTestEmail } = require("../controllers/email");

router.route("/test").post(sendTestEmail);

module.exports = router;
