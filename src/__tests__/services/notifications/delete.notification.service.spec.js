// vi.mock('axios'); // uncomment and customize as needed

import subject from '../../../services/notifications/delete.notification.service.js';

test('delete.notification.service - default exists', () => {
  expect(subject).toBeDefined();
});
test('delete.notification.service - default resolves', async () => {
  await expect(subject()).resolves.not.toBeUndefined();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.