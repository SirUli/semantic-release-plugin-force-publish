// The plugin is passed in as an object on purpose: semantic-release resolves string
// paths like "./index.js" relative to its own install directory, not this repository.
module.exports = {
  "tagFormat": "v${version}",
  "branches": [
    "main"
  ],
  "preset": "angular",
  "plugins": [
    "@semantic-release/commit-analyzer",
    [
      require("./index.js"),
      {
        "releaseType": "patch"
      }
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        "preset": "conventionalcommits",
        "presetConfig": {
          "types": [
            {
              "type": "feat",
              "section": "Features"
            },
            {
              "type": "fix",
              "section": "Bug Fixes"
            },
            {
              "type": "chore",
              "hidden": false,
              "section": "Chores"
            },
            {
              "type": "docs",
              "hidden": false,
              "section": "Documentation"
            },
            {
              "type": "style",
              "hidden": true
            },
            {
              "type": "refactor",
              "hidden": true
            },
            {
              "type": "perf",
              "hidden": true
            },
            {
              "type": "test",
              "hidden": true
            }
          ]
        }
      }
    ],
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        "assets": [
          "package.json"
        ],
        "message": "chore(release): ${nextRelease.version}\n\n${nextRelease.notes}"
      }
    ],
    "@semantic-release/github"
  ]
};
