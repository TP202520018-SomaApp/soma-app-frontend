// vi.mock('axios'); // uncomment and customize as needed

import subject from '../../../services/authentication/update.user.service.js';

test('update.user.service - default exists', () => {
  expect(subject).toBeDefined();
});
test('update.user.service - default resolves', async () => {
  await expect(subject()).resolves.not.toBeUndefined();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.