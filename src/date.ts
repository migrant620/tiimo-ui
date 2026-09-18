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
}
export function todayLabel(now: Date) {
    return {
        weekday: WEEKDAYS[now.getDay()],
        monthCaption: `${MONTHS[now.getMonth()]} ${now.getFullYear()}`,
    };
}
export function weekStrip(now: Date): WeekDay[] {
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    return Array.from({ length: 7 }, (_, index) => {
        const day = new Date(start);
        day.setDate(start.getDate() + index);
        return {
            letter: WEEKDAY_LETTERS[index],
            date: day.getDate(),
            isToday: day.toDateString() === now.toDateString(),
            month: day.getMonth(),
        };
    });
}
export function dateLabel(now: Date) {
    const month = MONTHS[now.getMonth()];
    const short = month.charAt(0) + month.slice(1).toLowerCase();
    return `${now.getDate()} ${short.slice(0, 3)} ${now.getFullYear()}`;
}
export function clock(ts: number) {
    const date = new Date(ts);
    const hours24 = date.getHours();
    const hours = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${String(hours).padStart(2, '0')}:${minutes} ${hours24 < 12 ? 'AM' : 'PM'}`;
}
