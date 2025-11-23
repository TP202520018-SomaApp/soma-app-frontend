// vi.mock('axios'); // uncomment and customize as needed

import subject from '../../../services/specialities/get.specialities.service.js';

test('get.specialities.service - default exists', () => {
  expect(subject).toBeDefined();
});
test('get.specialities.service - default resolves', async () => {
  await expect(subject()).resolves.not.toBeUndefined();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.