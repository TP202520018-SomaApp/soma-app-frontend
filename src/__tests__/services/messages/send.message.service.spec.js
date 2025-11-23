// vi.mock('axios'); // uncomment and customize as needed

import subject from '../../../services/messages/send.message.service.js';

test('send.message.service - default exists', () => {
  expect(subject).toBeDefined();
});
test('send.message.service - default resolves', async () => {
  await expect(subject()).resolves.not.toBeUndefined();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.