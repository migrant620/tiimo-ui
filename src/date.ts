/** Date helpers for the Today header and the day picker.
 *
 *  The reference is a real calendar, so the prototype derives its labels from an
 *  actual Date rather than hardcoding "Wednesday 16 Sep". Days are compared and
 *  stored as a local `YYYY-MM-DD` string so a task's day survives re-renders and
 *  is not shifted by timezone/UTC conversion the way a Date instance can be. */

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEKDAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
];

export interface WeekDay {
  letter: string;
  date: number;
  isToday: boolean;
  month: number;
  iso: string;
}

/** Local calendar day as `YYYY-MM-DD`. */
export function isoOf(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function fromIso(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(date.getDate() + days);
  return next;
}

/** Sunday, matching the reference strip which starts its week on Sunday. */
export function startOfWeek(date: Date): Date {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  start.setHours(0, 0, 0, 0);
  return start;
}

/** The header title for any day: the reference shows the day's weekday on the
 *  left and its month/year right-aligned, not the wall-clock "today". */
export function dayLabel(date: Date) {
  return {
    weekday: WEEKDAYS[date.getDay()],
    monthCaption: `${MONTHS[date.getMonth()]} ${date.getFullYear()}`,
  };
}

/** Seven-day strip starting on the given week's Sunday. */
export function weekDays(weekStart: Date, now = new Date()): WeekDay[] {
  const todayIso = isoOf(now);
  return Array.from({ length: 7 }, (_, index) => {
    const day = addDays(weekStart, index);
    return {
      letter: WEEKDAY_LETTERS[index],
      date: day.getDate(),
      isToday: isoOf(day) === todayIso,
      month: day.getMonth(),
      iso: isoOf(day),
    };
  });
}

export function dateLabel(date: Date) {
  const month = MONTHS[date.getMonth()];
  const short = month.charAt(0) + month.slice(1).toLowerCase();
  return `${date.getDate()} ${short.slice(0, 3)} ${date.getFullYear()}`;
}

/** The picker header's own shorter form, measured as "16 Sept" / "17 Oct". */
export function pickerDateLabel(date: Date) {
  const month = MONTHS[date.getMonth()];
  return `${date.getDate()} ${month.charAt(0)}${month.slice(1, 4).toLowerCase()}`;
}

/** The month header inside the picker: "September 2026". */
export function monthTitle(year: number, month: number) {
  const name = MONTHS[month];
  return `${name.charAt(0)}${name.slice(1).toLowerCase()} ${year}`;
}

/**
 * Leading blanks + the month's day numbers, one entry per grid cell.
 *
 * The reference fills only the current month's cells and leaves the neighbouring
 * months blank (no faded numbers), so the array holds `null` for those cells.
 */
export function monthGrid(year: number, month: number): (number | null)[] {
  const lead = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array.from({ length: lead }, () => null);
  for (let day = 1; day <= days; day += 1) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function clock(ts: number) {
  const date = new Date(ts);
  const hours24 = date.getHours();
  const hours = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${String(hours).padStart(2, '0')}:${minutes} ${hours24 < 12 ? 'AM' : 'PM'}`;
}
