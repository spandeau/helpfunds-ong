export default ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.resend.com"),
        port: env.int("SMTP_PORT", 465),
        secure: true,
        auth: {
          user: env("SMTP_USERNAME", "resend"),
          pass: env("SMTP_PASSWORD"),
        },
      },
      settings: {
        defaultFrom: env("SMTP_DEFAULT_FROM", "Help Funds <onboarding@resend.dev>"),
        defaultReplyTo: env("SMTP_DEFAULT_REPLY_TO", "helpfunds17@gmail.com"),
      },
    },
  },
});