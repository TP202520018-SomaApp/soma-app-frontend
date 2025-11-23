import subject from '../../router/abstract.routes.js';

test('abstract.routes - default exists', () => {
  expect(subject).toBeDefined();
});
test('abstract.routes - default callable', () => {
  if (typeof subject === 'function') expect(() => subject()).not.toThrow();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.