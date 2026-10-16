/**
 * Today header row.
 *
 * Measured (bands-01-today-clean.json + row-36 probe): the band occupies y15..58,
 * so a 43 dp row with a 15 dp top inset. GET PRO is a white pill x136..257
 * (121x43) with a purple sparkle; the gear and add controls are white circles of
 * the same height at x288..330 and x339..379.
 */
import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SparkleGlyph } from './Glyphs';
import { Icon } from './Icon';
import { colors, frame, lift, space, type as typo } from '../tokens';

export function TodayHeader({ onAdd, onSettings }: { onAdd: () => void; onSettings?: () => void }) {
  return (
    <View style={styles.row}>
      {/* R32: the gear was `onPress={() => undefined}` — a labelled 40 dp circle on every
          page that did nothing. It now opens screens/SettingsScreen.tsx. The prop is
          optional so an existing caller keeps compiling; App.tsx passes it on every page. */}
      <Pressable accessibilityLabel="Get Pro" onPress={() => undefined} style={styles.proPill}>
        <Text style={styles.proLabel}>GET PRO</Text>
        <SparkleGlyph size={18} color={colors.primary} />
      </Pressable>
      <View style={styles.controls}>
        <Pressable accessibilityLabel="Settings" onPress={onSettings ?? (() => undefined)} style={styles.circle}>
          <Icon name="cog" size={24} color={colors.ink} />
        </Pressable>
        <Pressable accessibilityLabel="Add task" onPress={onAdd} style={styles.circle}>
          <Icon name="plus" size={24} lineHeight={24.7} color={colors.ink} />
        </Pressable>
      </View>
    </View>
  );
}

const CIRCLE = 40;
const PRO_W = 117.5;

const styles = StyleSheet.create({
  row: {
    height: space.headerHeight,
    marginTop: space.headerTop,
    justifyContent: 'center',
  },
  /** Reference bounds x137.9..255.4, y16..56; label starts 24 dp in.
   *  R28: the pill's own box is 117.5 x 40 on both sides, so this is a view box against a
   *  view box and the 1.1 dp gap is a real offset, not a run-box artefact - centring the
   *  width puts the left edge on 137.75 and the reference reads 137.9, i.e. 0.15 dp right of
   *  centre. The old -0.9 was a correction in the wrong direction. */
  proPill: {
    position: 'absolute',
    left: (frame.width - PRO_W) / 2 + 0.15,
    width: PRO_W,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    gap: 8,
    ...lift,
  },
  proLabel: { ...typo.button, color: colors.ink },
  /** Add circle x337..377; gear circle centred on its glyph at x308.9. */
  controls: {
    position: 'absolute',
    right: 16,
    height: space.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.1,
  },
  circle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...lift,
  },
});
