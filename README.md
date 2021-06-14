# MultiplePublish

MultiplePublish is npm script that allows publishing to multiple registries.

## Supported Registry

Github, NPM

## Installation

### As a local `npm run` script

Install as devDependency

```bash
npm i --dev-save multiple-publish 
```

<!-- ```bash
npm install @jjzajac/multiple-publish --registry https://npm.pkg.github.com/
``` -->

## Configuration

### In `package.json` add

```jsonld
// package.json
{
...
  "multiplePublish": [
    {
      "type": "github",
      "access": "public",
      "scope": scope,
      "registry": "https://npm.pkg.github.com/"
    },
    {
      "type": "npm",
      "access": "public"
    }
  ]
}
```

## Publish options
```jsonld
{
"type":     "github" or "npm"
"access":   "public" or "restricted"
"scope":    scope will be add before name "scope/name"
            must start with @,
"registry": registry where package will be publish, 
            if you want publish to npm this field is redundant
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

<!-- Please make sure to update tests as appropriate. -->

## License
[MIT](https://github.com/jjzajac/MultiplePublish/LICENSE)
