
jest.mock('@actions/core');
jest.mock('@actions/github');

const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');
const run = require('../src/merge.js');

describe('Create Release', () => {
  let get;

  beforeEach(() => {
    get = jest.fn().mockReturnValueOnce({
      data: {
        id: 'releaseId',
        html_url: 'htmlUrl',
        upload_url: 'uploadUrl',
      },
    });

    context.repo = {
      owner: 'owner',
      repo: 'repo',
    };

    context.payload = {
      check_suite: {
        pull_requests: undefined,
      },
    };

    const github = {
      pulls: {
        get,
      },
    };

    GitHub.mockImplementation(() => github);
  });

  test('owner and repo is detected and no pull request is found', async () => {
    await run();

    expect(core.debug).toHaveBeenCalledWith('repository: owner/repo');
    expect(core.info).toHaveBeenCalledWith('Could not get pull request information from context, exiting');
  });

  test('end if no pull request is found', async () => {
    context.payload.check_suite.pull_requests = [
      {
        id: 339958849,
        number: 6,
      },
    ];

    core.getInput = jest
      .fn()
      .mockReturnValueOnce('github_token');

    await run();

    expect(core.info).toHaveBeenCalledWith('pull request detected: 6');
    expect(get).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      pull_number: 6,
    });
  });
});
