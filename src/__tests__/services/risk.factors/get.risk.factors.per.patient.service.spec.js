// vi.mock('axios'); // uncomment and customize as needed

import subject from '../../../services/risk.factors/get.risk.factors.per.patient.service.js';

test('get.risk.factors.per.patient.service - default exists', () => {
  expect(subject).toBeDefined();
});
test('get.risk.factors.per.patient.service - default resolves', async () => {
  await expect(subject()).resolves.not.toBeUndefined();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.