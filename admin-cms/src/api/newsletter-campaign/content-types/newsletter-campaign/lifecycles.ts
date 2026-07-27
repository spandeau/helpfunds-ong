export default {
  async afterUpdate(event) {
    const { result } = event;

    if (result.status === "envoyee" && !result.sentAt) {
      try {
        const subscribers = await strapi
          .documents("api::newsletter-subscriber.newsletter-subscriber")
          .findMany({
            filters: { active: true },
            fields: ["email"],
            pageSize: 5000,
          });

        const emails = (subscribers || []).map((s) => s.email).filter(Boolean);
        const chunkSize = 40;
        let sentCount = 0;

        for (let i = 0; i < emails.length; i += chunkSize) {
          const chunk = emails.slice(i, i + chunkSize);
          try {
            await strapi.plugin("email").service("email").send({
              to: process.env.ADMIN_NOTIFICATION_EMAIL || "helpfunds17@gmail.com",
              bcc: chunk,
              subject: result.subject,
              text: result.content,
            });
            sentCount += chunk.length;
          } catch (error) {
            strapi.log.warn(`[Newsletter] Echec envoi lot: ${error}`);
          }
        }

        await strapi.documents("api::newsletter-campaign.newsletter-campaign").update({
          documentId: result.documentId,
          data: { sentAt: new Date().toISOString(), recipientCount: sentCount },
        });

        strapi.log.info(`[Newsletter] Campagne envoyee a ${sentCount} abonnes`);
      } catch (error) {
        strapi.log.warn(`[Newsletter] Erreur envoi campagne: ${error}`);
      }
    }
  },
};