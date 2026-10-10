import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ClockGlyph, MoonGlyph, SunGlyph, SunriseGlyph } from './Glyphs';
import { Icon } from './Icon';
import { colors, space, type as typo } from '../tokens';
import type { TimeOfDay } from '../model';
const TINT: Record<TimeOfDay, string> = {
    anytime: colors.anytimePill,
    morning: colors.morningPill,
    afternoon: colors.afternoonPill,
    evening: colors.eveningPill,
};
const ICON: Record<TimeOfDay, (props: {
    size?: number;
    color?: string;
}) => React.ReactElement> = {
    anytime: ClockGlyph,
    morning: SunriseGlyph,
    afternoon: SunGlyph,
    evening: MoonGlyph,
};
const LABEL_LEFT: Record<TimeOfDay, number> = { anytime: 32.8, morning: 36, afternoon: 33.9, evening: 32.8 };
const PLAIN_LEFT = 13.8;
const ICON_LEFT = 11;
const ICON_GAP = 5.8;
interface Props {
    label: string;
    count: number;
    expanded: boolean;
    onToggle: () => void;
    section?: TimeOfDay;
    onAdd?: () => void;
}
export function SectionPill({ label, count, expanded, onToggle, section, onAdd }: Props) {
    const SectionGlyph = section ? ICON[section] : null;
    return (<View style={styles.row}>
      <Pressable accessibilityLabel={`${label} ${count}`} onPress={onToggle} style={[
            styles.pill,
            { backgroundColor: section ? TINT[section] : colors.donePill, paddingLeft: section ? LABEL_LEFT[section] : PLAIN_LEFT },
        ]}>
        {SectionGlyph && section ? (<View style={[styles.icon, { width: LABEL_LEFT[section] - ICON_LEFT - ICON_GAP }]}>
            <SectionGlyph size={16} color={colors.ink}/>
          </View>) : null}
        <Text style={styles.label}>{`${label} (${count})`}</Text>
        
        <Icon name="chevronUp" size={16} color={colors.ink} style={expanded ? styles.flipped : null}/>
      </Pressable>
      {onAdd && section ? (<Pressable accessibilityLabel={`Add task to ${section}`} onPress={onAdd} style={styles.add}>
          <View style={styles.plusDisc}>
            <Icon name="plusThin" size={14.2} lineHeight={14.6} color={colors.plusInk}/>
          </View>
        </Pressable>) : null}
    </View>);
}
const styles = StyleSheet.create({
    row: { height: space.pillHeight, flexDirection: 'row', alignItems: 'center' },
    pill: {
        height: space.pillHeight,
        borderRadius: space.pillRadius,
        paddingRight: 14.2,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6.2,
    },
    icon: { position: 'absolute', left: ICON_LEFT, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
    label: { ...typo.section, color: colors.ink },
    flipped: { transform: [{ rotate: '180deg' }] },
    add: {
        position: 'absolute',
        right: 5.8,
        width: 34.2,
        height: 34.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusDisc: {
        width: 18.4,
        height: 18.4,
        borderRadius: 9.2,
        backgroundColor: colors.sheet,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
