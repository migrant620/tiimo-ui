/**
 * Quick-create bottom sheet.
 *
 * Measured on runs/p1-capture-20260917/source/p1-quickcreate.png
 * (probe_qc1 .. probe_qc5). Two things had to be worked out before this could be
 * built rather than guessed:
 *
 *  1. **The backdrop is the Today page dimmed by the action-menu scrim, not an
 *     empty surface.** Reading down a column shows a flat #B1B1B1 above the
 *     sheet; #FCFCFC at 70% is 176.4, so the scrim is the same
 *     rgba(0, 0, 0, 0.30) the action menu already uses.
 *
 *  2. **The capture was taken with the IME open.** Everything below y495 is a
 *     keyboard (10/9/7 key rows with `#EFEDF1` gaps), so the sheet's own height
 *     is not visible directly. It is recoverable: the sheet's top edge sits at
 *     y379.2 and the keyboard's at y495.2, and the content that IS visible
 *     (16 pad + 45.5 input + 5 gap + 32 meta + 17.4 pad) is 115.9 tall, which is
 *     the same 116. A bottom-anchored sheet of that height lifted by the IME
 *     lands its top edge on the measured y379.2, so the sheet is content-driven.
 *
 *     Consequence for review: the prototype has no IME, so its sheet sits at the
 *     frame bottom (top edge y661) instead of y379.2. Divergence on this surface
 *     is therefore only like-for-like when the two sheets are aligned on their
 *     own top edges, which is how diff-qc.py compares them.
 *
 * What is NOT known, and is deliberately not invented: anything below the meta
 * row. Only 17 dp of blank sheet shows before the keyboard, so the reference's
 * confirm/save affordance — presumably a keyboard action — was never captured.
 * Submitting is wired to the field's submit action, and the trailing three-dot
 * circle is drawn from the reference but left inert, matching how Overlays.tsx
 * treats uncaptured rows.
 *
 * Scope: the reference only ever showed this sheet over the Today tab. The Focus
 * and To-do tabs still route to the full-screen form, which design-qa.md records
 * as unverified either way.
 */
import * as React from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ClockGlyph, MoreGlyph, RepeatGlyph } from './Glyphs';
import { Icon } from './Icon';
import { RepeatPicker } from './RepeatPicker';
import { colors, space, type as typo } from '../tokens';
import { DEFAULT_REPEAT } from '../model';
import type { RepeatOption, TimeOfDay } from '../model';

/** Same measured scrim as the action menu: #FCFCFC at 70% reads 176.4 ~ #B1B1B1. */
const scrim = 'rgba(0, 0, 0, 0.30)';

/**
 * The three chips are labels only; every one of them was captured unopened.
 */
function MetaChip({
  label,
  Glyph,
  glyphSize,
  padLeft,
  gap,
  onPress,
  style,
}: {
  label: string;
  Glyph?: (props: { size?: number; color?: string }) => React.ReactElement;
  glyphSize?: number;
  padLeft: number;
  gap?: number;
  onPress?: () => void;
  style: object;
}) {
  const inner = (
    <View style={[styles.chipInner, { paddingLeft: padLeft }]}>
      {Glyph ? (
        <>
          <Glyph size={glyphSize} color={colors.ink} />
          <View style={{ width: gap }} />
        </>
      ) : null}
      <Text style={styles.chipLabel}>{label}</Text>
    </View>
  );
  return (
    <View style={[styles.chip, style]}>
      {onPress ? (
        <Pressable accessibilityLabel={`${label} chip`} onPress={onPress} style={styles.chipPress}>
          {inner}
        </Pressable>
      ) : (
        <View accessibilityLabel={`${label} chip`} style={styles.chipPress}>
          {inner}
        </View>
      )}
    </View>
  );
}

