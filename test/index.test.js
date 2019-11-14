/* eslint-disable global-require */
const nock = require('nock');
const path = require('path');
const os = require('os');

/**
 * Assert that process.stdout.write calls called with all of the given arguments.
 *
 * ex.:
 *  assertWriteCalls([
 *    [`Pull request state must be open (currently: closed)${os.EOL}`],
 *  ]);
 *//*
function assertWriteCalls(calls) {
  expect(process.stdout.write.mock.calls).toEqual(
    expect.arrayContaining(calls),
  );
}
*/

/**
 * Assert that process.stdout.write was last called with all of the given arguments.
 *
 * ex.: assertLastWriteCall('Pull request state must be open (currently: closed)');
 */
function assertLastWriteCall(call) {
  expect(process.stdout.write).toHaveBeenLastCalledWith(call + os.EOL);
}

describe('Merge pull request', () => {
  beforeEach(() => {
    jest.resetModules();

    process.env.GITHUB_TOKEN = 'token';
    process.env.GITHUB_REPOSITORY = 'owner/repo';

    process.stdout.write = jest.fn();
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

  test('pull request must have the auto-merge label', async () => {
    process.env.GITHUB_EVENT_PATH = path.join(__dirname, 'fixtures/ctx.check-suite.json');

    const run = require('../src/merge.js');

    nock('https://api.github.com')
      .get('/repos/owner/repo/pulls/6')
      .reply(200, {
        number: 1,
      });

    await run();

    assertLastWriteCall('::warning::Pull request does not have the auto-merge label');
  });

  test('pull request must not have the work-in-progress label', async () => {
    process.env.GITHUB_EVENT_PATH = path.join(__dirname, 'fixtures/ctx.check-suite.json');

    const run = require('../src/merge.js');

    nock('https://api.github.com')
      .get('/repos/owner/repo/pulls/6')
      .reply(200, {
        number: 1,
        labels: [{ name: 'auto-merge' }, { name: 'work-in-progress' }],
      });

    await run();

    assertLastWriteCall('::warning::Pull request has the work-in-progress label');
  });

  test('pull request state must not be closed', async () => {
    process.env.GITHUB_EVENT_PATH = path.join(__dirname, 'fixtures/ctx.check-suite.json');

    const run = require('../src/merge.js');

    nock('https://api.github.com')
      .get('/repos/owner/repo/pulls/6')
      .reply(200, {
        number: 1,
        labels: [{ name: 'auto-merge' }],
        state: 'closed',
        mergeable: true,
        merged: false,
      });

    await run();

    assertLastWriteCall('::warning::Pull Request is not in a mergeable state');
  });

  test('pull request must not be not mergeable', async () => {
    process.env.GITHUB_EVENT_PATH = path.join(__dirname, 'fixtures/ctx.check-suite.json');

    const run = require('../src/merge.js');

    nock('https://api.github.com')
      .get('/repos/owner/repo/pulls/6')
      .reply(200, {
        number: 1,
        labels: [{ name: 'auto-merge' }],
        state: 'open',
        mergeable: false,
        merged: false,
      });

    await run();

    assertLastWriteCall('::warning::Pull Request is not in a mergeable state');
  });

  test('pull request must not be merged', async () => {
    process.env.GITHUB_EVENT_PATH = path.join(__dirname, 'fixtures/ctx.check-suite.json');

    const run = require('../src/merge.js');

    nock('https://api.github.com')
      .get('/repos/owner/repo/pulls/6')
      .reply(200, {
        number: 1,
        labels: [{ name: 'auto-merge' }],
        state: 'open',
        mergeable: false,
        merged: true,
      });

    await run();

    assertLastWriteCall('::warning::Pull Request is not in a mergeable state');
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
