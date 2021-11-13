const sendGrid = require("@sendgrid/mail");
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const request = {
  method: "GET",
  url: "/v3/templates?generations=dynamic",
};

const TEMPLATES = [];

client.request(request).then((response) => {
  try {
    response[0].body.templates.map((template) => {
      TEMPLATES.push(template);
    });
  } catch (error) {
    console.error(error);
  }
});

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendTemplateEmail = async (user, templateName, substitutionStrings) => {
  const templateId = TEMPLATES.find(
    (templateObj) => templateObj.templateName === templateName
  ).templateId;

  const msg = {
    to: user.email,
    from: process.env.SENDER_EMAIL,
    templateId: templateId,
    dynamicTemplateData: substitutionStrings,
  };
  //Error handler not used, to be used inside controllers.(async-handler).
  await sendGrid.send(msg);
};

const sendEmail = async (user, { subject, body, html }) => {
  const msg = {
    to: user.email,
    from: process.env.SENDER_EMAIL,
    subject: subject,
    body: body,
    html: html,
  };

  await sendGrid.send(msg);
};

module.exports = { sendTemplateEmail, sendEmail };
