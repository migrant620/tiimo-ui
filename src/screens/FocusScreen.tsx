import * as React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SparkleGlyph } from '../components/Glyphs';
import { Icon } from '../components/Icon';
import { TimerRing } from '../components/TimerRing';
import { colors, focus, lift, type as typo } from '../tokens';
import { MARKER_DISC_COLOUR } from '../model';
import { clock } from '../date';
import type { Task, TimerState } from '../model';
function countdown(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
interface Props {
    task: Task | null;
    timer: TimerState;
    onToggleTimer: () => void;
    onRingPress: () => void;
    onCreateTask: () => void;
}
export function FocusScreen({ task, timer, onToggleTimer, onRingPress, onCreateTask }: Props) {
    const totalSec = (task?.durationMin ?? 0) * 60;
    const started = task && timer.startedAt !== null ? timer.startedAt : null;
    return (<ScrollView style={styles.scroll} contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <View style={[styles.proWrap, !task && styles.proWrapEmpty]}>
        <Pressable accessibilityLabel="Get Pro" onPress={() => undefined} style={[styles.proPill, task ? styles.proPillQuiet : null]}>
          <Text style={[styles.proLabel, task ? styles.proLabelQuiet : null]}>GET PRO</Text>
          <SparkleGlyph size={15} color={colors.primary}/>
        </Pressable>
      </View>

      <View style={styles.heading}>
        <Text accessibilityRole="header" style={styles.title}>
          {task ? task.title : 'Focus'}
        </Text>
        {task ? (started !== null ? (<View style={styles.timeRow}>
              <Text style={styles.time}>{clock(started)}</Text>
              <Icon name="arrowRight" size={8.7} color={colors.ink}/>
              <Text style={styles.time}>{clock(started + totalSec * 1000)}</Text>
            </View>) : null) : (<Text style={styles.subtitle}>Create a task to start focus</Text>)}
      </View>

      <View style={styles.ringWrap} pointerEvents="box-none">
        <TimerRing discColor={task ? MARKER_DISC_COLOUR : colors.discDefault} marker={task?.marker ?? undefined} elapsedSec={task ? totalSec - timer.remainingSec : 0} totalSec={totalSec}/>
      </View>
      {task ? (<Pressable accessibilityLabel="Timer disc; opens the update task form" onPress={onRingPress} style={styles.disc}/>) : null}

      <Text style={styles.digits}>{countdown(timer.remainingSec)}</Text>

      {task ? (<Pressable accessibilityLabel={timer.running ? 'Pause timer' : 'Start timer'} onPress={onToggleTimer} style={styles.circleButton}>
          <Icon name={timer.running ? 'pause' : 'play'} size={24} color={colors.card}/>
        </Pressable>) : (<Pressable accessibilityLabel="Create task" onPress={onCreateTask} style={styles.pillButton}>
          <Text style={styles.pillLabel}>Create task</Text>
        </Pressable>)}
    </ScrollView>);
}
const styles = StyleSheet.create({
    scroll: { flex: 1, backgroundColor: colors.surface },
    page: { flexGrow: 1, minHeight: focus.contentMin, alignItems: 'center' },
    proWrap: { marginTop: 16, height: 40, justifyContent: 'center' },
    proWrapEmpty: { marginTop: -4 },
    proPill: {
        height: 40,
        width: 117.9,
        borderRadius: 20,
        backgroundColor: colors.card,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24,
        gap: 8,
        ...lift,
    },
    proPillQuiet: { shadowOpacity: 0.04 },
    proLabel: { ...typo.button, color: colors.ink },
    proLabelQuiet: { color: colors.quietInk },
    heading: { position: 'absolute', top: 108.25, alignItems: 'stretch' },
    title: { ...typo.focusTitle, color: colors.ink, textAlign: 'center' },
    subtitle: { ...typo.subtitle, color: colors.ink, textAlign: 'center' },
    timeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2.85 },
    time: { ...typo.timeRange, color: colors.ink },
    ringWrap: { position: 'absolute', left: focus.ringCenterX - focus.ringOuter, top: focus.ringCenterY - focus.ringOuter },
    disc: {
        position: 'absolute',
        left: focus.ringCenterX - focus.ringDisc,
        top: focus.ringCenterY - focus.ringDisc,
        width: focus.ringDisc * 2,
        height: focus.ringDisc * 2,
        borderRadius: focus.ringDisc,
    },
    digits: { ...typo.timerDigits, color: colors.ink, position: 'absolute', top: focus.digitsTop },
    circleButton: {
        position: 'absolute',
        top: focus.buttonTop,
        width: focus.buttonHeight,
        height: focus.buttonHeight,
        borderRadius: focus.buttonHeight / 2,
        backgroundColor: colors.ink,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pillButton: {
        position: 'absolute',
        top: focus.pillTop,
        height: focus.buttonHeight,
        borderRadius: focus.buttonHeight / 2,
        backgroundColor: colors.ink,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pillLabel: { ...typo.buttonStrong, color: colors.card },
});
