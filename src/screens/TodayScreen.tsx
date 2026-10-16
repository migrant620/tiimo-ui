/**
 * Today plan screen.
 *
 * Vertical rhythm is taken from bands-01-today-clean.json in the batch-1 run:
 * header 15..58, date title 74..102, weekday strip 122..171, first section pill
 * 204..239, its card 248..296, then 21 dp between sections and 9 dp between a
 * pill and its card.
 *
 * The plan is scoped to one day: sections list only the tasks dated to the
 * selected day, and the week strip both selects a day and (on a horizontal swipe)
 * moves one week, matching the reference's own date round-trip where a task moved
 * to another day drops off the current day and reappears on the day it is moved
 * to. The selection starts on the wall-clock day, so the clean/with-task/DONE
 * states are unchanged.
 *
 * Interaction rules from verified behaviour: the row opens the action menu, the
 * completion ring completes/undoes, completing moves the task into DONE (which
 * only exists while it holds tasks and starts collapsed), and because rows can
 * rest behind the navigation band the list carries a bottom inset and is
 * scrollable before tapping.
 */
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DateHeader } from '../components/DateHeader';
import { SectionPill } from '../components/SectionPill';
import { PlaceholderRow, TaskRow } from '../components/TaskRow';
import { TodayHeader } from '../components/TodayHeader';
import { colors, space } from '../tokens';
import { SECTION_LABEL, SECTION_ORDER } from '../model';
import { addDays, isoOf, startOfWeek } from '../date';
import type { Task, TimeOfDay } from '../model';

interface Props {
  now: Date;
  tasks: Task[];
  onOpenMenu: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
  onQuickAdd: (section: TimeOfDay) => void;
  /** R32: forwarded to the header's gear, which used to be a dead key. */
  onSettings?: () => void;
}

export function TodayScreen({ now, tasks, onOpenMenu, onToggleComplete, onQuickAdd, onSettings }: Props) {
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({ done: true });
  const [selectedIso, setSelectedIso] = React.useState(() => isoOf(now));
  const [weekShift, setWeekShift] = React.useState(0);
  const toggle = (key: string) => setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const weekStart = React.useMemo(() => addDays(startOfWeek(now), weekShift * 7), [now, weekShift]);
  const dayTasks = tasks.filter((task) => task.date === selectedIso);
  const activeOf = (section: TimeOfDay) => dayTasks.filter((task) => !task.done && task.timeOfDay === section);
  const done = dayTasks.filter((task) => task.done);

  return (
    <View style={styles.page}>
      <TodayHeader onAdd={() => onQuickAdd('anytime')} onSettings={onSettings} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Today plan"
      >
        <DateHeader
          weekStart={weekStart}
          selectedIso={selectedIso}
          onSelect={setSelectedIso}
          onWeekShift={(delta) => setWeekShift((value) => value + delta)}
        />

        {SECTION_ORDER.map((section, index) => {
          const items = activeOf(section);
          const isCollapsed = collapsed[section] === true;
          return (
            <View key={section} style={[styles.section, index === 0 && styles.firstSection]}>
              <SectionPill
                section={section}
                label={SECTION_LABEL[section]}
                count={items.length}
                expanded={!isCollapsed}
                onToggle={() => toggle(section)}
                onAdd={items.length > 0 ? () => onQuickAdd(section) : undefined}
              />
              {isCollapsed ? null : items.length === 0 ? (
                <PlaceholderRow section={section} onQuickAdd={() => onQuickAdd(section)} />
              ) : (
                items.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onOpenMenu={() => onOpenMenu(task)}
                    onToggleComplete={() => onToggleComplete(task)}
                  />
                ))
              )}
            </View>
          );
        })}

        {done.length > 0 ? (
          <View style={styles.section}>
            <SectionPill
              label="DONE"
              count={done.length}
              expanded={!collapsed.done}
              onToggle={() => toggle('done')}
            />
            {collapsed.done
              ? null
              : done.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onOpenMenu={() => onOpenMenu(task)}
                    onToggleComplete={() => onToggleComplete(task)}
                  />
                ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  content: { paddingBottom: space.navHeight + space.navBottom + 24 },
  section: { marginTop: space.cardToNextSection, paddingHorizontal: space.page },
  // Reference: strip bottom y171.8, first pill top y203.8.
  firstSection: { marginTop: space.firstSection },
});
