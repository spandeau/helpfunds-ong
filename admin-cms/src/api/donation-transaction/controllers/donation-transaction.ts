import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::donation-transaction.donation-transaction",
  ({ strapi }) => ({
    async recentPublic(ctx) {
      const transactions = await strapi
        .documents("api::donation-transaction.donation-transaction")
        .findMany({
          filters: { paymentStatus: "completed" },
          sort: { createdAt: "desc" },
          fields: ["amount", "donorFirstName", "donorLastName", "anonymous", "createdAt"],
          pageSize: 5,
        });

      const sanitized = (transactions || []).map((t) => {
        const lastInitial = t.donorLastName ? t.donorLastName.charAt(0) + "." : "";
        const displayName = t.anonymous
          ? "Anonyme"
          : `${t.donorFirstName || "Un donateur"} ${lastInitial}`.trim();

        return {
          name: displayName,
          amount: t.amount,
          createdAt: t.createdAt,
        };
      });

      ctx.body = { data: sanitized };
    },
  })
);