# Continuous integration action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

uses: actions/hello-world-javascript-action@v1
with:
  who-to-greet: 'Mona the Octocat'

## Resources

- https://github.com/sdras/awesome-actions
- https://doc.mergify.io/getting-started.html
- https://github.com/actions/hello-world-javascript-action

- https://medium.com/mergify/automatic-merge-of-github-security-fixes-87d7781140c0
- https://alexwlchan.net/2019/03/creating-a-github-action-to-auto-merge-pull-requests/
- https://jeffrafter.com/working-with-github-actions/
