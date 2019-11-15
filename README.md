# automerge GitHub Action

This action merges pull requests if all requirements are met.

## Example usage

```yaml
uses: xtreamwayz/automerge-action@master
with:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
env:
  ACTIONS_STEP_DEBUG: true
```

## Develop

```bash
npm install
npm run test
npm run lint
npm run build
```

## Rules

Merge pull request if:

- [x] the `auto-merge` label is set
- [x] the `work-in-progress` label is not set
- [x] the pull request is up to date (open, mergable, merged)
- [x] the required checks have passed (if enabled in the branch protection rules)
- [x] the required number of review approvals has been given (if enabled in the branch protection rules)
- [ ] TODO: automerge dependabot
- [ ] TODO: require check_suite (Travis CI / Circle CI)
- [ ] the pr has a milestone set

## Contributing

***BEFORE you start work on a feature or fix***, please read & follow the
[contributing guidelines](https://github.com/xtreamwayz/.github/blob/master/CONTRIBUTING.md#contributing)
to help avoid any wasted or duplicate effort.

## Copyright and license

Code released under the [MIT License](https://github.com/xtreamwayz/.github/blob/master/LICENSE.md).
Documentation distributed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
