// vi.mock('axios'); // uncomment and customize as needed

import subject from '../../../services/appointments/delete.appointment.service.js';

test('delete.appointment.service - default exists', () => {
  expect(subject).toBeDefined();
});
test('delete.appointment.service - default resolves', async () => {
  await expect(subject()).resolves.not.toBeUndefined();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.