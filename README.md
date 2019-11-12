# Continuous integration action

This action merges pull requests if all requirements are met.

## Inputs

### `debug`

**Optional**

## Example usage

uses: xtreamwayz/auto-merge-action
with:
  debug: true

## Develop

npm install --production

npm install-peerdeps --dev eslint-config-airbnb-base

## Resources

- https://github.com/sdras/awesome-actions
- https://doc.mergify.io/getting-started.html
- https://github.com/actions/hello-world-javascript-action
- https://github.com/actions/create-release/blob/master/src/create-release.js
- https://octokit.github.io/rest.js/#octokit-routes-repos

- https://medium.com/mergify/automatic-merge-of-github-security-fixes-87d7781140c0
- https://alexwlchan.net/2019/03/creating-a-github-action-to-auto-merge-pull-requests/
- https://jeffrafter.com/working-with-github-actions/
- https://github.com/pascalgn/automerge-action
- https://github.com/ridedott/dependabot-auto-merge-action
- https://github.com/gimenete/eslint-action/blob/master/lib/run.js
