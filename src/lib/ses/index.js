import AWS from "aws-sdk";

AWS.config.update({
  region: "ap-south-1",
  accessKeyId: process.env.NEXT_APP_S3_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_APP_S3_AWS_SECRET_KEY,
});

const ses = new AWS.SES();

/**
 * Sends a templated email using Amazon SES
 */
export const sendTemplatedEmail = async ({
  toEmail,
  templateName,
  templateData,
}) => {
  const params = {
    Destination: {
      ToAddresses: [toEmail],
    },
    Source: process.env.NEXT_APP_EMAIL_FROM,
    Template: templateName,
    TemplateData: JSON.stringify(templateData),
  };

  return ses.sendTemplatedEmail(params).promise();
};
