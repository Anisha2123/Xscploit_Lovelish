export const sendForgotOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const now = new Date();

    if (!email) {
      return res.status(400).json({ error: "EMAIL_REQUIRED" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "USER_NOT_FOUND" });
    }

    const existingOtp = await Otp.findOne({ email });

    if (existingOtp?.lockedUntil > now) {
      return res.status(423).json({
        error: "OTP_LOCKED",
        retryAfter: Math.ceil(
          (existingOtp.lockedUntil - now) / 1000
        ),
      });
    }

    if (existingOtp?.resendAfter > now) {
      return res.status(429).json({
        error: "RESEND_TOO_SOON",
        retryAfter: Math.ceil(
          (existingOtp.resendAfter - now) / 1000
        ),
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.findOneAndUpdate(
      { email },
      {
        otp,
        attempts: 0,
        expiresAt: new Date(now.getTime() + 5 * 60 * 1000),
        resendAfter: new Date(now.getTime() + 60 * 1000),
        lockedUntil: null,
        purpose: "FORGOT_PASSWORD",
      },
      { upsert: true }
    );

    await superagent
      .post("https://api.brevo.com/v3/smtp/email")
      .set("api-key", process.env.BREVO_API_KEY)
      .send({
        sender: {
          name: "Xsploit Security",
          email: process.env.SENDER_EMAIL,
        },
        to: [{ email }],
        subject: "Password Reset OTP",
        htmlContent: `
          <h2>Password Reset</h2>
          <p>Your OTP is <b>${otp}</b></p>
          <p>Valid for 5 minutes.</p>
        `,
      });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OTP_FAILED" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passRegex.test(password)) {
      return res.status(400).json({ error: "WEAK_PASSWORD" });
    }

    const hashed = await hash(password, 10);

    await User.updateOne(
      { email },
      { password: hashed }
    );

    await Otp.deleteOne({ email, purpose: "FORGOT_PASSWORD" });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: "RESET_FAILED" });
  }
};
