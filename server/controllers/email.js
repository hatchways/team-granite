const asyncHandler = require("express-async-handler");
const { sendTemplateEmail } = require("../sendGrid");

exports.sendTestEmail = asyncHandler(async (req, res, next) => {
  const { firstName, testString, email } = req.body;
  const TemplateName = "Test";

  const dummyUser = {
    email: email,
  };

  await sendTemplateEmail(dummyUser, TemplateName, { firstName, testString });

  res.status(200).json({
    success: "Email sent!",
  });
});
