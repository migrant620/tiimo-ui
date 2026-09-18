import * as React from 'react';
import { Text } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';
export const GLYPH = {
    close: ['MDI', 0xf0156],
    check: ['MDI', 0xf012c],
    chevronUp: ['MDI', 0xf0143],
    lock: ['MDI', 0xf033e],
    play: ['MDI', 0xf040a],
    pause: ['MDI', 0xf03e4],
    cog: ['MDI', 0xf08bb],
    trash: ['MDI', 0xf09e7],
    copy: ['MDI', 0xf018f],
    trayUp: ['MDI', 0xf011d],
    calendar: ['MDI', 0xf0b67],
    calendarMonth: ['MDI', 0xf0e17],
    pencil: ['MDI', 0xf0cb6],
    clock: ['MDI', 0xf0150],
    arrowDown: ['MDI', 0xf0045],
    chevronDown: ['Feather', 0xf12e],
    plus: ['Feather', 0xf1c0],
    repeat: ['Feather', 0xf1c9],
    plusThin: ['AntDesign', 0xf21a],
    arrowRight: ['FontAwesome', 0xf061],
} as const;
export type GlyphName = keyof typeof GLYPH;
interface IconProps {
    name: GlyphName;
    size: number;
    color: string;
    lineHeight?: number;
    style?: StyleProp<TextStyle>;
}
export function Icon({ name, size, color, lineHeight, style }: IconProps) {
    const [family, code] = GLYPH[name];
    return (<Text accessible={false} style={[{ fontFamily: family, fontSize: size, lineHeight: lineHeight ?? size, color }, style]}>
      {String.fromCodePoint(code)}
    </Text>);
}
