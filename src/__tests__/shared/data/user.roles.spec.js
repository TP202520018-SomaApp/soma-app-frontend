import subject from '../../../shared/data/user.roles.js';

test('user.roles - default exists', () => {
  expect(subject).toBeDefined();
});
test('user.roles - default callable', () => {
  if (typeof subject === 'function') expect(() => subject()).not.toThrow();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.