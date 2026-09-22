import { expect, it } from 'vitest';
import { draftToParams, validateTrip } from './tripSearch';

it('rejects incomplete and reversed requested dates', () => {
  expect(validateTrip({query:'',arrive:'2027-01-02',depart:'',guests:2})).toMatch(/both/i);
  expect(validateTrip({query:'',arrive:'2027-01-02',depart:'2027-01-02',guests:2})).toMatch(/after/i);
});

it('keeps a valid trip draft shareable in the URL', () => {
  expect(draftToParams({query:'Coorg',arrive:'2027-01-02',depart:'2027-01-04',guests:3}).toString()).toBe('query=Coorg&arrive=2027-01-02&depart=2027-01-04&guests=3');
});
