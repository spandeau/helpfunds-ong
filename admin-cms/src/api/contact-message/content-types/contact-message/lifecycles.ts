export default {
  async afterCreate(event) {
    const { result } = event;
    const notifyEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "helpfunds17@gmail.com";

    try {
      await strapi.plugin("email").service("email").send({
        to: notifyEmail,
        subject: `Nouveau message de contact - ${result.firstName} ${result.lastName}`,
        text: [
          "Nouveau message recu via le formulaire de contact du site.",
          "",
          `Nom : ${result.firstName} ${result.lastName}`,
          `Email : ${result.email}`,
          result.phone ? `Telephone : ${result.phone}` : null,
          result.reason ? `Sujet : ${result.reason}` : null,
          "",
          "Message :",
          result.message,
        ].filter(Boolean).join("\n"),
      });
    } catch (error) {
      strapi.log.warn(`[Email] Echec envoi notification message de contact: ${error}`);
    }
  },
};