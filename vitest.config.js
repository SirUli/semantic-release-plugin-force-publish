module.exports = {
  test: {
    environment: "node",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "json-summary", "json"],
      include: ["index.js"],
      reportsDirectory: "./coverage",
    },
  },
};
