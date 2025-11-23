import { getAvailableStatuses } from '../../../shared/data/statuses.js';
import userRoles from '../../../shared/data/user.roles.js';

test('statuses - getAvailableStatuses executes without throwing', () => {
  const statuses = [
    { id: 0, name: '-', colour: '#9e9e9e', patient: 0, doctor: 0 },
    { id: 1, name: 'A', colour: '#ffffff', patient: 1, doctor: 0 }
  ];
  expect(() => getAvailableStatuses(userRoles.patient, 0, statuses)).not.toThrow();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.