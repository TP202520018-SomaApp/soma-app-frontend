// vi.mock('axios'); // uncomment and customize as needed

import subject from '../../../services/rooms/get.rooms.per.doctor.js';

test('get.rooms.per.doctor - default exists', () => {
  expect(subject).toBeDefined();
});
test('get.rooms.per.doctor - default resolves', async () => {
  await expect(subject()).resolves.not.toBeUndefined();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.