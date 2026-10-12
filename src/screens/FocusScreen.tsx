/**
 * Focus timer screen.
 *
 * Measured geometry (probe.py on 06-focus-paused / 07-focus-empty):
 *  - a GET PRO pill centred near the top; its label sits at y31..40 while a task
 *    is focused but at y10..21 in the empty state, a ~21 dp difference between two
 *    frames of the same component that no single static layout can satisfy. The
 *    task-focused position is the one reproduced here (see design-qa.md).
 *  - a serif task title (ink band y115..135) with a time block caption below it
 *  - the caption is `ink`, not muted: the raw capture's darkest pixel in that band
 *    is (17,23,23) in both the paused and the empty frame
 *  - the ring centred at (197, 304): outer radius 121, disc radius 86
 *  - the countdown digits BELOW the ring (ink band y448..482), 46 dp
 *  - a black control at y509..549: a 40 dp circle with the play/pause glyph while
 *    a task is focused, and a ~125 dp pill reading "Create task" when empty
 *
 * The free tier has no +1 / add-time control, so none is drawn. Drag-to-adjust on
 * the ring was never proven and is likewise absent. Tapping the ring opens the
 * update-task form while the countdown keeps running, which is why the ring is
 * pressable here.
 */
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

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <View style={[styles.proWrap, !task && styles.proWrapEmpty]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Get Pro"
          onPress={() => undefined}
          style={[styles.proPill, task ? styles.proPillQuiet : null]}
        >
          <Text style={[styles.proLabel, task ? styles.proLabelQuiet : null]}>GET PRO</Text>
          <SparkleGlyph size={15} color={colors.primary} />
        </Pressable>
      </View>

      <View style={styles.heading}>
        <Text accessibilityRole="header" style={styles.title}>
          {task ? task.title : 'Focus'}
        </Text>
        {task ? (
          started !== null ? (
            <View style={styles.timeRow}>
              <Text style={styles.time}>{clock(started)}</Text>
              <Icon name="arrowRight" size={8.7} color={colors.ink} />
              <Text style={styles.time}>{clock(started + totalSec * 1000)}</Text>
            </View>
          ) : null
        ) : (
          <Text style={styles.subtitle}>Create a task to start focus</Text>
        )}
      </View>

      <View style={styles.ringWrap} pointerEvents="box-none">
        <TimerRing
          discColor={task ? MARKER_DISC_COLOUR : colors.discDefault}
          marker={task?.marker ?? undefined}
          elapsedSec={task ? totalSec - timer.remainingSec : 0}
          totalSec={totalSec}
        />
      </View>
      {task ? (
        // The reference's pressable is the disc (109.2, 215.8, 175.4 x 175), not the outer ring.
        <Pressable accessibilityRole="button" accessibilityLabel="Timer disc; opens the update task form" onPress={onRingPress} style={styles.disc} />
      ) : null}

      <Text style={styles.digits}>{countdown(timer.remainingSec)}</Text>

      {task ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={timer.running ? 'Pause timer' : 'Start timer'}
          onPress={onToggleTimer}
          style={styles.circleButton}
        >
          <Icon name={timer.running ? 'pause' : 'play'} size={24} color={colors.card} />
        </Pressable>
      ) : (
        <Pressable accessibilityRole="button" accessibilityLabel="Create task" onPress={onCreateTask} style={styles.pillButton}>
          <Text style={styles.pillLabel}>Create task</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

// Reference bounds (dp), 20-paused and 31-focus-empty:
//  - GET PRO 117.9x40 at y16 with a task, but y-4 in the empty state (the same
//    control sits 20 dp higher there; both frames agree with their own dumps).
//    With a task the pill is quiet: label (110,114,114), barely any shadow.
//  - title box top y107.3 / 109.2, 36 tall; "Create a task to start focus" and
//    the "09:24 AM -> 09:54 AM" row sit directly under it; the title and
//    subtitle share one column as wide as the wider line.
//  - digits (Recoleta, 52 dp box) top y440.7 / 442.5; control circle y508.7,
//    "Create task" pill y510.5 with the label 24 dp in.
const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.surface },
  // The controls end at y550.5 and the floating nav starts at y707 on the 777 dp
  // frame. On a shorter screen the page scrolls so they can clear the nav.
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
