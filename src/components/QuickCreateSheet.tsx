import * as React from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ClockGlyph, MoreGlyph, RepeatGlyph } from './Glyphs';
import { RepeatPicker } from './RepeatPicker';
import { colors, space, type as typo } from '../tokens';
import { DEFAULT_REPEAT } from '../model';
import type { RepeatOption, TimeOfDay } from '../model';
const scrim = 'rgba(0, 0, 0, 0.30)';
function MetaChip({ label, Glyph, glyphSize, padLeft, gap, onPress, style, }: {
    label: string;
    Glyph?: (props: {
        size?: number;
        color?: string;
    }) => React.ReactElement;
    glyphSize?: number;
    padLeft: number;
    gap?: number;
    onPress?: () => void;
    style: object;
}) {
    const inner = (<View style={[styles.chipInner, { paddingLeft: padLeft }]}>
      {Glyph ? (<>
          <Glyph size={glyphSize} color={colors.ink}/>
          <View style={{ width: gap }}/>
        </>) : null}
      <Text style={styles.chipLabel}>{label}</Text>
    </View>);
    return (<View style={[styles.chip, style]}>
      {onPress ? (<Pressable accessibilityLabel={`${label} chip`} onPress={onPress} style={styles.chipPress}>
          {inner}
        </Pressable>) : (<View accessibilityLabel={`${label} chip`} style={styles.chipPress}>
          {inner}
        </View>)}
    </View>);
}
export function QuickCreateSheet({ section, onDismiss, onSubmit, }: {
    section: TimeOfDay;
    onDismiss: () => void;
    onSubmit: (title: string, durationMin: number, timeOfDay: TimeOfDay, repeat: RepeatOption) => void;
}) {
    const [title, setTitle] = React.useState('');
    const [repeat, setRepeat] = React.useState<RepeatOption>(DEFAULT_REPEAT);
    const [repeatOpen, setRepeatOpen] = React.useState(false);
    const submit = () => {
        const value = title.trim();
        if (value.length === 0)
            return;
        onSubmit(value, 30, section, repeat);
    };
    return (<Modal transparent visible animationType="none" onRequestClose={onDismiss}>
      
      <Pressable accessibilityLabel="Dismiss quick create" style={[styles.scrim, repeatOpen ? styles.scrimInert : null]} onPress={onDismiss}/>
      <View style={styles.sheet} accessibilityLabel="Quick create sheet">
        <TextInput accessibilityLabel="Type to begin" autoFocus value={title} onChangeText={setTitle} onSubmitEditing={submit} placeholder="Type to begin" placeholderTextColor={colors.placeholder} returnKeyType="done" style={styles.input}/>

        <View style={styles.meta}>
          <MetaChip label="ANYTIME" Glyph={ClockGlyph} glyphSize={space.quickCreateGlyph} padLeft={7} gap={8} style={styles.chipA}/>
          <MetaChip label="30M" padLeft={9} style={styles.chipB}/>
          
          <MetaChip label={repeat === DEFAULT_REPEAT ? 'NO REPEAT' : repeat.toUpperCase()} Glyph={RepeatGlyph} glyphSize={space.quickCreateRepeatGlyph} padLeft={7} gap={9} onPress={() => setRepeatOpen(true)} style={styles.chipC}/>
          <Pressable accessibilityLabel="More options (not implemented)" onPress={() => undefined} style={styles.more}>
            <MoreGlyph size={space.quickCreateGlyph} color={colors.ink}/>
          </Pressable>
        </View>
      </View>

      {repeatOpen ? (<RepeatPicker value={repeat} onSelect={(option) => {
                setRepeat(option);
                setRepeatOpen(false);
            }} onDismiss={() => setRepeatOpen(false)}/>) : null}
    </Modal>);
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
