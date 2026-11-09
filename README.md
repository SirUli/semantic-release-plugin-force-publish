# @siruli/semantic-release-plugin-force-publish

A [semantic-release](https://github.com/semantic-release/semantic-release) plugin that lets you force a release from CI, even when none of the commits would trigger one.

## Why

semantic-release reads your commit messages and decides whether a release is needed. If everything since the last release is `docs:`, `chore:` or `build:`, it publishes nothing. That is usually right, but sometimes you want a release anyway, for example after a dependency bump in a package that bundles its dependencies, or to republish after fixing the pipeline.

This plugin gives you a switch for that. It checks an environment variable. If the variable has the value you configured, the plugin tells semantic-release to cut a release of a type you choose (`patch` by default). If the variable is missing or has a different value, the plugin does nothing and the normal commit analysis decides.

## Installation

```sh
npm install --save-dev @siruli/semantic-release-plugin-force-publish
```

or with yarn:

```sh
yarn add --dev @siruli/semantic-release-plugin-force-publish
```

## Usage

Add the plugin to the `plugins` list in your semantic-release configuration:

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    [
      "@siruli/semantic-release-plugin-force-publish",
      {
        "releaseType": "patch",
        "releaseVariable": "CREATE_RELEASE",
        "releaseIf": "1"
      }
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github"
  ]
}
```

Then set the variable in the job that runs semantic-release. With the settings above:

```sh
CREATE_RELEASE=1 npx semantic-release
```

### Options

| Option            | Values                                  | Default          |
|-------------------|-----------------------------------------|------------------|
| `releaseType`     | `patch`, `minor` or `major`             | `patch`          |
| `releaseVariable` | Name of the environment variable to read | `CREATE_RELEASE` |
| `releaseIf`       | Value the variable must have exactly    | `1`              |

Any other `releaseType` falls back to `patch`.

### How it behaves

- The plugin implements only the `analyzeCommits` step. It never looks at the commits themselves.
- The variable must be set and equal to `releaseIf` as a string. An unset variable, an empty one, or a different value (`0`, `false`) means no forced release.
- semantic-release runs every `analyzeCommits` plugin and takes the highest release type. If a `feat:` commit is waiting and you force a `patch`, you still get a minor release. Forcing never lowers the version bump.
- If you list plugins explicitly, include `@semantic-release/commit-analyzer` yourself. Otherwise your commits are no longer analyzed, and only forced releases happen.
- The plugin only decides the version bump. Release notes, tagging and publishing work as they do for any other release.

### Example: manual release from GitHub Actions

```yaml
on:
  workflow_dispatch:
    inputs:
      force_release:
        type: boolean
        description: Release even if no commit triggers one

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      # checkout, setup and install steps omitted
      - run: npx semantic-release
        env:
          CREATE_RELEASE: ${{ inputs.force_release && '1' || '' }}
```

This repository releases itself the same way, see [.github/workflows/release.yml](.github/workflows/release.yml).

## Development

Install the packages with yarn. Use corepack to get the Yarn version pinned in `package.json`:

```sh
corepack enable
yarn install
```

Run the tests with `yarn test`. They use [Vitest](https://vitest.dev) and print a coverage report.

## License

[MIT](LICENSE)
