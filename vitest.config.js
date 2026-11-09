module.exports = {
  test: {
    environment: "node",
    reporters: [["junit", { suiteName: "dragonhead", classnameTemplate: "filename:{filename} - filepath:{filepath}" }]],
    outputFile: {
      junit: "junit.xml",
    },
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "cobertura", "text-summary"],
      all: true,
      reportsDirectory: "./coverage",
    },
  },
};
