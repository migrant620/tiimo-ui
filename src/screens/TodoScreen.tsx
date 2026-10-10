import * as React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TodayHeader } from '../components/TodayHeader';
import { Chevron, FlagGlyph, Plus } from '../components/Glyphs';
import { colors, space, type as typo } from '../tokens';
import { PRIORITY_HINT, PRIORITY_LABEL, PRIORITY_ORDER } from '../model';
import type { Priority } from '../model';
const TINT: Record<Priority, string> = {
    high: colors.highPill,
    medium: colors.mediumPill,
    low: colors.lowPill,
    todo: colors.todoPill,
    done: colors.donePill,
};
const HAS_ICON: Record<Priority, boolean> = {
    high: true,
    medium: true,
    low: true,
    todo: false,
    done: false,
};
function PriorityPill({ priority, count, expanded, onToggle, }: {
    priority: Priority;
    count: number;
    expanded: boolean;
    onToggle: () => void;
}) {
    return (<Pressable accessibilityLabel={`${PRIORITY_LABEL[priority]} ${count}`} onPress={onToggle} style={[styles.pill, { backgroundColor: TINT[priority] }]}>
      {HAS_ICON[priority] ? (<View style={styles.pillIcon}>
          <FlagGlyph size={15} color={colors.ink}/>
        </View>) : null}
      <Text style={styles.pillLabel}>{`${PRIORITY_LABEL[priority]} (${count})`}</Text>
      
      <Chevron size={16} color={colors.ink} up={!expanded}/>
    </Pressable>);
}
export function TodoScreen({ onQuickAdd }: {
    onQuickAdd: () => void;
}) {
    const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});
    const toggle = (key: string) => setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
    return (<View style={styles.page}>
      <TodayHeader onAdd={onQuickAdd}/>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} accessibilityLabel="To-do list">
        <View style={styles.titleRow}>
          <Text style={styles.title}>To-do</Text>
          <Chevron size={18} color={colors.ink}/>
        </View>

        {PRIORITY_ORDER.map((priority, index) => {
            const isCollapsed = collapsed[priority] === true;
            return (<View key={priority} style={[styles.section, index === 0 && styles.firstSection]}>
              <PriorityPill priority={priority} count={0} expanded={!isCollapsed} onToggle={() => toggle(priority)}/>
              {isCollapsed ? null : (<Pressable accessibilityLabel={`Add to-do to ${priority}`} onPress={onQuickAdd} style={styles.hintCard}>
                  <Text style={styles.hint}>{PRIORITY_HINT[priority]}</Text>
                  <View style={styles.plusWell}>
                    <Plus size={17} color={colors.muted} strokeWidth={1.6}/>
                  </View>
                </Pressable>)}
            </View>);
        })}

        
        <View style={styles.section}>
          <PriorityPill priority="done" count={0} expanded={false} onToggle={() => toggle('done')}/>
        </View>
      </ScrollView>
    </View>);
}
const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: colors.surface },
    content: { paddingBottom: space.navHeight + space.navBottom + 24 },
    titleRow: {
        marginTop: 10,
        paddingHorizontal: space.page,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: { ...typo.dateTitle, color: colors.ink },
    section: { marginTop: space.priorityCardToNext, paddingHorizontal: space.page },
    firstSection: { marginTop: space.priorityFirstSection },
    pill: {
        height: space.priorityPillHeight,
        borderRadius: space.priorityPillHeight / 2,
        paddingLeft: 11,
        paddingRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 6,
    },
    pillIcon: { width: 14, alignItems: 'center', justifyContent: 'center' },
    pillLabel: { ...typo.section, color: colors.ink },
    hintCard: {
        height: space.cardHeight,
        borderRadius: space.cardRadius,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: colors.dash,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 13,
        paddingRight: 6,
        marginTop: space.priorityPillToCard,
    },
    hint: { ...typo.body, color: colors.muted, flex: 1 },
    plusWell: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.sheet,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
