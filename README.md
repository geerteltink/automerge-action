# Continuous integration action

This action merges pull requests if all requirements are met.

## Inputs

### `debug`

**Optional**

## Example usage

```yaml
uses: xtreamwayz/auto-merge-action
with:
  debug: true
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Develop

```bash
npm install
npm run build

npm install-peerdeps --dev eslint-config-airbnb-base
```

## Resources

- https://help.github.com/en/actions/automating-your-workflow-with-github-actions/using-environment-variables
- https://octokit.github.io/rest.js/#octokit-routes-repos

- https://github.com/ridedott/dependabot-auto-merge-action
- https://github.com/sdras/awesome-actions
- https://doc.mergify.io/getting-started.html
- https://github.com/actions/hello-world-javascript-action
- https://github.com/actions/create-release/blob/master/src/create-release.js
- https://medium.com/mergify/automatic-merge-of-github-security-fixes-87d7781140c0
- https://alexwlchan.net/2019/03/creating-a-github-action-to-auto-merge-pull-requests/
- https://jeffrafter.com/working-with-github-actions/
- https://github.com/pascalgn/automerge-action
- https://github.com/gimenete/eslint-action/blob/master/lib/run.js
