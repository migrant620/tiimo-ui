/**
 * Action menu sheet and delete confirmation dialog.
 *
 * Measured (03-action-menu.png / 08-delete-confirm.png):
 *  - sheet: `sheet` #F6F5F4, 28 dp top radius, top edge at y353 on the 393x777
 *    frame, heightening to the frame bottom; eight rows on a 48.57 dp pitch with the
 *    icon at x40 and the label at x80; "Delete task" is the danger row.
 *  - menu scrim: the page reads #B1B1B1 over a #FCFCFC surface, i.e. black at 30%.
 *  - dialog scrim: far lighter — the reference backdrop reads 243..246 over the
 *    same surface, so the dialog dims at ~3.2% (a frosted feel, not a dark scrim).
 *  - dialog: off-white card x21..373 (352 wide) y300..449 (150 tall), 24 dp radius,
 *    serif "Delete task?" title, then two 40 dp pill buttons — Cancel on
 *    #E5E0DA and Delete on #7C5157 with white text.
 *
 * Known open gap: the reference backdrop carries no text ink at all, while this
 * prototype's light scrim lets the Today cards read through. Dimming to the
 * measured 3.2% cannot hide them, so the reference is almost certainly blurring
 * the backdrop; no blur radius was measured, so none is applied. See design-qa.md.
 *
 * Rows that exist in the reference but were never exercised keep their real
 * labels and no-op handlers; IMPLEMENTED_ROWS lists the wired ones.
 */
import * as React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ArrowRightGlyph, BreakdownGlyph } from './Glyphs';
import { Icon } from './Icon';
import type { GlyphName } from './Icon';
import { colors, type as typo } from '../tokens';
import { ACTION_MENU_ROWS, IMPLEMENTED_ROWS } from '../model';
import type { Task } from '../model';

// Reference glyph TextViews (codepoints in Icon.tsx); "Suggest breakdown" is an SVG there too.
const MENU_GLYPH: Record<string, GlyphName | null> = {
  'Make a copy': 'copy',
  'Move to list': 'trayUp',
  'Reschedule task': 'calendar',
  'Reschedule for tomorrow': 'calendar',
  'Suggest breakdown': null,
  'Start task': 'play',
  'Edit task': 'pencil',
  'Delete task': 'trash',
};

const scrim = 'rgba(0, 0, 0, 0.30)';
// The delete confirmation blurs the page and dims it lightly. The constant below used to read 0.048
// ("blank page areas read 239..240"), which contradicted this file's own header - the reference
// backdrop reads 243..246 - and the raster agrees with the header, not the constant: over
// V8-delete-confirm's backdrop the reference's median is 244 with a 251 light end (y 600-640,
// x 20-370 dp), while the prototype measured 239 flat. 0.032 over the #FCFCFC surface gives 244.
// The action menu does NOT blur: its backdrop is a flat 177 with the page still legible.
const dialogScrim = 'rgba(0, 0, 0, 0.032)';
// Radius fitted against the reference backdrop (mean abs error over the page
// areas above and below the panel): 1.5px 8.30, 2px 8.19, 3px 8.34, 5px 8.97.
const dialogBlur = { backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' } as object;

export function ActionMenuSheet({
  task,
  onSelect,
  onDismiss,
}: {
  task: Task;
  onSelect: (row: (typeof ACTION_MENU_ROWS)[number]) => void;
  onDismiss: () => void;
}) {
  return (
    <Modal transparent visible animationType="none" onRequestClose={onDismiss}>
      <Pressable
        accessibilityLabel="Dismiss menu"
        style={styles.scrim}
        onPress={onDismiss}
      />
      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {ACTION_MENU_ROWS.map((row) => {
            const Glyph = MENU_GLYPH[row];
            const isDestructive = row === 'Delete task';
            const implemented = IMPLEMENTED_ROWS.includes(row);
            return (
              <Pressable
                key={row}
                accessibilityLabel={implemented ? row : `${row} (not implemented)`}
                onPress={() => onSelect(row)}
                style={styles.menuRow}
              >
                <View style={styles.menuIcon}>
                  {Glyph ? (
                    <Icon name={Glyph} size={20} lineHeight={20.7} color={isDestructive ? colors.danger : colors.ink} />
                  ) : (
                    <BreakdownGlyph size={20} color={colors.ink} />
                  )}
                </View>
                <Text style={[styles.menuLabel, isDestructive && styles.menuLabelDanger]}>{row}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
}

export function DeleteDialog({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal transparent visible animationType="none" onRequestClose={onCancel}>
      <Pressable
        accessibilityLabel="Dismiss dialog"
        style={[styles.dialogScrim, dialogBlur]}
        onPress={onCancel}
      />
      <View style={styles.dialogWrap} pointerEvents="box-none">
        <View style={styles.dialog}>
          <Text accessibilityRole="header" style={styles.dialogTitle}>
            Delete task?
          </Text>
          <View style={styles.dialogButtons}>
            <Pressable accessibilityLabel="Cancel" onPress={onCancel} style={[styles.dialogButton, styles.cancelButton]}>
              <Text style={styles.cancelLabel}>Cancel</Text>
            </Pressable>
            <Pressable accessibilityLabel="Delete" onPress={onConfirm} style={[styles.dialogButton, styles.deleteButton]}>
              <Text style={styles.deleteLabel}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// Reference bounds (dp). Menu: sheet top y352.4 with a ~34 dp corner radius; rows
// x16..377 on a 48.75 pitch from y372.6, icon box x36 (20 wide), label x68.
// Dialog: panel x20.4..372.6, y300..452; title box at (44, 323.9), 32.8 tall;
// buttons 144.5x40 at y388.6 with a 16 dp gap.
const styles = StyleSheet.create({
  scrim: { flex: 1, backgroundColor: scrim },
  dialogScrim: { flex: 1, backgroundColor: dialogScrim },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '60%',
    backgroundColor: colors.sheet,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  menuRow: {
    height: 48.75,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  menuIcon: { width: 20, alignItems: 'center' },
  menuLabel: { ...typo.menuRow, color: colors.ink, marginLeft: 12 },
  menuLabelDanger: { color: colors.danger },
  dialogWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // Panel centre y376 sits 12.5 dp above the frame centre.
    paddingBottom: 25,
  },
  dialog: {
    width: 352.2,
    backgroundColor: colors.dialog,
    borderRadius: 24,
    paddingHorizontal: 23.6,
    paddingTop: 23.9,
    paddingBottom: 23.4,
  },
  dialogTitle: { ...typo.dialogTitle, color: colors.ink },
  dialogButtons: { flexDirection: 'row', marginTop: 31.9, gap: 16 },
  dialogButton: { flex: 1, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  cancelButton: { backgroundColor: colors.cancelFill },
  deleteButton: { backgroundColor: colors.dangerFill },
  cancelLabel: { ...typo.buttonStrong, color: colors.ink },
  deleteLabel: { ...typo.buttonStrong, color: colors.card },
});

export const MENU_ARROW = ArrowRightGlyph;
