export type TimeOfDay = 'anytime' | 'morning' | 'afternoon' | 'evening';
export type TaskSection = TimeOfDay | 'done';
export const REPEAT_OPTIONS = [
    'No repeat',
    'Daily',
    'Every weekday',
    'Weekends',
    'Weekly',
    'Every second week',
    'Monthly',
    'Yearly',
] as const;
export type RepeatOption = (typeof REPEAT_OPTIONS)[number];
export const DEFAULT_REPEAT: RepeatOption = 'No repeat';
export interface Task {
    id: string;
    title: string;
    durationMin: number;
    timeOfDay: TimeOfDay;
    repeat: RepeatOption;
    done: boolean;
    marker?: string;
}
export interface TimerState {
    taskId: string | null;
    remainingSec: number;
    running: boolean;
    endsAt: number | null;
    startedAt: number | null;
}
export type Tab = 'todo' | 'today' | 'focus';
export type Priority = 'high' | 'medium' | 'low' | 'todo' | 'done';
export const PRIORITY_ORDER: Priority[] = ['high', 'medium', 'low', 'todo'];
export const PRIORITY_LABEL: Record<Priority, string> = {
    high: 'HIGH',
    medium: 'MEDIUM',
    low: 'LOW',
    todo: 'TO-DO',
    done: 'DONE',
};
export const PRIORITY_HINT: Record<Priority, string> = {
    high: 'Need focus',
    medium: 'Not urgent',
    low: 'No rush',
    todo: 'Add it to your list',
    done: '',
};
export const SECTION_ORDER: TimeOfDay[] = ['anytime', 'morning', 'afternoon', 'evening'];
export const SECTION_LABEL: Record<TimeOfDay, string> = {
    anytime: 'ANYTIME',
    morning: 'MORNING',
    afternoon: 'AFTERNOON',
    evening: 'EVENING',
};
export const PLACEHOLDER_COPY: Record<TimeOfDay, string> = {
    anytime: 'Anytime today works',
    morning: "What's on your morning list?",
    afternoon: "What's happening today?",
    evening: 'End the day your way',
};
export const ACTION_MENU_ROWS = [
    'Make a copy',
    'Move to list',
    'Reschedule task',
    'Reschedule for tomorrow',
    'Suggest breakdown',
    'Start task',
    'Edit task',
    'Delete task',
] as const;
export type ActionMenuRow = (typeof ACTION_MENU_ROWS)[number];
export const IMPLEMENTED_ROWS: ActionMenuRow[] = ['Start task', 'Edit task', 'Delete task'];
export const DEFAULT_MARKER = '\u{1F4DD}';
export const MARKER_DISC_COLOUR = '#95C8DB';
