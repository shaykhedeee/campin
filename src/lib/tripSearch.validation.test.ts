import { afterEach, expect, it, vi } from 'vitest';
import { isCalendarDate, nextDate, todayIso, validateTrip } from './tripSearch';
import { safeReturnPath } from './authReturn';
afterEach(()=>vi.useRealTimers());
it('uses the Indian calendar date across UTC midnight',()=>{vi.useFakeTimers();vi.setSystemTime(new Date('2026-09-21T20:00:00Z'));expect(todayIso()).toBe('2026-09-22');});
it('rejects overflow dates and supports leap years',()=>{expect(isCalendarDate('2027-02-29')).toBe(false);expect(isCalendarDate('2028-02-29')).toBe(true);expect(isCalendarDate('2027-04-31')).toBe(false);expect(nextDate('2028-02-29')).toBe('2028-03-01');});
it('validates guest counts even with flexible dates',()=>{expect(validateTrip({query:'',arrive:'',depart:'',guests:0})).toMatch(/guests/);expect(validateTrip({query:'',arrive:'',depart:'',guests:2})).toBe('');});
it('restricts sign-in returns to internal paths',()=>{for(const value of ['https://evil.test','//evil.test','/\\evil.test'])expect(safeReturnPath(value)).toBe('/account');expect(safeReturnPath('/listing/camp?guests=3')).toBe('/listing/camp?guests=3');});
