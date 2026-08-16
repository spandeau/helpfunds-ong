export default {
  async afterCreate(event) {
    const { result } = event;
    const notifyEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "helpfunds17@gmail.com";

    try {
      await strapi.plugin("email").service("email").send({
        to: notifyEmail,
        subject: `Nouvelle demande de partenariat - ${result.organizationName}`,
        text: [
          "Nouvelle demande de partenariat recue.",
          "",
          `Organisation : ${result.organizationName}`,
          `Contact : ${result.contactName}`,
          `Email : ${result.email}`,
          result.phone ? `Telephone : ${result.phone}` : null,
          result.website ? `Site web : ${result.website}` : null,
          "",
          "Message :",
          result.message,
        ].filter(Boolean).join("\n"),
      });
    } catch (error) {
      strapi.log.warn(`[Email] Echec notification partenariat: ${error}`);
    }
  },
};