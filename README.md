# Semantic Release Plugin: Force Publish

This plugin forces a release in Semantic Release whenever a configured environment variable is set to true.

## Settings

| Setting Name      | Setting Values                | Default Value    |
|-------------------|-------------------------------|------------------|
| `releaseType`     | `patch` or `minor` or `major` | `patch`          |
| `releaseVariable` | Any environment variable name | `CREATE_RELEASE` |
| `releaseIf`       | Variable Content to look for  | `1`              |

Example of a semantic release configuration (relevant part is in the "plugins" portion of the config):

```json
{
  "tagFormat": "v${version}",
  "branches": [
    "main"
  ],
  "plugins": [
    [
      "semantic-release-plugin-force-publish",
      {
        "releaseType": "patch",
        "releaseVariable": "CREATE_RELEASE",
        "releaseIf": "1"
      }
    ],
  ]
}
```

## Development

### Initialization

#### Yarn Installation

Install the packages through yarn. Make sure to use a latest version of Yarn by using corepack:

```sh
sudo corepack enable
yarn install
```

### Testing

Run `yarn test` to execute the test suite using Vitest.

## Author

[SirUli](https://github.com/SirUli)

## License

[MIT](LICENSE)
