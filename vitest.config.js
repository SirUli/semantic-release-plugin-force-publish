module.exports = {
  test: {
    environment: "node",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "cobertura"],
      include: ["index.js"],
      reportsDirectory: "./coverage",
    },
  },
};