export function QuickCreateSheet({
  section,
  onDismiss,
  onSubmit,
}: {
  section: TimeOfDay;
  onDismiss: () => void;
  onSubmit: (title: string, durationMin: number, timeOfDay: TimeOfDay, repeat: RepeatOption) => void;
}) {
  const [title, setTitle] = React.useState('');
  const [repeat, setRepeat] = React.useState<RepeatOption>(DEFAULT_REPEAT);
  const [repeatOpen, setRepeatOpen] = React.useState(false);

  const submit = () => {
    const value = title.trim();
    if (value.length === 0) return;
    onSubmit(value, 30, section, repeat);
  };

  return (
    <Modal transparent visible animationType="none" onRequestClose={onDismiss}>
      {/* While the Repeat picker is open it supplies the dim, and this scrim goes
          transparent. Nesting the two Modals would otherwise composite both
          scrims — a measured 123 over the page instead of the reference's 176,
          i.e. the page dimmed twice. The reference shows a single 30% scrim with
          everything outside the card dimmed once, including the sheet itself. */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Dismiss quick create"
        style={[styles.scrim, repeatOpen ? styles.scrimInert : null]}
        onPress={onDismiss}
      />
      <View style={styles.sheet} accessibilityLabel="Quick create sheet">
        <TextInput
          accessibilityLabel="Type to begin"
          autoFocus
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={submit}
          placeholder="Type to begin"
          placeholderTextColor={colors.placeholder}
          returnKeyType="done"
          style={[styles.input, title.trim().length > 0 && styles.inputWithSubmit]}
        />
        {/*
         * Submit affordance the reference draws at the right of the input once the
         * field is non-empty (registered as a missing piece in the QA log). The
         * action is the same create already wired to the Enter key; this only adds
         * the visible control, so it never changes behaviour for an empty field.
         */}
        {title.trim().length > 0 ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Create task" onPress={submit} style={styles.submit}>
            <Icon name="arrowRight" size={18} color={colors.card} />
          </Pressable>
        ) : null}

        <View style={styles.meta}>
          <MetaChip
            label="ANYTIME"
            Glyph={ClockGlyph}
            glyphSize={space.quickCreateGlyph}
            padLeft={7}
            gap={8}
            style={styles.chipA}
          />
          <MetaChip label="30M" padLeft={9} style={styles.chipB} />
          {/* Device capture opened the Repeat picker from this chip
              (`steps_c.txt`: repeat_tap on the "\uf1c9, NO REPEAT" node), so it
              is the one wired control on the row. The label also voices the
              current choice, which the reference does too. */}
          <MetaChip
            label={repeat === DEFAULT_REPEAT ? 'NO REPEAT' : repeat.toUpperCase()}
            Glyph={RepeatGlyph}
            glyphSize={space.quickCreateRepeatGlyph}
            padLeft={7}
            gap={9}
            onPress={() => setRepeatOpen(true)}
            style={styles.chipC}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="More options (not implemented)"
            onPress={() => undefined}
            style={styles.more}
          >
            <MoreGlyph size={space.quickCreateGlyph} color={colors.ink} />
          </Pressable>
        </View>
      </View>

      {repeatOpen ? (
        <RepeatPicker
          value={repeat}
          onSelect={(option) => {
            setRepeat(option);
            setRepeatOpen(false);
          }}
          onDismiss={() => setRepeatOpen(false)}
        />
      ) : null}
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: { flex: 1, backgroundColor: scrim },
  scrimInert: { backgroundColor: 'transparent' },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: space.quickCreateHeight,
    backgroundColor: colors.sheet,
    borderTopLeftRadius: space.quickCreateRadius,
    borderTopRightRadius: space.quickCreateRadius,
    paddingTop: space.quickCreatePadTop,
    paddingBottom: space.quickCreatePadBottom,
    paddingLeft: space.quickCreatePadLeft,
  },
  /**
   * Measured x21..365 — not symmetric with the sheet's 21 px left inset.
   *
   * `outlineStyle: none` is deliberate and web-only: Chrome draws a two-tone
   * focus ring on the focused input, and because the reference's field is focused
   * (its caret and the on-screen keyboard are in the capture) that ring read as a
   * white row plus a #101010 row immediately outside the field, adding two full
   * rows of ~200 mean-abs error to the sheet band. The Android original draws no
   * focus ring, only the caret, so the ring is suppressed to match. A production
   * build should reinstate a keyboard-focus affordance; see design-qa.md.
   */
  input: {
    ...typo.quickCreateInput,
    width: space.quickCreateInputWidth,
    height: space.quickCreateInputHeight,
    padding: 0,
    color: colors.ink,
    outlineStyle: 'none',
    outlineWidth: 0,
  } as object,
  meta: {
    height: space.quickCreateMetaHeight,
    marginTop: space.quickCreateInputToMeta,
  },
  /**
   * Visible submit control shown only once the field holds text, matching the
   * reference's right-aligned affordance. Sits on the input row, clear of the
   * meta chips below.
   */
  submit: {
    position: 'absolute',
    right: space.quickCreatePadLeft,
    top: space.quickCreatePadTop + (space.quickCreateInputHeight - 32) / 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** Keeps typed text from sliding under the submit control. */
  inputWithSubmit: { paddingRight: 40 },
  chip: {
    position: 'absolute',
    height: space.quickCreateMetaHeight,
    borderRadius: space.quickCreatePillRadius,
    backgroundColor: colors.card,
  },
  chipInner: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  chipPress: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  chipLabel: { ...typo.chipLabel, color: colors.ink },
  chipA: { left: space.quickCreatePillALeft, width: space.quickCreatePillAWidth },
  chipB: { left: space.quickCreatePillBLeft, width: space.quickCreatePillBWidth },
  chipC: { left: space.quickCreatePillCLeft, width: space.quickCreatePillCWidth },
  /**
   * Measured x282..310 and y446..475: 29x30, i.e. 1 dp narrower than the pills
   * and inset 1 dp top and bottom of the 32 dp row.
   */
  more: {
    position: 'absolute',
    left: space.quickCreateMoreLeft,
    width: space.quickCreateMoreWidth,
    height: space.quickCreateMoreHeight,
    top: (space.quickCreateMetaHeight - space.quickCreateMoreHeight) / 2,
    borderRadius: space.quickCreateMoreHeight / 2,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
