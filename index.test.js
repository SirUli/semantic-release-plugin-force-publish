const { analyzeCommits } = require("./index.js");

let context;
let pluginConfig;

beforeEach(() => {
  context = {
    env: {},
    commits: [],
    logger: {
      log: vi.fn(),
    },
  };

  pluginConfig = {};
});

test("No forced release", () => {
  expect(analyzeCommits(pluginConfig, context)).toBe(false);
});

test("No forced release via CREATE_RELEASE with default releaseType and default releaseIf", () => {
  context.env.CREATE_RELEASE = "0";
  expect(analyzeCommits(pluginConfig, context)).toBe(false);
});

test("No forced release via CREATE_RELEASE with default releaseType and releaseIf set to 'true'", () => {
  context.env.CREATE_RELEASE = "false";
  pluginConfig.releaseIf = "true";
  expect(analyzeCommits(pluginConfig, context)).toBe(false);
});

test("Forced release via CREATE_RELEASE with default releaseType and releaseIf set to 'true'", () => {
  context.env.CREATE_RELEASE = "true";
  pluginConfig.releaseIf = "true";
  expect(analyzeCommits(pluginConfig, context)).toBe("patch");
});

test("Forced release via CREATE_RELEASE with default releaseType and default releaseIf", () => {
  context.env.CREATE_RELEASE = "1";
  expect(analyzeCommits(pluginConfig, context)).toBe("patch");
});

test("Forced release via CREATE_RELEASE with patch releaseType and default releaseIf", () => {
  context.env.CREATE_RELEASE = "1";
  pluginConfig.releaseType = "patch";
  expect(analyzeCommits(pluginConfig, context)).toBe("patch");
});

test("Forced release via CREATE_RELEASE with minor releaseType and default releaseIf", () => {
  context.env.CREATE_RELEASE = "1";
  pluginConfig.releaseType = "minor";
  expect(analyzeCommits(pluginConfig, context)).toBe("minor");
});

test("Forced release via CREATE_RELEASE with major releaseType and default releaseIf", () => {
  context.env.CREATE_RELEASE = "1";
  pluginConfig.releaseType = "major";
  expect(analyzeCommits(pluginConfig, context)).toBe("major");
});

test("Forced release via RELEASE_ME with default releaseType and default releaseIf", () => {
  pluginConfig.releaseVariable = "RELEASE_ME";
  context.env.RELEASE_ME = "1";
  pluginConfig.releaseType = null;
  expect(analyzeCommits(pluginConfig, context)).toBe("patch");
});

test("Forced release via RELEASE_ME with patch releaseType and default releaseIf", () => {
  pluginConfig.releaseVariable = "RELEASE_ME";
  context.env.RELEASE_ME = "1";
  pluginConfig.releaseType = "patch";
  expect(analyzeCommits(pluginConfig, context)).toBe("patch");
});

test("Forced release via RELEASE_ME with minor releaseType and default releaseIf", () => {
  pluginConfig.releaseVariable = "RELEASE_ME";
  context.env.RELEASE_ME = "1";
  pluginConfig.releaseType = "minor";
  expect(analyzeCommits(pluginConfig, context)).toBe("minor");
});

test("Forced release via RELEASE_ME with major releaseType and default releaseIf", () => {
  pluginConfig.releaseVariable = "RELEASE_ME";
  context.env.RELEASE_ME = "1";
  pluginConfig.releaseType = "major";
  expect(analyzeCommits(pluginConfig, context)).toBe("major");
});
