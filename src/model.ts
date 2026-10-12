export type TimeOfDay = 'anytime' | 'morning' | 'afternoon' | 'evening';

export type TaskSection = TimeOfDay | 'done';

/**
 * Repeat choices.
 *
 * The picker is reachable in the free build — captured by tapping the
 * quick-create sheet's NO REPEAT chip — so this field is NOT Pro-gated and no
 * lock glyph is drawn beside it.
 *
 * The Update-task form expands these inline beneath its Repeat row; "Custom" is
 * the final entry its inline list exposes.
 */
export const REPEAT_OPTIONS = [
  'No repeat',
  'Daily',
  'Every weekday',
  'Weekends',
  'Weekly',
  'Every second week',
  'Monthly',
  'Yearly',
  'Custom',
] as const;

export type RepeatOption = (typeof REPEAT_OPTIONS)[number];

/**
 * The eight rows the captured options card draws: a white block of 8 x 62 dp
 * rows spanning x45.1..347.5 / y152.8..648.6. The card is the picker's only
 * captured presentation and it does NOT carry "Custom" — that ninth entry
 * belongs to the Update-task form's inline list alone. Drawing all nine rows in
 * the card would push its measured y80..672.8 box one 62 dp row (and the card's
 * rounded bottom edge) too far down, so the two hosts differ by exactly that row.
 */
export const REPEAT_CARD_OPTIONS: readonly RepeatOption[] = REPEAT_OPTIONS.filter(
  (option) => option !== 'Custom',
);

/** Matches the reference, where the picker opens with "No repeat" checked. */
export const DEFAULT_REPEAT: RepeatOption = 'No repeat';

export interface Task {
  id: string;
  title: string;
  /** Duration in minutes; the reference default when creating quickly is 30. */
  durationMin: number;
  timeOfDay: TimeOfDay;
  /** Repeat rule; the reference's create and edit forms both expose a Repeat row. */
  repeat: RepeatOption;
  /**
   * The day the task is planned for, as a local `YYYY-MM-DD` string.
   *
   * The reference scopes the Today plan to one day: changing the form's Date row
   * (via the day picker) moves the task off the current day, and moving the week
   * strip to that day brings it back. New tasks default to the current day.
   */
  date: string;
  done: boolean;
  /** User-chosen marker emoji shown in the chip at the left of the card. */
  marker?: string;
  /** Free-text note; the reference form exposes a notes card under Sub-tasks. */
  notes?: string;
}

export interface TimerState {
  taskId: string | null;
  remainingSec: number;
  running: boolean;
  /** Wall-clock ms when the countdown should hit zero; null while paused. */
  endsAt: number | null;
  /** Session start, kept so the header can render the planned time block. */
  startedAt: number | null;
}

export type Tab = 'todo' | 'today' | 'focus';

/**
 * The To-do tab groups tasks by priority instead of by time of day. The five
 * groups below are transcribed from the captured To-do page
 * (runs/p1-capture-20260917/raw/p1-todo.png), which read HIGH/MEDIUM/LOW/TO-DO/
 * DONE with every count at (0). Populated groups were never captured, so only
 * the measured empty state is reproduced.
 */
export type Priority = 'high' | 'medium' | 'low' | 'todo' | 'done';

/** Pills that carry a leading priority icon; TO-DO/DONE render without one. */
export const PRIORITY_ORDER: Priority[] = ['high', 'medium', 'low', 'todo'];

export const PRIORITY_LABEL: Record<Priority, string> = {
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW',
  todo: 'TO-DO',
  done: 'DONE',
};

/** Empty-group hint copy, transcribed from the same capture. */
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

/**
 * Placeholder copy, transcribed from the reference screens
 * (runs/visual-20260916T183500/source/01-today-clean.png). The earlier draft
 * invented per-section strings; these are the actual ones.
 */
export const PLACEHOLDER_COPY: Record<TimeOfDay, string> = {
  anytime: 'Anytime today works',
  morning: "What's on your morning list?",
  afternoon: "What's happening today?",
  evening: 'End the day your way',
};

/**
 * Action menu rows, read from the reference hierarchy and screenshot
 * (03-action-menu.png). Only start / edit / delete have verified behaviour.
 */
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

/** Marker chips are user-chosen; this is a local demo value, not a brand token. */
export const DEFAULT_MARKER = '\u{1F4DD}';

/** Task colour, measured as the focus-ring disc for the observed task. */
export const MARKER_DISC_COLOUR = '#95C8DB';
