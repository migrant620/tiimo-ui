import * as React from 'react';
import { PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, space, type as typo } from '../tokens';
import { dayLabel, fromIso, weekDays } from '../date';
interface Props {
    weekStart: Date;
    selectedIso: string;
    onSelect: (iso: string) => void;
    onWeekShift: (delta: number) => void;
}
export function DateHeader({ weekStart, selectedIso, onSelect, onWeekShift }: Props) {
    const label = dayLabel(fromIso(selectedIso));
    const days = weekDays(weekStart);
    const shiftRef = React.useRef(onWeekShift);
    shiftRef.current = onWeekShift;
    const responder = React.useMemo(() => PanResponder.create({
        onMoveShouldSetPanResponder: (_event, gesture) => Math.abs(gesture.dx) > 10 && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.5,
        onPanResponderRelease: (_event, gesture) => {
            if (gesture.dx <= -40)
                shiftRef.current(1);
            else if (gesture.dx >= 40)
                shiftRef.current(-1);
        },
    }), []);
    return (<View>
      <View style={styles.titleRow}>
        <Text accessibilityRole="header" style={styles.title}>
          {label.weekday}
        </Text>
        <Text style={styles.month}>{label.monthCaption}</Text>
      </View>
      <View style={styles.strip} {...responder.panHandlers}>
        {days.map((day) => {
            const selected = day.iso === selectedIso;
            return (<Pressable key={day.iso} accessibilityLabel={`${day.letter} ${day.date}`} onPress={() => onSelect(day.iso)} style={[styles.cell, selected && styles.cellSelected]}>
              <Text style={[styles.letter, selected && styles.selectedInk]}>{day.letter}</Text>
              <Text style={[styles.number, selected && styles.selectedInk]}>{day.date}</Text>
            </Pressable>);
        })}
      </View>
    </View>);
}
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
        marginTop: 16.1,
        paddingHorizontal: 16,
    },
    cell: { flex: 1, maxWidth: 51.55, height: 50.6, borderRadius: 14, alignItems: 'center', paddingTop: 4.7 },
    cellSelected: { backgroundColor: colors.sheet },
    letter: { ...typo.weekdayLetter, color: colors.muted },
    number: { ...typo.weekdayNumber, color: colors.muted, marginTop: 2.2 },
    selectedInk: { color: colors.primary },
});
