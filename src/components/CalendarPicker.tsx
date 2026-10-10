import * as React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { Icon } from './Icon';
import { calendar as cal, colors, frame, type as typo } from '../tokens';
import { fromIso, isoOf, monthGrid, monthTitle, pickerDateLabel } from '../date';
type Box = readonly [
    number,
    number,
    number,
    number
];
const at = ([left, top, width, height]: Box): ViewStyle => ({ position: 'absolute', left, top, width, height });
const pos = ([left, top]: readonly [
    number,
    number
]): ViewStyle => ({ position: 'absolute', left, top });
const WEEKDAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
export function CalendarPicker({ value, onSave, onDismiss, }: {
    value: string;
    onSave: (iso: string) => void;
    onDismiss: () => void;
}) {
    const [selected, setSelected] = React.useState(value);
    const [view, setView] = React.useState(() => {
        const start = fromIso(value);
        return { year: start.getFullYear(), month: start.getMonth() };
    });
    const shiftMonth = (delta: number) => {
        setView((prev) => {
            const next = new Date(prev.year, prev.month + delta, 1);
            return { year: next.getFullYear(), month: next.getMonth() };
        });
    };
    const grid = monthGrid(view.year, view.month);
    return (<Modal transparent visible animationType="none" onRequestClose={onDismiss}>
      <View style={styles.page}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close without saving date" onPress={onDismiss} style={[at(cal.close), styles.round]}>
          <Icon name="close" size={cal.glyph} color={colors.ink}/>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Save date" onPress={() => onSave(selected)} style={[at(cal.save), styles.saveButton]}>
          <Text style={styles.save}>Save</Text>
        </Pressable>

        <Text style={[pos(cal.selectLabel), styles.select]}>Select date</Text>
        <Text style={[pos(cal.dateLabel), styles.date]}>{pickerDateLabel(fromIso(selected))}</Text>

        <View style={[styles.divider, { top: cal.dividerY }]}/>

        <Text style={[pos(cal.monthLabel), styles.month]}>{monthTitle(view.year, view.month)}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Previous month" onPress={() => shiftMonth(-1)} style={[at(cal.prev), styles.round]}>
          <Icon name="chevronLeft" size={cal.glyph} color={colors.ink}/>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Next month" onPress={() => shiftMonth(1)} style={[at(cal.next), styles.round]}>
          <Icon name="chevronRight" size={cal.glyph} color={colors.ink}/>
        </Pressable>

        {WEEKDAY_LETTERS.map((letter, column) => (<Text key={`${letter}-${column}`} style={[
                styles.weekday,
                { left: cal.gridLeft + column * cal.columnPitch, top: cal.weekdayTop, width: cal.cell },
            ]}>
            {letter}
          </Text>))}

        {grid.map((day, index) => {
            if (day === null)
                return null;
            const iso = isoOf(new Date(view.year, view.month, day));
            const selectedDay = iso === selected;
            const column = index % 7;
            const row = Math.floor(index / 7);
            return (<Pressable key={iso} accessibilityRole="button" accessibilityLabel={String(day)} accessibilityState={{ selected: selectedDay }} onPress={() => setSelected(iso)} style={[
                    styles.dayCell,
                    { left: cal.gridLeft + column * cal.columnPitch, top: cal.gridTop + row * cal.rowPitch },
                    selectedDay && styles.daySelected,
                ]}>
              <Text style={[styles.day, selectedDay && styles.daySelectedText]}>{day}</Text>
            </Pressable>);
        })}
      </View>
    </Modal>);
}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: frame.width,
        maxWidth: '100%',
        alignSelf: 'center',
        backgroundColor: colors.surface,
    },
    round: { borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
    saveButton: { alignItems: 'center', justifyContent: 'center' },
    save: { ...typo.button, color: colors.primary },
    select: { ...typo.calendarSelect, color: colors.ink },
    date: { ...typo.calendarDate, color: colors.ink },
    divider: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: colors.hairline },
    month: { ...typo.calendarMonth, color: colors.ink },
    weekday: { ...typo.calendarWeekday, color: colors.muted, position: 'absolute', textAlign: 'center' },
    dayCell: { position: 'absolute', width: cal.cell, height: cal.cell, borderRadius: cal.cell / 2, alignItems: 'center', justifyContent: 'center' },
    daySelected: { backgroundColor: colors.primary },
    day: { ...typo.calendarDay, color: colors.ink },
    daySelectedText: { color: colors.card },
});
