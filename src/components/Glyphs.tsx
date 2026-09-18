import * as React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
interface GlyphProps {
    size?: number;
    color?: string;
    strokeWidth?: number;
}
const base = (size: number, color: string, strokeWidth: number) => ({
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
});
export function Plus({ size = 24, color = '#111717', strokeWidth = 2 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d="M12 5v14M5 12h14"/>
    </Svg>);
}
export function CloseGlyph({ size = 24, color = '#111717', strokeWidth = 2 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d="M6 6l12 12M18 6L6 18"/>
    </Svg>);
}
export function CheckGlyph({ size = 24, color = '#111717', strokeWidth = 2.4 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d="M5 12.5l4.8 4.8L19 7.5"/>
    </Svg>);
}
export function Chevron({ size = 24, color = '#111717', strokeWidth = 2, up = false }: GlyphProps & {
    up?: boolean;
}) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d={up ? 'M6 15l6-6 6 6' : 'M6 9l6 6 6-6'}/>
    </Svg>);
}
export function ClockGlyph({ size = 24, color = '#111717', strokeWidth = 1.7 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Circle cx="12" cy="12" r="9"/>
      <Path d="M12 7.2v5.2l3.2 2"/>
    </Svg>);
}
export function SunriseGlyph({ size = 24, color = '#111717', strokeWidth = 1.7 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d="M7 16a5 5 0 0110 0"/>
      <Path d="M12 4.5v2M4.8 8.2l1.5 1.4M19.2 8.2l-1.5 1.4M3 19h18"/>
    </Svg>);
}
export function SunGlyph({ size = 24, color = '#111717', strokeWidth = 1.7 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Circle cx="12" cy="12" r="4.6"/>
      <Path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6"/>
    </Svg>);
}
export function MoonGlyph({ size = 24, color = '#111717', strokeWidth = 1.7 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z"/>
    </Svg>);
}
export function GearGlyph({ size = 24, color = '#111717', strokeWidth = 1.6 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Circle cx="12" cy="12" r="3.1"/>
      <Path d="M12 3.4l1.5 2.1 2.5-.5.6 2.5 2.4 1-1 2.4 1 2.4-2.4 1-.6 2.5-2.5-.5L12 20.6l-1.5-2.1-2.5.5-.6-2.5-2.4-1 1-2.4-1-2.4 2.4-1 .6-2.5 2.5.5z"/>
    </Svg>);
}
export function SparkleGlyph({ size = 24, color = '#9F85FF', strokeWidth = 1.6 }: GlyphProps) {
    return (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 3.2c.7 3.4 2.2 4.9 5.6 5.6-3.4.7-4.9 2.2-5.6 5.6-.7-3.4-2.2-4.9-5.6-5.6 3.4-.7 4.9-2.2 5.6-5.6z" fill={color}/>
      <Path d="M17.4 15.2c.35 1.5 1 2.15 2.5 2.5-1.5.35-2.15 1-2.5 2.5-.35-1.5-1-2.15-2.5-2.5 1.5-.35 2.15-1 2.5-2.5z" fill={color}/>
    </Svg>);
}
export function CheckSquareGlyph({ size = 24, color = '#9E9E9E', strokeWidth = 1.7 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.6"/>
      <Path d="M8.2 12.2l2.9 2.9 5.1-6"/>
    </Svg>);
}
export function CrescentGlyph({ size = 24, color = '#6E6E6E', strokeWidth = 2.4 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d="M19 12a7 7 0 11-7-7"/>
    </Svg>);
}
export function ArrowRightGlyph({ size = 24, color = '#111717', strokeWidth = 2 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d="M5 12h13M13 7l5 5-5 5"/>
    </Svg>);
}
export function PlayGlyph({ size = 24, color = '#111717', strokeWidth = 2 }: GlyphProps) {
    return (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M8.5 5.6l10 6.4-10 6.4z" fill={color}/>
    </Svg>);
}
export function PauseGlyph({ size = 24, color = '#111717', strokeWidth = 2 }: GlyphProps) {
    return (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9.2 5.5v13M14.8 5.5v13" stroke={color} strokeWidth={strokeWidth + 1} strokeLinecap="round"/>
    </Svg>);
}
export function PencilGlyph({ size = 24, color = '#111717', strokeWidth = 1.7 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d="M4 20h4l10-10a2.5 2.5 0 10-3.5-3.5L4.5 16.5z"/>
    </Svg>);
}
export function TrashGlyph({ size = 24, color = '#111717', strokeWidth = 1.7 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>
    </Svg>);
}
export function LockGlyph({ size = 24, color = '#A7A7A7', strokeWidth = 1.7 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Rect x="5" y="11" width="14" height="9" rx="2"/>
      <Path d="M8 11V8a4 4 0 018 0v3"/>
    </Svg>);
}
export function CopyGlyph({ size = 24, color = '#111717', strokeWidth = 1.7 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d="M9 9h10v10H9zM5 15V5h10"/>
    </Svg>);
}
export function CalendarGlyph({ size = 24, color = '#111717', strokeWidth = 1.7 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d="M4 8h16v12H4zM4 8V6h16v2M8 4v3M16 4v3"/>
    </Svg>);
}
export function UploadGlyph({ size = 24, color = '#111717', strokeWidth = 1.7 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d="M12 19V6M8 10l4-4 4 4M5 20h14"/>
    </Svg>);
}
export function BreakdownGlyph({ size = 24, color = '#111717', strokeWidth = 1.7 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d="M4 7h10M4 12h8M4 17h6"/>
      <Path d="M18.5 6.5c.3 1.3.8 1.8 2.1 2.1-1.3.3-1.8.8-2.1 2.1-.3-1.3-.8-1.8-2.1-2.1 1.3-.3 1.8-.8 2.1-2.1z" fill={color} stroke="none"/>
    </Svg>);
}
export function RepeatGlyph({ size = 24, color = '#111717', strokeWidth = 1.7 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d="M4 9a5 5 0 015-5h7l-2.5-2.5M20 15a5 5 0 01-5 5H8l2.5 2.5"/>
      <Path d="M16 4l-2.5 2.5M8 20l2.5-2.5" strokeWidth={strokeWidth}/>
    </Svg>);
}
export function FlagGlyph({ size = 24, color = '#111717', strokeWidth = 1.7 }: GlyphProps) {
    return (<Svg {...base(size, color, strokeWidth)}>
      <Path d="M6.4 21V4.2"/>
      <Path d="M6.4 4.8h10.8l-2.3 3.3 2.3 3.3H6.4z"/>
    </Svg>);
}
export function RadioGlyph({ size = 20, color = '#111717', strokeWidth = 1.8, selected = false, dotSize = 10, }: GlyphProps & {
    selected?: boolean;
    dotSize?: number;
}) {
    const c = size / 2;
    return (<Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <Circle cx={c} cy={c} r={c - strokeWidth / 2} stroke={color} strokeWidth={strokeWidth}/>
      {selected ? <Circle cx={c} cy={c} r={dotSize / 2} fill={color}/> : null}
    </Svg>);
}
export function MoreGlyph({ size = 24, color = '#111717' }: GlyphProps) {
    return (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="5" cy="12" r="2.6" fill={color}/>
      <Circle cx="12" cy="12" r="2.6" fill={color}/>
      <Circle cx="19" cy="12" r="2.6" fill={color}/>
    </Svg>);
}
export function CompletionCircle({ size = 28, color = '#111717', done = false, strokeWidth = 2, }: GlyphProps & {
    done?: boolean;
}) {
    return (<Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Circle cx="14" cy="14" r="12" stroke={done ? '#9F85FF' : color} strokeWidth={strokeWidth}/>
      {done ? (<>
          <Circle cx="14" cy="14" r="12" fill="#9F85FF" stroke="none"/>
          <Path d="M8.6 14.4l3.6 3.6 7.2-7.6" stroke="#FFFFFF" strokeWidth={strokeWidth + 0.2} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </>) : null}
    </Svg>);
}
