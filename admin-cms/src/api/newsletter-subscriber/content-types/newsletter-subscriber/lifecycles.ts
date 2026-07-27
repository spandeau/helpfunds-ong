export default {
  async afterCreate(event) {
    const { result } = event;
    const notifyEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "helpfunds17@gmail.com";

    try {
      await strapi.plugin("email").service("email").send({
        to: notifyEmail,
        subject: `Nouvel abonne newsletter - ${result.email}`,
        text: [
          "Nouvel abonne a la newsletter.",
          "",
          `Email : ${result.email}`,
          result.firstName ? `Prenom : ${result.firstName}` : null,
          result.lastName ? `Nom : ${result.lastName}` : null,
          `Source : ${result.source || "inconnue"}`,
        ].filter(Boolean).join("\n"),
      });
    } catch (error) {
      strapi.log.warn(`[Email] Echec envoi notification newsletter: ${error}`);
    }
  },
};