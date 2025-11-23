import { getMonthWeekLabel, getWeekDay, getMonthName } from '../../../shared/utils/date.utils.js';

test('date.utils - getMonthWeekLabel executes without throwing', () => {
  expect(() => getMonthWeekLabel(new Date())).not.toThrow();
});
test('date.utils - getWeekDay executes without throwing', () => {
  expect(() => getWeekDay(1)).not.toThrow();
});
test('date.utils - getMonthName executes without throwing', () => {
  expect(() => getMonthName(1)).not.toThrow();
});

// TODO: replace these generic executions with meaningful unit tests and mocks.
// Consider mocking DB/repo/HTTP modules before importing the module to avoid side-effects.