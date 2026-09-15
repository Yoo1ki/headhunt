import { execFileSync } from 'node:child_process';

const git = (...args) =>
  execFileSync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();

const stopDeploy = (message) => {
  console.error(`\nDeployment canceled: ${message}\n`);
  process.exit(1);
};

const getUpstream = () => {
  try {
    return git(
      'rev-parse',
      '--abbrev-ref',
      '--symbolic-full-name',
      '@{upstream}'
    );
  } catch {
    return stopDeploy(
      'the current branch has no upstream. Push it with --set-upstream first.'
    );
  }
};

const isGitRepository = () => {
  try {
    return git('rev-parse', '--is-inside-work-tree') === 'true';
  } catch {
    return false;
  }
};

const isContinuousIntegration =
  process.env.CI === 'true' ||
  process.env.GITHUB_ACTIONS === 'true' ||
  Boolean(process.env.CF_PAGES);

const checkDeploy = () => {
  if (!isGitRepository()) {
    console.warn(
      'Deploy check skipped: no Git repository was found. Build ID will use the package version.'
    );
    return;
  }

  const changes = git('status', '--porcelain');
  if (changes) {
    stopDeploy(
      'there are uncommitted changes. Commit and push them before deploying.'
    );
  }

  if (isContinuousIntegration) {
    console.log(
      'Deploy check passed: clean Git checkout detected in a CI environment.'
    );
    return;
  }

  const upstream = getUpstream();
  const unpushedCommitCount = Number(
    git('rev-list', '--count', `${upstream}..HEAD`)
  );

  if (unpushedCommitCount > 0) {
    stopDeploy(
      `${unpushedCommitCount} commit(s) have not been pushed to ${upstream}.`
    );
  }

  console.log(`Deploy check passed: HEAD is available on ${upstream}.`);
};

try {
  checkDeploy();
} catch (error) {
  if (error instanceof Error) {
    stopDeploy(`the Git check failed. ${error.message}`);
  }

  stopDeploy('the Git check failed.');
}
