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
import { colors, fontFiles, frame } from './tokens';
import { DEFAULT_MARKER, DEFAULT_REPEAT } from './model';
import { dateLabel } from './date';
import { useTiimoState } from './useTiimoState';
import type { ActionMenuRow, Task, TimeOfDay } from './model';
type Overlay = {
    kind: 'menu';
    task: Task;
} | {
    kind: 'quickCreate';
    section: TimeOfDay;
} | {
    kind: 'create';
    section: TimeOfDay;
} | {
    kind: 'edit';
    task: Task;
} | {
    kind: 'delete';
    task: Task;
};
const NEW_TASK: Task = {
    id: 'draft',
    title: '',
    durationMin: 30,
    timeOfDay: 'anytime',
    repeat: DEFAULT_REPEAT,
    done: false,
    marker: DEFAULT_MARKER,
};
function Shell() {
    const state = useTiimoState();
    const insets = useSafeAreaInsets();
    const [overlay, setOverlay] = React.useState<Overlay | null>(null);
    const now = React.useMemo(() => new Date(), []);
    const close = () => setOverlay(null);
    const onMenuSelect = (row: ActionMenuRow) => {
        if (overlay?.kind !== 'menu')
            return;
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
    return (<View style={styles.root}>
      <View style={[styles.stage, { paddingTop: insets.top }]}>
        <StatusBar style="dark"/>
        {state.tab === 'today' ? (<TodayScreen now={now} tasks={state.tasks} onOpenMenu={(task) => setOverlay({ kind: 'menu', task })} onToggleComplete={(task) => state.setCompleted(task.id, !task.done)} onQuickAdd={(section) => setOverlay({ kind: 'quickCreate', section })}/>) : null}
        {state.tab === 'focus' ? (<FocusScreen task={state.activeTask} timer={state.timer} onToggleTimer={state.toggleTimer} onRingPress={() => {
                if (state.activeTask)
                    setOverlay({ kind: 'edit', task: state.activeTask });
            }} onCreateTask={() => setOverlay({ kind: 'create', section: 'anytime' })}/>) : null}
        {state.tab === 'todo' ? (<TodoScreen onQuickAdd={() => setOverlay({ kind: 'create', section: 'anytime' })}/>) : null}
        <BottomNav active={state.tab} onSelect={state.setTab}/>

        {overlay?.kind === 'create' ? (<View style={styles.cover} role="dialog" aria-modal>
            <UpdateTaskScreen heading="New task" task={{ ...NEW_TASK, timeOfDay: overlay.section }} dateText={dateLabel(now)} onSubmit={(patch) => {
                state.createTask(patch.title ?? '', patch.durationMin ?? 30, patch.timeOfDay ?? overlay.section, patch.repeat ?? DEFAULT_REPEAT);
                close();
            }} onDismiss={close} onStart={close} onDelete={close}/>
          </View>) : null}

        {overlay?.kind === 'edit' ? (<View style={styles.cover} role="dialog" aria-modal>
            <UpdateTaskScreen task={overlay.task} dateText={dateLabel(now)} onSubmit={(patch) => {
                state.updateTask(overlay.task.id, patch);
                close();
            }} onDismiss={close} onStart={() => {
                const id = overlay.task.id;
                close();
                state.startFocus(id);
            }} onDelete={() => setOverlay({ kind: 'delete', task: overlay.task })}/>
          </View>) : null}
      </View>

      {overlay?.kind === 'quickCreate' ? (<QuickCreateSheet section={overlay.section} onDismiss={close} onSubmit={(title, durationMin, timeOfDay, repeat) => {
                state.createTask(title, durationMin, timeOfDay, repeat);
                close();
            }}/>) : null}
      {overlay?.kind === 'menu' ? (<ActionMenuSheet task={overlay.task} onSelect={onMenuSelect} onDismiss={close}/>) : null}
      {overlay?.kind === 'delete' ? (<DeleteDialog onCancel={close} onConfirm={() => {
                state.deleteTask(overlay.task.id);
                close();
            }}/>) : null}
    </View>);
}
export default function App() {
    const [fontsLoaded, fontError] = useFonts(fontFiles);
    if (!fontsLoaded && !fontError)
        return null;
    return (<SafeAreaProvider>
      <Shell />
    </SafeAreaProvider>);
}
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.sheet, alignItems: 'center' },
    stage: { flex: 1, width: frame.width, maxWidth: '100%', backgroundColor: colors.surface },
    cover: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.30)' },
});
