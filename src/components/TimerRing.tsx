import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Icon } from './Icon';
import { colors, focus } from '../tokens';
const SIZE = focus.ringOuter * 2;
const BAND = focus.ringOuter - focus.ringDisc;
interface Props {
    discColor?: string;
    marker?: string;
    elapsedSec?: number;
    totalSec?: number;
}
function arcPath(angle: number) {
    const c = SIZE / 2;
    const r = focus.badgeRadius;
    const rad = (Math.min(angle, 359.9) * Math.PI) / 180;
    const x = c + r * Math.sin(rad);
    const y = c - r * Math.cos(rad);
    return `M ${c} ${c - r} A ${r} ${r} 0 ${angle > 180 ? 1 : 0} 1 ${x} ${y}`;
}
export function TimerRing({ discColor = colors.discDefault, marker, elapsedSec = 0, totalSec = 0 }: Props) {
    const angle = totalSec > 0 ? (Math.min(elapsedSec, totalSec) / totalSec) * 360 : 0;
    const rad = (angle * Math.PI) / 180;
    const head = {
        x: SIZE / 2 + focus.badgeRadius * Math.sin(rad),
        y: SIZE / 2 - focus.badgeRadius * Math.cos(rad),
    };
    const glyphPos = {
        left: head.x - focus.arrowSize / 2,
        top: head.y - focus.arrowSize / 2,
        transform: [{ rotate: `${angle - 90}deg` }],
    };
    return (<View style={styles.wrap}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <Circle cx={SIZE / 2} cy={SIZE / 2} r={(focus.ringOuter + focus.ringDisc) / 2} fill="none" stroke={colors.aura} strokeWidth={BAND}/>
        {marker ? (angle > 0.05 ? (<Path d={arcPath(angle)} stroke={colors.primary} strokeWidth={focus.arcWidth} strokeLinecap="round" fill="none"/>) : (<Circle cx={head.x} cy={head.y} r={focus.arcWidth / 2} fill={colors.primary}/>)) : null}
        <Circle cx={SIZE / 2} cy={SIZE / 2} r={focus.ringDisc} fill={discColor}/>
      </Svg>
      {marker ? (<View style={styles.markerSlot} pointerEvents="none">
          <Text style={styles.marker}>{marker}</Text>
        </View>) : null}
      {marker ? (<View style={[styles.arrow, glyphPos]} pointerEvents="none">
          <Icon name="arrowDown" size={focus.arrowSize} color={colors.badgeArrow}/>
        </View>) : null}
    </View>);
}
const styles = StyleSheet.create({
    wrap: {
        width: SIZE,
        height: SIZE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerSlot: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
    marker: { fontSize: 74.6, lineHeight: 93.5 },
    arrow: { position: 'absolute', width: focus.arrowSize, height: focus.arrowSize, alignItems: 'center', justifyContent: 'center' },
});
