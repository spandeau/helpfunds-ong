export default {
  publishScheduledArticles: {
    task: async ({ strapi }: { strapi: any }) => {
      const now = new Date().toISOString();
      strapi.log.info(`[Cron] Verification des articles a publier (${now})`);

      try {
        const drafts = await strapi.documents("api::article.article").findMany({
          status: "draft",
          filters: {
            scheduledAt: { $lte: now },
          },
        });

        strapi.log.info(`[Cron] ${drafts.length} article(s) a publier trouve(s)`);

        for (const article of drafts) {
          try {
            await strapi.documents("api::article.article").publish({
              documentId: article.documentId,
            });
            strapi.log.info(`[Cron] Article publie automatiquement: "${article.title}"`);
          } catch (error) {
            strapi.log.warn(`[Cron] Echec publication article ${article.documentId}: ${error}`);
          }
        }
      } catch (error) {
        strapi.log.warn(`[Cron] Erreur recherche articles a publier: ${error}`);
      }
    },
    options: {
      rule: "0 */5 * * * *",
    },
  },
};