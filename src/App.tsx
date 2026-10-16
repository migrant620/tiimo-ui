/**
 * App shell.
 *
 * Web first, mobile viewport first. The stage is pinned to the measured 393x777
 * reference frame; on wider viewports it is centred, which is a proposed
 * adaptation, not observed Tiimo behaviour (DESIGN.md "Responsive Behavior").
 *
 * Create has two entries, and they are deliberately different:
 *  - the Today tab opens the quick-create bottom sheet, which
 *    runs/p1-capture-20260917/source/p1-quickcreate.png captured directly;
 *  - the Focus and To-do tabs still route to the full-screen task form, because
 *    the reference was only ever captured with the sheet over Today and neither
 *    of those tabs' create entry was observed. design-qa.md records that gap.
 */
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNav } from './components/BottomNav';
import { ActionMenuSheet, DeleteDialog } from './components/Overlays';
import { QuickCreateSheet } from './components/QuickCreateSheet';
import { UpdateTaskScreen } from './components/UpdateTaskScreen';
import { TodayScreen } from './screens/TodayScreen';
import { FocusScreen } from './screens/FocusScreen';
import { TodoScreen } from './screens/TodoScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { colors, fontFiles, frame } from './tokens';
import { DEFAULT_MARKER, DEFAULT_REPEAT } from './model';
import { isoOf } from './date';
import { useTiimoState } from './useTiimoState';
import type { ActionMenuRow, Tab, Task, TimeOfDay } from './model';

type Overlay =
  | { kind: 'menu'; task: Task }
  | { kind: 'quickCreate'; section: TimeOfDay }
  | { kind: 'create'; section: TimeOfDay }
  | { kind: 'edit'; task: Task }
  | { kind: 'delete'; task: Task };

/** A task always carries a marker chip; the value itself is user-chosen. */
const NEW_TASK: Task = {
  id: 'draft',
  title: '',
  durationMin: 30,
  timeOfDay: 'anytime',
  repeat: DEFAULT_REPEAT,
  date: isoOf(new Date()),
  done: false,
  marker: DEFAULT_MARKER,
};

function Shell() {
  const state = useTiimoState();
  const insets = useSafeAreaInsets();
  const [overlay, setOverlay] = React.useState<Overlay | null>(null);
  /**
   * R32: the avatar well is a live 54.2 dp control, so it now routes. Profile is held
   * as its own flag rather than as a `Tab` because `Tab` types the three pill slots;
   * any tab press clears it so the pill and the profile page can never both be active.
   * `settings` is the header gear's route, which was also a dead key; it covers both
   * the pill tabs and Profile, so it supersedes the two of them.
   */
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const now = React.useMemo(() => new Date(), []);

  const close = () => setOverlay(null);
  const selectTab = (tab: Tab) => {
    setProfileOpen(false);
    setSettingsOpen(false);
    state.setTab(tab);
  };
  const openSettings = () => {
    setProfileOpen(false);
    setSettingsOpen(true);
  };

  const onMenuSelect = (row: ActionMenuRow) => {
    if (overlay?.kind !== 'menu') return;
    const task = overlay.task;
    switch (row) {
      case 'Start task':
        close();
        state.startFocus(task.id);
        break;
      case 'Edit task':
        setOverlay({ kind: 'edit', task });
        break;
      case 'Delete task':
        setOverlay({ kind: 'delete', task });
        break;
      default:
        close();
        break;
    }
  };

  return (
    <View style={styles.root}>
      <View style={[styles.stage, { paddingTop: insets.top }]}>
        <StatusBar style="dark" />
        {!profileOpen && !settingsOpen && state.tab === 'today' ? (
          <TodayScreen
            now={now}
            tasks={state.tasks}
            onOpenMenu={(task) => setOverlay({ kind: 'menu', task })}
            onToggleComplete={(task) => state.setCompleted(task.id, !task.done)}
            onQuickAdd={(section) => setOverlay({ kind: 'quickCreate', section })}
            onSettings={openSettings}
          />
        ) : null}
        {!profileOpen && !settingsOpen && state.tab === 'focus' ? (
          <FocusScreen
            task={state.activeTask}
            timer={state.timer}
            onToggleTimer={state.toggleTimer}
            onRingPress={() => {
              if (state.activeTask) setOverlay({ kind: 'edit', task: state.activeTask });
            }}
            onCreateTask={() => setOverlay({ kind: 'create', section: 'anytime' })}
          />
        ) : null}
        {!profileOpen && !settingsOpen && state.tab === 'todo' ? (
          <TodoScreen onQuickAdd={() => setOverlay({ kind: 'create', section: 'anytime' })} onSettings={openSettings} />
        ) : null}
        {profileOpen ? <ProfileScreen /> : null}
        {settingsOpen ? <SettingsScreen /> : null}
        <BottomNav
          active={state.tab}
          onSelect={selectTab}
          onProfile={() => {
            setSettingsOpen(false);
            setProfileOpen(open => !open);
          }}
        />

        {overlay?.kind === 'create' ? (
          <View style={styles.cover} role="dialog" aria-modal>
            <UpdateTaskScreen
              heading="New task"
              task={{ ...NEW_TASK, timeOfDay: overlay.section, date: isoOf(now) }}
              onSubmit={(patch) => {
                state.createTask(
                  patch.title ?? '',
                  patch.durationMin ?? 30,
                  patch.timeOfDay ?? overlay.section,
                  patch.repeat ?? DEFAULT_REPEAT,
                  patch.notes,
                  patch.date ?? isoOf(now),
                );
                close();
              }}
              onDismiss={close}
              onStart={close}
              onDelete={close}
            />
          </View>
        ) : null}

        {overlay?.kind === 'edit' ? (
          <View style={styles.cover} role="dialog" aria-modal>
            <UpdateTaskScreen
              task={overlay.task}
              onSubmit={(patch) => {
                state.updateTask(overlay.task.id, patch);
                close();
              }}
              onDismiss={close}
              onStart={() => {
                const id = overlay.task.id;
                close();
                state.startFocus(id);
              }}
              onDelete={() => setOverlay({ kind: 'delete', task: overlay.task })}
            />
          </View>
        ) : null}
      </View>

      {overlay?.kind === 'quickCreate' ? (
        <QuickCreateSheet
          section={overlay.section}
          onDismiss={close}
          onSubmit={(title, durationMin, timeOfDay, repeat) => {
            state.createTask(title, durationMin, timeOfDay, repeat);
            close();
          }}
        />
      ) : null}
      {overlay?.kind === 'menu' ? (
        <ActionMenuSheet task={overlay.task} onSelect={onMenuSelect} onDismiss={close} />
      ) : null}
      {overlay?.kind === 'delete' ? (
        <DeleteDialog
          onCancel={close}
          onConfirm={() => {
            state.deleteTask(overlay.task.id);
            close();
          }}
        />
      ) : null}
    </View>
  );
}

export default function App() {
  // Text is laid out against measured Roboto/Fraunces advances, so nothing
  // renders until the faces are in; a fallback face would shift every row.
  const [fontsLoaded, fontError] = useFonts(fontFiles);
  if (!fontsLoaded && !fontError) return null;
  return (
    <SafeAreaProvider>
      <Shell />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.sheet, alignItems: 'center' },
  stage: { flex: 1, width: frame.width, maxWidth: '100%', backgroundColor: colors.surface },
  // The task form is a full-height sheet: the Today page shows, dimmed by the same
  // 30% scrim as the action menu, only at its rounded top corners.
  cover: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.30)' },
});
