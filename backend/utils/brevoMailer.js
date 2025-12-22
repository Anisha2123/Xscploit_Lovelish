import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendOtpEmail = async (email, otp) => {
  await tranEmailApi.sendTransacEmail({
    sender: {
      email: process.env.SENDER_EMAIL,
      name: "Your App",
    },
    to: [{ email }],
    subject: "Your OTP Verification Code",
    htmlContent: `
      <div style="font-family:Arial;max-width:520px">
        <h2>Email Verification</h2>
        <p>Your OTP code:</p>
        <h1 style="letter-spacing:4px">${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
      </div>
    `,
  });
};
