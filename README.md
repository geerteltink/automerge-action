# Continuous integration action

This action merges pull requests if all requirements are met.

## Inputs

### `debug`

**Optional** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time the command ran.

## Example usage

uses: xtreamwayz/auto-merge-action
with:
  debug: true

## Resources

- https://github.com/sdras/awesome-actions
- https://doc.mergify.io/getting-started.html
- https://github.com/actions/hello-world-javascript-action

- https://medium.com/mergify/automatic-merge-of-github-security-fixes-87d7781140c0
- https://alexwlchan.net/2019/03/creating-a-github-action-to-auto-merge-pull-requests/
- https://jeffrafter.com/working-with-github-actions/
