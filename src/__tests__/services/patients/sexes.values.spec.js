import subject from '../../../services/patients/sexes.values.js';

test('sexes.values - default exists', () => {
  expect(subject).toBeDefined();
});
test('sexes.values - default callable', () => {
  if (typeof subject === 'function') expect(() => subject()).not.toThrow();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.