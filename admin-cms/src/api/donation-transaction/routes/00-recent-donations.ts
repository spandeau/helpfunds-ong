export default {
  routes: [
    {
      method: "GET",
      path: "/donation-transactions/recent-public",
      handler: "donation-transaction.recentPublic",
      config: {
        auth: false,
      },
    },
  ],
};