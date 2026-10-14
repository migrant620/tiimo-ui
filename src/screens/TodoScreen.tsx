/**
 * To-do tab.
 *
 * The third navigation surface, implemented from the capture in
 * runs/p1-capture-20260917 (raw/p1-todo.png). The captured state is empty — every
 * group reads (0) — and that is exactly what is reproduced: no populated group
 * was captured, so no task cards are invented here.
 *
 * Measured geometry (logical px on the 393x777 frame, from the capture nodes and
 * a vertical colour scan of the raw PNG):
 *   title "To-do" ink band y68..106, serif, same size as the Today date title
 *   HIGH pill top y154.5, 32 dp tall, tinted #FBECEC, sized to its content
 *   hint card 8 dp below the pill, 48 dp tall, dashed #F2F1F0 on the page colour
 *   section pitch 104.4 dp = pill 32 + 8 + card 48 + 16
 * The page has no weekday strip, so the first pill sits ~49 dp higher than on
 * Today. Each priority pill carries a leading flag glyph and a trailing chevron;
 * TO-DO and DONE render without the leading glyph, as observed.
 */
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

/** HIGH/MEDIUM/LOW carry a leading priority glyph; TO-DO/DONE do not. */
const HAS_ICON: Record<Priority, boolean> = {
  high: true,
  medium: true,
  low: true,
  todo: false,
  done: false,
};

function PriorityPill({
  priority,
  count,
  expanded,
  onToggle,
}: {
  priority: Priority;
  count: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable
      accessibilityLabel={`${PRIORITY_LABEL[priority]} ${count}`}
      onPress={onToggle}
      style={[styles.pill, { backgroundColor: TINT[priority] }]}
    >
      {HAS_ICON[priority] ? (
        <View style={styles.pillIcon}>
          <FlagGlyph size={15} color={colors.ink} />
        </View>
      ) : null}
      <Text style={styles.pillLabel}>{`${PRIORITY_LABEL[priority]} (${count})`}</Text>
      {/* Expanded shows a down chevron, collapsed an up one — the icon states
          the action, matching the Today section pills. */}
      <Chevron size={16} color={colors.ink} up={!expanded} />
    </Pressable>
  );
}

export function TodoScreen({ onQuickAdd }: { onQuickAdd: () => void }) {
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});
  const toggle = (key: string) => setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <View style={styles.page}>
      <TodayHeader onAdd={onQuickAdd} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="To-do list"
      >
        <View style={styles.titleRow}>
          <Text style={styles.title}>To-do</Text>
          <Chevron size={18} color={colors.ink} />
        </View>

        {PRIORITY_ORDER.map((priority, index) => {
          const isCollapsed = collapsed[priority] === true;
          return (
            <View key={priority} style={[styles.section, index === 0 && styles.firstSection]}>
              <PriorityPill
                priority={priority}
                count={0}
                expanded={!isCollapsed}
                onToggle={() => toggle(priority)}
              />
              {isCollapsed ? null : (
                <Pressable
                  accessibilityLabel={`Add to-do to ${priority}`}
                  onPress={onQuickAdd}
                  style={styles.hintCard}
                >
                  <Text style={styles.hint}>{PRIORITY_HINT[priority]}</Text>
                  <View style={styles.plusWell}>
                    <Plus size={17} color={colors.muted} strokeWidth={1.6} />
                  </View>
                </Pressable>
              )}
            </View>
          );
        })}

        {/* DONE is always present on this tab (unlike Today, which only shows it
            once a task is complete) and has no empty-state card. */}
        <View style={styles.section}>
          <PriorityPill priority="done" count={0} expanded={false} onToggle={() => toggle('done')} />
        </View>
      </ScrollView>
    </View>
  );
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
    paddingRight: 16,
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
