/**
 * Repeat options card.
 *
 * Transcribed from runs/p1-capture-20260917/raw/p1-repeat.png: the reference
 * draws it as an inset card over a 30% scrim — a "Repeat" title, then a white
 * list of eight rows, each a label plus a trailing radio, the current choice
 * marked.
 *
 * Extracted from UpdateTaskScreen so both hosts the reference demonstrates can
 * use the same component. The device capture opened it from the quick-create
 * sheet's NO REPEAT chip (`steps_c.txt`: repeat_tap on the node whose
 * content-desc is "\uf1c9, NO REPEAT"), and the form's own Repeat row opens it
 * too, so hosting and scrim differ but the card does not.
 *
 * The one content difference between the two hosts: the form's inline list adds
 * "Custom" as a ninth row (read from the form's own node bounds), which the
 * captured card does not show. The card therefore draws `REPEAT_CARD_OPTIONS`
 * (eight) and the inline list `REPEAT_OPTIONS` (nine), keeping the card's
 * measured 8-row box.
 *
 * All values measured on that capture:
 *   card   x20..373, y80..672.8, radius 26, `surface`
 *   title  line box y104..137, ink 71.3 wide with a 16.7 cap height
 *   list   x45.1..347.5, y152.8..648.6, eight 62 px rows on 1 px `sheet` hairlines
 *   radio  20 px ring at x306..326, 10 px dot when selected
 */
import * as React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { RadioGlyph } from './Glyphs';
import { colors, lift, space, type as typo } from '../tokens';
import { REPEAT_CARD_OPTIONS, REPEAT_OPTIONS } from '../model';
import type { RepeatOption } from '../model';

export function RepeatPicker({
  value,
  onSelect,
  onDismiss,
  inline,
}: {
  value: RepeatOption;
  onSelect: (option: RepeatOption) => void;
  onDismiss: () => void;
  /** When true, render the option list inline (no full-screen scrim/Modal). */
  inline?: boolean;
}) {
  // The captured card carries eight rows; the form's inline list adds "Custom"
  // as a ninth (see `REPEAT_CARD_OPTIONS`). Using the nine-item list in the card
  // would grow its measured y80..672.8 box by one 62 dp row.
  const options = inline ? REPEAT_OPTIONS : REPEAT_CARD_OPTIONS;
  const card = (
    <View style={inline ? styles.inlineCard : styles.repeatCard}>
      <Text accessibilityRole="header" style={styles.repeatTitle}>
        Repeat
      </Text>
      <View style={styles.repeatList} accessibilityRole="radiogroup">
        {options.map((option) => (
          <Pressable
            key={option}
            accessibilityRole="radio"
            accessibilityLabel={`Repeat ${option}`}
            accessibilityState={{ checked: option === value }}
            onPress={() => onSelect(option)}
            style={styles.repeatRow}
          >
            <Text style={styles.repeatLabel}>{option}</Text>
            {/* Sampled per pixel on the reference: the unselected ring is ink
                #111717 and the selected ring + dot are primary #9F85FF. */}
            <RadioGlyph
              size={space.repeatRadioSize}
              strokeWidth={space.repeatRadioStroke}
              dotSize={space.repeatRadioDot}
              selected={option === value}
              color={option === value ? colors.primary : colors.ink}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );

  if (inline) {
    return card;
  }

  return (
    <Modal transparent visible animationType="none" onRequestClose={onDismiss}>
      <Pressable
        accessibilityLabel="Dismiss repeat options"
        style={[styles.scrim, { backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' } as any]}
        onPress={onDismiss}
      />
      {card}
    </Modal>
  );
}

const styles = StyleSheet.create({
  /** The backdrop outside the card reads ~180 over the light page, i.e. black at
   *  30% — the same scrim the action menu uses. 24 + 33 (title line box) + 16 +
   *  8 x 62 + 24 = 593, the measured card height from y80 to y672.8. */
  scrim: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.30)' },
  repeatCard: {
    position: 'absolute',
    top: space.repeatCardTop,
    left: space.repeatCardInset,
    right: space.repeatCardInset,
    backgroundColor: colors.surface,
    borderRadius: space.repeatCardRadius,
    paddingHorizontal: space.repeatCardPadX,
    paddingTop: space.repeatCardPadTop,
    paddingBottom: space.repeatCardPadBottom,
  },
  // Inline variant: same card, but positioned by the parent (no absolute pin,
  // no scrim) so it can drop down inside the Update-task form's Repeat row.
  inlineCard: {
    backgroundColor: colors.surface,
    borderRadius: space.repeatCardRadius,
    paddingHorizontal: space.repeatCardPadX,
    paddingTop: space.repeatCardPadTop,
    paddingBottom: space.repeatCardPadBottom,
    ...lift,
  },
  repeatTitle: { ...typo.pickerTitle, color: colors.ink },
  repeatList: {
    marginTop: space.repeatTitleToList,
    borderRadius: space.repeatListRadius,
    overflow: 'hidden',
    backgroundColor: colors.card,
  },
  repeatRow: {
    height: space.repeatRowHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: space.repeatRowPadLeft,
    paddingRight: space.repeatRowPadRight,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.sheet,
  },
  repeatLabel: { ...typo.body, color: colors.ink },
});
