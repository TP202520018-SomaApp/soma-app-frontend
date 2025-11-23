// vi.mock('axios'); // uncomment and customize as needed

import subject from '../../../services/universities/get.universities.service.js';

test('get.universities.service - default exists', () => {
  expect(subject).toBeDefined();
});
test('get.universities.service - default resolves', async () => {
  await expect(subject()).resolves.not.toBeUndefined();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.