import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Stop, Rect } from 'react-native-svg';
import { CheckSquareGlyph, CrescentGlyph } from './Glyphs';
import { colors, lift, nav, type as typo } from '../tokens';
import type { Tab } from '../model';
function CalendarSlot({ active }: {
    active: boolean;
}) {
    const ink = active ? colors.ink : colors.navInactive;
    return (<View style={styles.calendarWrap}>
      <Svg width={25} height={25} viewBox="0 0 25 25">
        <Rect x="1.5" y="1.5" width="22" height="22" rx="4.5" fill={colors.card} stroke={ink} strokeWidth={2}/>
        <Path d="M1.5 6a4.5 4.5 0 0 1 4.5-4.5h13a4.5 4.5 0 0 1 4.5 4.5v1.8h-22z" fill={ink}/>
      </Svg>
      <Text style={[styles.calendarDay, { color: ink }]}>31</Text>
    </View>);
}
function Avatar() {
    return (<Svg width={nav.avatarSize} height={nav.avatarSize} viewBox="2.5 2.5 44 44">
      <Defs>
        <LinearGradient id="avatarFill" x1="0" y1="0.2" x2="1" y2="0.8">
          <Stop offset="0" stopColor="#A78FFF"/>
          <Stop offset="1" stopColor="#D9D0FB"/>
        </LinearGradient>
      </Defs>
      <Circle cx="24.5" cy="24.5" r="24.5" fill="#FFFFFF"/>
      <Circle cx="24.5" cy="24.5" r="21.5" fill="url(#avatarFill)"/>
      <Ellipse cx="18" cy="21" rx="3.4" ry="4.2" fill="#111717"/>
      <Ellipse cx="31" cy="21" rx="3.4" ry="4.2" fill="#111717"/>
      <Ellipse cx="18.8" cy="20" rx="1.3" ry="1.6" fill="#FFFFFF"/>
      <Ellipse cx="31.8" cy="20" rx="1.3" ry="1.6" fill="#FFFFFF"/>
      <Path d="M23 30.5c1.4 1.6 3.4 1.6 4.8 0" stroke="#111717" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
    </Svg>);
}
interface Props {
    active: Tab;
    onSelect: (tab: Tab) => void;
}
export function BottomNav({ active, onSelect }: Props) {
    const slot = (tab: Tab, content: React.ReactNode, label: string) => {
        const isActive = active === tab;
        return (<Pressable accessibilityLabel={label} accessibilityState={{ selected: isActive }} onPress={() => onSelect(tab)} style={[styles.slot, isActive && styles.slotActive]}>
        {content}
      </Pressable>);
    };
    return (<View style={styles.band}>
      <View style={styles.bar}>
        {slot('todo', <CheckSquareGlyph size={27} color={active === 'todo' ? colors.ink : colors.navTodo}/>, 'To-do')}
        {slot('today', <CalendarSlot active={active === 'today'}/>, 'Today')}
        {slot('focus', <CrescentGlyph size={27} color={active === 'focus' ? colors.ink : colors.navInactive}/>, 'Focus')}
      </View>
      <Pressable accessibilityLabel="Profile" onPress={() => undefined} style={styles.avatarSlot}>
        <Avatar />
      </Pressable>
    </View>);
}
const styles = StyleSheet.create({
    band: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: nav.barBottom,
        height: nav.barHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: nav.barLeft,
    },
    bar: {
        width: nav.barWidth,
        height: nav.barHeight,
        borderRadius: nav.barHeight / 2,
        backgroundColor: colors.card,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: nav.barInset,
        ...lift,
    },
    slot: {
        width: nav.slotWidth,
        height: nav.slotHeight,
        borderRadius: nav.slotRadius,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slotActive: { backgroundColor: colors.navSlot },
    calendarWrap: { width: 25, height: 25, alignItems: 'center', justifyContent: 'center' },
    calendarDay: { position: 'absolute', top: 9.5, ...typo.weekdayLetter, fontSize: 9.5, lineHeight: 11 },
    avatarSlot: {
        position: 'absolute',
        right: nav.avatarRight,
        bottom: 0,
        width: nav.avatarWell,
        height: nav.avatarWell,
        borderRadius: nav.avatarWell / 2,
        backgroundColor: colors.card,
        alignItems: 'center',
        justifyContent: 'center',
        ...lift,
    },
});
