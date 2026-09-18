import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CompletionCircle } from './Glyphs';
import { Icon } from './Icon';
import { colors, space, type as typo } from '../tokens';
import { PLACEHOLDER_COPY } from '../model';
import type { Task, TimeOfDay } from '../model';
export function TaskRow({ task, onToggleComplete, onOpenMenu, }: {
    task: Task;
    onToggleComplete: () => void;
    onOpenMenu: () => void;
}) {
    return (<Pressable accessibilityLabel={task.title} onPress={onOpenMenu} style={styles.card}>
      <View style={styles.chip}>
        <Text style={styles.chipGlyph}>{task.marker ?? ''}</Text>
      </View>
      <View style={styles.text}>
        <Text numberOfLines={1} style={styles.title}>
          {task.title}
        </Text>
        <Text style={styles.caption}>{`${task.durationMin}min`}</Text>
      </View>
      <Pressable accessibilityLabel={task.done ? 'Undo completion' : 'Complete task'} hitSlop={12} onPress={onToggleComplete} style={styles.circleSlot}>
        {task.done ? (<View style={styles.doneDisc}>
            <Icon name="check" size={15.3} lineHeight={16} color={colors.card}/>
          </View>) : (<CompletionCircle size={21.1} strokeWidth={2.4} color={colors.ink}/>)}
      </Pressable>
    </Pressable>);
}
export function PlaceholderRow({ section, onQuickAdd, }: {
    section: TimeOfDay;
    onQuickAdd: () => void;
}) {
    return (<Pressable accessibilityLabel={`Add task to ${section}`} onPress={onQuickAdd} style={styles.placeholderCard}>
      <Text style={styles.placeholder}>{PLACEHOLDER_COPY[section]}</Text>
      <View style={styles.plusWell}>
        <View style={styles.plusDisc}>
            <Icon name="plusThin" size={14.2} lineHeight={14.6} color={colors.plusInk}/>
          </View>
      </View>
    </Pressable>);
}
const styles = StyleSheet.create({
    card: {
        height: space.cardHeight,
        backgroundColor: colors.card,
        borderRadius: space.cardRadius,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12.3,
        paddingRight: 6,
        marginTop: space.pillToCard,
    },
    chip: {
        width: 31,
        height: 31,
        borderRadius: 15.5,
        backgroundColor: colors.discBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chipGlyph: { fontSize: 15.2, lineHeight: 19.3 },
    text: { flexShrink: 1, marginLeft: 8, justifyContent: 'center' },
    title: { ...typo.taskTitle, color: colors.ink },
    caption: { ...typo.caption, color: colors.ink },
    circleSlot: { marginLeft: 'auto', marginRight: 6.8, width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
    placeholderCard: {
        height: space.cardHeight,
        borderRadius: space.cardRadius,
        borderWidth: space.dashWidth,
        borderStyle: 'dashed',
        borderColor: colors.dash,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 13.8 - space.dashWidth,
        paddingRight: 6 - space.dashWidth,
        marginTop: space.pillToCard,
    },
    placeholder: { ...typo.placeholder, color: colors.muted, flex: 1 },
    doneDisc: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
    plusWell: { width: 34.2, height: 34.2, alignItems: 'center', justifyContent: 'center' },
    plusDisc: {
        width: 18.4,
        height: 18.4,
        borderRadius: 9.2,
        backgroundColor: colors.sheet,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
