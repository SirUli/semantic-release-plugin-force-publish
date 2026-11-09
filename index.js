/**
 * Determine the type of release to create based on a list of commits.
 *
 * @param {Object} pluginConfig The plugin configuration.
 * @param {String} pluginConfig.preset conventional-changelog preset ('angular', 'atom', 'codemirror', 'ember', 'eslint', 'express', 'jquery', 'jscs', 'jshint')
 * @param {String} pluginConfig.config Requirable npm package with a custom conventional-changelog preset
 * @param {String|Array} pluginConfig.releaseRules A `String` to load an external module or an `Array` of rules.
 * @param {Object} pluginConfig.parserOpts Additional `conventional-changelog-parser` options that will overwrite ones loaded by `preset` or `config`.
 * @param {Object} context The semantic-release context.
 * @param {Array<Object>} context.commits The commits to analyze.
 * @param {String} context.cwd The current working directory.
 *
 * @returns {String|null} the type of release to create based on the list of commits or `null` if no release has to be done.
 */
function analyzeCommits(pluginConfig, context) {
  const { env, commits, logger } = context;

  if (pluginConfig.releaseVariable) {
    logger.log("Checking for release variable: '%s'", pluginConfig.releaseVariable);
    releaseVariable = pluginConfig.releaseVariable;
  } else {
    logger.log("Checking for release variable: 'CREATE_RELEASE'");
    releaseVariable = "CREATE_RELEASE";
  }
  if (pluginConfig.releaseIf) {
    logger.log("Checking for release variable content '%s'", pluginConfig.releaseIf);
    releaseIf = pluginConfig.releaseIf;
  } else {
    logger.log("Checking for release variable content: '1'");
    releaseIf = "1";
  }
  if (!env || !env[releaseVariable]) {
    logger.log(`The env variable ${releaseVariable} is not defined, skipping release`);
    return false;
  }
  if(env[releaseVariable] && env[releaseVariable] != releaseIf) {
    logger.log(`The env variable '${releaseVariable}' is defined but not with expected content '${releaseIf}', skipping release`);
    return false;
  } else {
    logger.log(`The env variable '${releaseVariable}' is defined with expected content '${releaseIf}' for a release, continuing`);
  }

  let releaseType = "patch";

  if (pluginConfig.releaseType == "major") {
    releaseType = "major";
  } else if (pluginConfig.releaseType == "minor") {
    releaseType = "minor";
  }

  logger.log("Analysis complete: %s release", releaseType);

  return releaseType;
}

module.exports = { analyzeCommits };
