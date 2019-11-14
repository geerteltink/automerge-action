/* eslint-disable global-require */
const nock = require('nock');
const path = require('path');

describe('Merge pull request', () => {
  beforeEach(() => {
    jest.resetModules();

    process.env.GITHUB_TOKEN = 'token';
    process.env.GITHUB_REPOSITORY = 'owner/repo';
  });

  test('it throws an error if pull request is not found', async () => {
    process.env.GITHUB_EVENT_PATH = path.join(__dirname, 'fixtures/ctx.issue.json');

    const run = require('../src/merge.js');

    await expect(run()).rejects.toThrow('Could not get pull request information from context');
  });

  test('it should get pr number from check_suite event', async () => {
    process.env.GITHUB_EVENT_PATH = path.join(__dirname, 'fixtures/ctx.check-suite.json');

    const run = require('../src/merge.js');

    nock('https://api.github.com')
      .get('/repos/owner/repo/pulls/6')
      .reply(200, {});

    await expect(run()).rejects.toThrow('Could not get pull request information from API');
  });

  test('it throws an error if state is not open', async () => {
    process.env.GITHUB_EVENT_PATH = path.join(__dirname, 'fixtures/ctx.check-suite.json');

    const run = require('../src/merge.js');

    nock('https://api.github.com')
      .get('/repos/owner/repo/pulls/6')
      .reply(200, {
        number: 1,
        state: 'closed',
      });

    await expect(run()).rejects.toThrow(/Pull request state must be open/);
  });

  test('it throws an error if not mergeable', async () => {
    process.env.GITHUB_EVENT_PATH = path.join(__dirname, 'fixtures/ctx.check-suite.json');

    const run = require('../src/merge.js');

    nock('https://api.github.com')
      .get('/repos/owner/repo/pulls/6')
      .reply(200, {
        number: 1,
        state: 'open',
        mergeable: false,
      });

    await expect(run()).rejects.toThrow(/Pull request must be mergeable/);
  });
});

/*
    state: 'open',
    locked: false,
    title: 'ci: test label repo',
    body: '',
    number: 1,
    merged: false,
    mergeable: true,
    rebaseable: true,
    mergeable_state: 'unstable',
*/
