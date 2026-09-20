# Security policy

## Supported version

Security fixes are applied to the latest revision of the `main` branch and the
currently deployed version of Headhunt.cc.

## Reporting a vulnerability

Do not open a public issue for a suspected vulnerability, exposed credential,
or authentication bypass. Use GitHub's **Report a vulnerability** feature in
the Security tab of this repository.

Include the affected route or component, reproduction steps, expected impact,
and any suggested mitigation. Please avoid accessing, changing, or retaining
data that does not belong to you.

Maintainers will acknowledge a valid report as soon as practical and coordinate
disclosure after a fix is available. No bounty program is currently offered.

## Sensitive data

Import URLs contain authentication tokens and must be treated as secrets. Never
include an Import URL, Google OAuth secret, refresh token, Cloudflare token, or
environment file in an issue, pull request, screenshot, or test fixture.
