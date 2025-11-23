// vi.mock('axios'); // uncomment and customize as needed

import subject from '../../../services/allergies/link.allergies.to.patients.service.js';

test('link.allergies.to.patients.service - default exists', () => {
  expect(subject).toBeDefined();
});
test('link.allergies.to.patients.service - default resolves', async () => {
  await expect(subject()).resolves.not.toBeUndefined();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.