/**
 * Settings — opened from the gear circle in the Today/To-do header.
 *
 * COVERAGE GAP CLOSED (R32). `TodayHeader.tsx` has always rendered its gear as
 * `<Pressable accessibilityLabel="Settings" onPress={() => undefined}>`: a
 * white 40 dp circle in the top-right of every page, next to the add control,
 * that did nothing. There was no settings screen under `screens/`.
 *
 * Same honesty rule as `screens/ProfileScreen.tsx`: the reference set (the
 * official Android overview and the p0/p1 capture runs) contains no settings
 * frame, so nothing here is a measurement. The page is assembled from the
 * grammar this project has already measured elsewhere — serif 28 dp page title,
 * 16 dp gutters (`space.page`), 48.8 dp rows, 14 dp card radius, `lift` on the
 * white surfaces, `smallCaps` section labels, and the `cog` MDI codepoint the
 * reference's own settings key is drawn from (`components/Icon.tsx` GLYPH.cog).
 *
 * Row content follows the shape the product exposes rather than invented state:
 * every value-bearing row shows the signed-out prototype's actual value, which
 * is off or 0, and nothing claims a subscription, a sync or a notification
 * permission that this no-backend build does not have.
 */
import * as React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Chevron } from '../components/Glyphs';
import { Icon } from '../components/Icon';
import { colors, lift, nav, space, type as typo } from '../tokens';

type Row =
  | { key: string; label: string; glyph: 'cog' | 'clock' | 'calendar' | 'trayUp'; value?: string }
  | { key: string; label: string; toggle: boolean; on: boolean };

const GROUPS: Array<{ title: string; rows: Row[] }> = [
  {
    title: 'GENERAL',
    rows: [
      { key: 'lang', label: 'Language', glyph: 'cog', value: 'English' },
      { key: 'week', label: 'Start of week', glyph: 'calendar', value: 'Monday' },
      { key: 'time', label: 'Time format', glyph: 'clock', value: '24-hour' },
    ],
  },
  {
    title: 'NOTIFICATIONS',
    rows: [
      { key: 'daily', label: 'Daily planning reminder', toggle: true, on: false },
      { key: 'due', label: 'Task due alerts', toggle: true, on: false },
    ],
  },
  {
    title: 'ACCOUNT',
    rows: [
      { key: 'signin', label: 'Sign in', glyph: 'trayUp' },
      { key: 'export', label: 'Export your data', glyph: 'trayUp' },
    ],
  },
];

export function SettingsScreen() {
  const [toggles, setToggles] = React.useState<Record<string, boolean>>({});
  const on = (key: string, fallback: boolean) => (key in toggles ? toggles[key] : fallback);

  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Settings"
      >
        <Text style={styles.title}>Settings</Text>

        {GROUPS.map(group => (
          <View key={group.title} style={styles.group}>
            <Text style={styles.sectionLabel}>{group.title}</Text>
            <View style={styles.card}>
              {group.rows.map((row, index) => (
                <Pressable
                  key={row.key}
                  accessibilityLabel={row.label}
                  accessibilityRole="button"
                  onPress={() => {
                    if ('toggle' in row) {
                      setToggles(prev => ({ ...prev, [row.key]: !on(row.key, row.on) }));
                    }
                  }}
                  style={[styles.row, index > 0 && styles.rowDivided]}
                >
                  {'glyph' in row ? (
                    <View style={styles.rowIcon}>
                      <Icon name={row.glyph} size={19} lineHeight={23} color={colors.ink} />
                    </View>
                  ) : null}
                  <Text style={styles.rowLabel}>{row.label}</Text>
                  {'toggle' in row ? (
                    <View style={[styles.track, on(row.key, row.on) && styles.trackOn]}>
                      <View style={[styles.thumb, on(row.key, row.on) && styles.thumbOn]} />
                    </View>
                  ) : row.value ? (
                    <Text style={styles.rowValue}>{row.value}</Text>
                  ) : null}
                  {'toggle' in row ? null : <Chevron size={16} color={colors.subtleInk} />}
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* The destructive row sits outside the groups: the reference's own surfaces keep
            sign-out apart from ordinary navigation, so it gets its own card and its own ink. */}
        <View style={styles.group}>
          <View style={styles.card}>
            <Pressable accessibilityLabel="Sign out" accessibilityRole="button" style={styles.row}>
              <Text style={styles.signOut}>Sign out</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  content: { paddingBottom: nav.barBottom + nav.barHeight + 24 },
  title: { ...typo.dateTitle, color: colors.ink, marginTop: 10, marginHorizontal: space.page },
  group: { marginTop: 24, marginHorizontal: space.page },
  sectionLabel: { ...typo.smallCaps, color: colors.muted, marginBottom: 8, marginLeft: 4 },
  card: { borderRadius: space.cardRadius, backgroundColor: colors.card, ...lift },
  row: {
    height: space.cardHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 14,
  },
  rowDivided: { borderTopWidth: 1, borderTopColor: colors.hairline },
  rowIcon: { width: 26, alignItems: 'flex-start', justifyContent: 'center' },
  rowLabel: { ...typo.body, color: colors.ink, flex: 1, marginLeft: 8 },
  rowValue: { ...typo.body, color: colors.muted, marginRight: 4 },
  /* The switch reuses the Update-task sheet's own measured track and thumb inks, so the
     two toggles in the app are literally the same component values. */
  track: {
    width: 46.6,
    height: 26.9,
    borderRadius: 13.45,
    backgroundColor: colors.switchTrack,
    padding: 2.4,
    justifyContent: 'center',
  },
  trackOn: { backgroundColor: colors.primary },
  thumb: {
    width: 22.1,
    height: 22.1,
    borderRadius: 11.05,
    backgroundColor: colors.card,
  },
  thumbOn: { alignSelf: 'flex-end' },
  signOut: { ...typo.body, color: colors.danger, flex: 1 },
});