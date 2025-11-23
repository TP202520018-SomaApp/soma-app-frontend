// vi.mock('axios'); // uncomment and customize as needed

import subject from '../../../services/rooms/delete.room.js';

test('delete.room - default exists', () => {
  expect(subject).toBeDefined();
});
test('delete.room - default resolves', async () => {
  await expect(subject()).resolves.not.toBeUndefined();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.