/**
 * Focus timer ring.
 *
 * Measured cross-sections (probe.py on 06-focus-paused / 07-focus-empty):
 *  - flat light-lavender annulus #F4F1FD, outer radius 121, thickness ~35
 *  - plain inner disc, radius 86, filled with the task colour (#95C8DB for the
 *    observed task, #FAEFE0 when no task is selected)
 *  - a purple #9F85FF round-capped progress arc (a 35.3 dp circle at 0 s) whose
 *    head carries a white arrow
 *  - the countdown digits are BELOW the ring, not inside it
 *
 * The earlier draft read the emoji and badge colours as ring segments and drew
 * three coloured arcs; that was wrong and is corrected here. The annulus is flat.
 *
 * Progress: a purple arc grows clockwise from the top of the ring, with the
 * badge and its arrow at the head. One turn is the task's duration. Read off four
 * captures of a 30 min task: the arrow glyph sits at 0.6° / 5.8° / 6.4° / 12.05°
 * after 4 / 30 / 33 / 63 s (0.19-0.2° per second = 360° per 30 min), 104.4 dp
 * from the ring centre, while the purple area's centroid sits at half that angle,
 * which is what an arc from 0° to the head gives. The arrow is MDI arrow-down
 * turned to point along the direction of travel.
 *
 * Deliberately absent: drag-to-adjust (unproven) and any +1 / add-time control
 * (the free tier has none).
 */
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
  /** Seconds of focus already spent and the task's length: the arc's share of one turn. */
  elapsedSec?: number;
  totalSec?: number;
}

/** Arc along the ring's centre line from 12 o'clock clockwise to `angle` degrees. */
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
  return (
    <View style={styles.wrap}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={(focus.ringOuter + focus.ringDisc) / 2}
          fill="none"
          stroke={colors.aura}
          strokeWidth={BAND}
        />
        {marker ? (
          angle > 0.05 ? (
            <Path d={arcPath(angle)} stroke={colors.primary} strokeWidth={focus.arcWidth} strokeLinecap="round" fill="none" />
          ) : (
            <Circle cx={head.x} cy={head.y} r={focus.arcWidth / 2} fill={colors.primary} />
          )
        ) : null}
        <Circle cx={SIZE / 2} cy={SIZE / 2} r={focus.ringDisc} fill={discColor} />
      </Svg>
      {marker ? (
        <View style={styles.markerSlot} pointerEvents="none">
          <Text style={styles.marker}>{marker}</Text>
        </View>
      ) : null}
      {marker ? (
        // Glyph box 18.9 wide at 0.6°, 20.4 at 5.8°, 22.6 at 12° = an 18.6 dp glyph turning.
        <View style={[styles.arrow, glyphPos]} pointerEvents="none">
          <Icon name="arrowDown" size={focus.arrowSize} color={colors.badgeArrow} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerSlot: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  // Reference emoji box 87.3 dp wide; colour emoji advance is ~1.17 em.
  marker: { fontSize: 74.6, lineHeight: 93.5 },
  arrow: { position: 'absolute', width: focus.arrowSize, height: focus.arrowSize, alignItems: 'center', justifyContent: 'center' },
});
