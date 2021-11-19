const sendGrid = require("@sendgrid/mail");
const client = require("@sendgrid/client");

client.setApiKey(process.env.SENDGRID_API_KEY);
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const request = {
  method: "GET",
  url: "/v3/templates?generations=dynamic",
};

const TEMPLATES = [];

const loadTemplates = () => {
  client.request(request).then((response) => {
    try {
      response[0].body.templates.map((template) => {
        TEMPLATES.push(template);
      });
    } catch (error) {
      //This console statement is required as errors are not logged without it.
      console.error(error);
    }
  });
};

loadTemplates();

const sendTemplateEmail = async (user, templateName, substitutionStrings) => {
  const template = TEMPLATES.find(
    (templateObj) => templateObj.name === templateName
  );
  const msg = {
    to: user.email,
    from: process.env.SENDER_EMAIL,
    templateId: template.id,
    dynamicTemplateData: substitutionStrings,
  };
  //Error handler not needed since, inside controllers.(async-handler).
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
