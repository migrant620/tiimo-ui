import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, space, type as typo } from '../tokens';
import { todayLabel, weekStrip } from '../date';
interface Props {
    now: Date;
    selectedDate: number;
    onSelect: (date: number) => void;
}
export function DateHeader({ now, selectedDate, onSelect }: Props) {
    const label = todayLabel(now);
    const days = weekStrip(now);
    return (<View>
      <View style={styles.titleRow}>
        <Text accessibilityRole="header" style={styles.title}>
          {label.weekday}
        </Text>
        <Text style={styles.month}>{label.monthCaption}</Text>
      </View>
      <View style={styles.strip}>
        {days.map((day) => {
            const selected = day.date === selectedDate;
            return (<Pressable key={`${day.letter}-${day.date}`} accessibilityLabel={`${day.letter} ${day.date}`} onPress={() => onSelect(day.date)} style={[styles.cell, selected && styles.cellSelected]}>
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
