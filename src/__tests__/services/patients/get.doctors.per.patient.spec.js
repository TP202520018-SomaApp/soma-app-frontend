// vi.mock('axios'); // uncomment and customize as needed

import subject from '../../../services/patients/get.doctors.per.patient.js';

test('get.doctors.per.patient - default exists', () => {
  expect(subject).toBeDefined();
});
test('get.doctors.per.patient - default resolves', async () => {
  await expect(subject()).resolves.not.toBeUndefined();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.