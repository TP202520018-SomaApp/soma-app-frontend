// vi.mock('axios'); // uncomment and customize as needed

import subject from '../../../services/rooms/get.rooms.service.js';

test('get.rooms.service - default exists', () => {
  expect(subject).toBeDefined();
});
test('get.rooms.service - default resolves', async () => {
  await expect(subject()).resolves.not.toBeUndefined();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.