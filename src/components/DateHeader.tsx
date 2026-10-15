/**
 * Date title and weekday strip.
 *
 * Measured: the "Wednesday" ink band sits at y74..102 and "SEPTEMBER 2026" is
 * right-aligned on the same line; the strip occupies y122..171 with seven evenly
 * spaced cells (pitch ~51.5, first centre x40, last x350). The selected cell is a
 * 50x51 rounded chip filled `sheet` (#F6F5F4) with the letter and number in
 * `primary`; unselected letters/numbers use `muted`.
 *
 * The title names the selected day (the reference shows the shown day, not the
 * wall clock), and the strip honours the reference's own week gesture: a
 * horizontal swipe moves one week, so a task moved to another day can be reached.
 */
import * as React from 'react';
import { PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, space, type as typo } from '../tokens';
import { dayLabel, fromIso, weekDays } from '../date';

interface Props {
  /** Sunday that the strip's seven cells start from. */
  weekStart: Date;
  /** The day in view, as `YYYY-MM-DD`. */
  selectedIso: string;
  onSelect: (iso: string) => void;
  /** -1 for the previous week, +1 for the next. */
  onWeekShift: (delta: number) => void;
}

export function DateHeader({ weekStart, selectedIso, onSelect, onWeekShift }: Props) {
  const label = dayLabel(fromIso(selectedIso));
  const days = weekDays(weekStart);

  // The responder is created once, so it reads the latest callback through a ref
  // rather than capturing a stale closure.
  const shiftRef = React.useRef(onWeekShift);
  shiftRef.current = onWeekShift;
  const responder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_event, gesture) =>
          Math.abs(gesture.dx) > 10 && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.5,
        onPanResponderRelease: (_event, gesture) => {
          if (gesture.dx <= -40) shiftRef.current(1);
          else if (gesture.dx >= 40) shiftRef.current(-1);
        },
      }),
    [],
  );

  return (
    <View>
      <View style={styles.titleRow}>
        <Text accessibilityRole="header" style={styles.title}>
          {label.weekday}
        </Text>
        <Text style={styles.month}>{label.monthCaption}</Text>
      </View>
      <View style={styles.strip} {...responder.panHandlers}>
        {days.map((day) => {
          const selected = day.iso === selectedIso;
          return (
            <Pressable
              key={day.iso}
              accessibilityLabel={`${day.letter} ${day.date}`}
              onPress={() => onSelect(day.iso)}
              style={[styles.cell, selected && styles.cellSelected]}
            >
              <Text style={[styles.letter, selected && styles.selectedInk]}>{day.letter}</Text>
              <Text style={[styles.number, selected && styles.selectedInk]}>{day.date}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

// Reference bounds: title box x21.8 y69.1 (36 tall); "SEPTEMBER 2026" right-aligned
// to x377 with its box bottom at y95; strip cells x16 + n * 51.55, y121.2..171.8,
// letter box top 4.7 dp into the cell and the number box 2.2 dp below the letter.
const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 21.8,
    paddingRight: 16,
    marginTop: 13.1,
  },
  title: { ...typo.dateTitle, color: colors.ink },
  month: { ...typo.monthCaption, color: colors.ink, marginBottom: 10.1 },
  strip: {
    flexDirection: 'row',
    justifyContent: 'center',
    // R21 measured the reference's week strip starting its ink at dp 75.0 while ours
    // started at 76.0, and the whole calendar block's ink centroid sat 10.7 dp low
    // (ours 85.99 vs reference 75.34). That correction overshot: R28 measures the strip's
    // own cells, whose boxes are the same shape on both sides (51.7 x 50.6 against
    // 51.5 x 50.6, so this is a view box against a view box, not a run against a box),
    // and all seven sit 1.9 dp too high - reference y 121.2, ours 119.3 on V1 through V8.
    // The 1.2 dp is therefore given back, plus the 1.9 dp the cells are actually out by.
    marginTop: 16.1,
    paddingHorizontal: 16,
  },
  // 51.55 dp each on the 393 frame; cells share the width on any other screen.
  cell: { flex: 1, maxWidth: 51.55, height: 50.6, borderRadius: 14, alignItems: 'center', paddingTop: 4.7 },
  cellSelected: { backgroundColor: colors.sheet },
  letter: { ...typo.weekdayLetter, color: colors.muted },
  number: { ...typo.weekdayNumber, color: colors.muted, marginTop: 2.2 },
  selectedInk: { color: colors.primary },
});
