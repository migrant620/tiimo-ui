import * as React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ArrowRightGlyph, BreakdownGlyph } from './Glyphs';
import { Icon } from './Icon';
import type { GlyphName } from './Icon';
import { colors, type as typo } from '../tokens';
import { ACTION_MENU_ROWS, IMPLEMENTED_ROWS } from '../model';
import type { Task } from '../model';
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
const dialogScrim = 'rgba(0, 0, 0, 0.048)';
const dialogBlur = { backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' } as object;
export function ActionMenuSheet({ task, onSelect, onDismiss, }: {
    task: Task;
    onSelect: (row: (typeof ACTION_MENU_ROWS)[number]) => void;
    onDismiss: () => void;
}) {
    return (<Modal transparent visible animationType="none" onRequestClose={onDismiss}>
      <Pressable accessibilityLabel="Dismiss menu" style={styles.scrim} onPress={onDismiss}/>
      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {ACTION_MENU_ROWS.map((row) => {
            const Glyph = MENU_GLYPH[row];
            const isDestructive = row === 'Delete task';
            const implemented = IMPLEMENTED_ROWS.includes(row);
            return (<Pressable key={row} accessibilityLabel={implemented ? row : `${row} (not implemented)`} onPress={() => onSelect(row)} style={styles.menuRow}>
                <View style={styles.menuIcon}>
                  {Glyph ? (<Icon name={Glyph} size={20} lineHeight={20.7} color={isDestructive ? colors.danger : colors.ink}/>) : (<BreakdownGlyph size={20} color={colors.ink}/>)}
                </View>
                <Text style={[styles.menuLabel, isDestructive && styles.menuLabelDanger]}>{row}</Text>
              </Pressable>);
        })}
        </ScrollView>
      </View>
    </Modal>);
}
export function DeleteDialog({ onCancel, onConfirm, }: {
    onCancel: () => void;
    onConfirm: () => void;
}) {
    return (<Modal transparent visible animationType="none" onRequestClose={onCancel}>
      <Pressable accessibilityLabel="Dismiss dialog" style={[styles.dialogScrim, dialogBlur]} onPress={onCancel}/>
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
    </Modal>);
}
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
