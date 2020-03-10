// prettier-ignore
module.exports = {
  types: [
    { value: 'WIP',      name: 'WIP:      Work in progress' },
    { value: 'fix',      name: 'fix:      A bug fix' },
    { value: 'build',    name: 'build:    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)' },
    { value: 'chore',    name: "chore:    Other changes that don't modify src or test files" },
    { value: 'feat',     name: 'feat:     A new feature' },
    { value: 'docs',     name: 'docs:     Documentation only changes' },
    { value: 'style',    name: 'style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)' },
    { value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature' },
    { value: 'ci',       name: 'ci:       Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)' },
    { value: 'revert',   name: 'revert:   Reverts a previous commit' },
    { value: 'perf',     name: 'perf:     A code change that improves performance' },
    { value: 'test',     name: 'test:     Adding missing tests or correcting existing tests' }
  ],

  scopes: [
    'ui',
    'api',
    'store'
  ],

  // it needs to match the value for field type. Eg.: 'fix'
  // scopeOverrides: {
  //   WIP: [
  //     'infans-ui',
  //     'infans-api',
  //     'infans1-api',
  //     'infans2'
  //   ]
  // },
  // currently not using issues
  skipQuestions: ['footer'],
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: '\nDenote the SCOPE of this change (optional):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  },

  // allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'perf'],

  // limit subject length
  subjectLimit: 100
}
