/**
 * Icon glyphs drawn from the same icon fonts and codepoints the reference uses.
 *
 * Every codepoint below was read off a reference uiautomator dump (the glyph
 * TextViews carry the character) and resolved against the font's glyph map, so
 * the prototype draws the identical outline rather than a look-alike vector.
 */
import * as React from 'react';
import { Text } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';

export const GLYPH = {
  // MaterialCommunityIcons
  close: ['MDI', 0xf0156],
  check: ['MDI', 0xf012c],
  chevronUp: ['MDI', 0xf0143],
  // Day-picker month navigation, read off the same reference as the month header.
  chevronLeft: ['MDI', 0xf0141],
  chevronRight: ['MDI', 0xf0142],
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
  // Feather
  chevronDown: ['Feather', 0xf12e],
  plus: ['Feather', 0xf1c0],
  repeat: ['Feather', 0xf1c9],
  // AntDesign
  plusThin: ['AntDesign', 0xf21a],
  // FontAwesome 4
  arrowRight: ['FontAwesome', 0xf061],
} as const;

export type GlyphName = keyof typeof GLYPH;

interface IconProps {
  name: GlyphName;
  size: number;
  color: string;
  /** Box height as the reference reports it; defaults to the size. */
  lineHeight?: number;
  style?: StyleProp<TextStyle>;
}

export function Icon({ name, size, color, lineHeight, style }: IconProps) {
  const [family, code] = GLYPH[name];
  return (
    <Text
      accessible={false}
      style={[{ fontFamily: family, fontSize: size, lineHeight: lineHeight ?? size, color }, style]}
    >
      {String.fromCodePoint(code)}
    </Text>
  );
}
