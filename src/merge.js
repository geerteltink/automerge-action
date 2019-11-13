const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

function getPullRequestFromContext() {
  if (!context.payload) {
    return undefined;
  }

  if (context.payload.pull_request && context.payload.pull_request.number) {
    // pull_request event
    return context.payload.pull_request.number;
  }

  if (!context.payload.check_suite || !context.payload.check_suite.pull_requests) {
    return undefined;
  }

  // check_suite event
  for (const pullRequest of context.payload.check_suite.pull_requests) {
    if (pullRequest.number) {
      return pullRequest.number;
    }
  }

  return undefined;
}

const run = async () => {
  // console.log(JSON.stringify(context, undefined, 2));

  // Get owner and repo from context of payload that triggered the action
  const { owner, repo } = context.repo;
  core.debug(`repository: ${owner}/${repo}`);

  const pull_number = getPullRequestFromContext();
  if (!pull_number) {
    core.warning('Could not get pull request information from context, exiting');
    return;
  }
  core.info(`pull request detected: ${pull_number}`);

  const token = core.getInput('repo-token');
  const github = new GitHub(token);

  const pr = await github.pulls.get({
    owner,
    repo,
    pull_number,
  });

  console.log(JSON.stringify(pr, undefined, 2));
};

module.exports = run;
