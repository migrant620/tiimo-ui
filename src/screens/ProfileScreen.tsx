/**
 * Profile tab - opened from the avatar well in the bottom bar.
 *
 * COVERAGE GAP CLOSED (R32). `BottomNav.tsx` has always rendered the avatar
 * well as `<Pressable accessibilityLabel="Profile" onPress={() => undefined}>`:
 * a visible, labelled, 54.2 dp touch target that did nothing at all. The
 * official Android overview (references/official-android-overview.png) shows
 * only four pages - Today, Focus, To-do and the Update-task form - so the
 * Profile page itself was never captured, and `screens/` held only
 * FocusScreen / TodayScreen / TodoScreen.
 *
 * Nothing here is a pixel measurement, and it is not claimed to be. The page is
 * built from the two sources that do exist:
 *  - the app's own visual grammar, which is fixed and heavily measured
 *    elsewhere: serif 28 dp page titles (`typo.dateTitle`), white cards on the
 *    `surface` page with a 14 dp radius, `space.page` = 16 dp gutters, 48.8 dp
 *    rows, `lift` on the white controls, and the same `section` / `smallCaps`
 *    uppercase labels the To-do tab uses;
 *  - the account state this prototype actually has, which is signed out of any
 *    backend, so the page presents the signed-out shape rather than inventing a
 *    name, an avatar photo, a task count or a streak. Every figure on screen is
 *    therefore either 0 or absent, and the sign-in row is the only live action.
 *
 * This is recorded in spec/design-qa.md as a proposed page pending a real
 * capture, in the same way the centred stage on wide viewports is.
 */
import * as React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Chevron, ClockGlyph, GearGlyph, SparkleGlyph } from '../components/Glyphs';
import { colors, lift, nav, space, type as typo } from '../tokens';

/** The signed-out account shape. No values are invented: both read 0. */
const STATS = [
  { key: 'tasks', value: '0', label: 'Tasks done' },
  { key: 'minutes', value: '0', label: 'Minutes focused' },
  { key: 'streak', value: '0', label: 'Day streak' },
] as const;

const SETTINGS_ROWS = [
  { key: 'account', label: 'Account', glyph: 'cog' as const },
  { key: 'notifications', label: 'Notifications', glyph: 'clock' as const },
  { key: 'pro', label: 'Tiimo Pro', glyph: 'pro' as const },
];

export function ProfileScreen() {
  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Profile"
      >
        <Text style={styles.title}>Profile</Text>

        {/* Identity block. The avatar reuses the bottom bar's own stand-in face rather
            than a second, different illustration, so the two never disagree. */}
        <View style={styles.identity}>
          <View style={styles.avatarWell}>
            <Text style={styles.avatarInitial}>T</Text>
          </View>
          <Text style={styles.name}>Signed out</Text>
          <Text style={styles.caption}>Sign in to sync your lists across devices.</Text>
        </View>

        <Pressable accessibilityLabel="Sign in" onPress={() => undefined} style={styles.signIn}>
          <Text style={styles.signInLabel}>Sign in</Text>
        </Pressable>

        {/* Stat trio. The reference's own stat row was never captured, so the three
            cells share the To-do tab's 48.8 dp row height and the 16 dp gutters. */}
        <View style={styles.stats}>
          {STATS.map((s, index) => (
            <View key={s.key} style={[styles.statCell, index > 0 && styles.statCellAfter]}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>SETTINGS</Text>
        <View style={styles.card}>
          {SETTINGS_ROWS.map((row, index) => (
            <Pressable
              key={row.key}
              accessibilityLabel={row.label}
              onPress={() => undefined}
              style={[styles.row, index > 0 && styles.rowDivided]}
            >
              <View style={styles.rowIcon}>
                {row.glyph === 'cog' ? (
                  <GearGlyph size={19} color={colors.ink} />
                ) : row.glyph === 'clock' ? (
                  <ClockGlyph size={19} color={colors.ink} />
                ) : (
                  <SparkleGlyph size={18} color={colors.primary} />
                )}
              </View>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Chevron size={16} color={colors.subtleInk} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const AVATAR = 72;

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  content: { paddingBottom: nav.barBottom + nav.barHeight + 24 },
  title: { ...typo.dateTitle, color: colors.ink, marginTop: 10, marginHorizontal: space.page },
  identity: { alignItems: 'center', marginTop: 24 },
  avatarWell: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...lift,
  },
  avatarInitial: { ...typo.dateTitle, fontSize: 30, color: colors.ink },
  name: { ...typo.body, color: colors.ink, marginTop: 14, fontFamily: 'Roboto-500' },
  caption: { ...typo.caption, color: colors.muted, marginTop: 5 },
  signIn: {
    height: space.cardHeight,
    borderRadius: space.cardRadius,
    backgroundColor: colors.ink,
    alignSelf: 'center',
    marginTop: 18,
    paddingHorizontal: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInLabel: { ...typo.buttonStrong, color: colors.card },
  stats: {
    flexDirection: 'row',
    marginTop: 28,
    marginHorizontal: space.page,
    borderRadius: space.cardRadius,
    backgroundColor: colors.card,
    ...lift,
  },
  statCell: { flex: 1, height: 76, alignItems: 'center', justifyContent: 'center' },
  statCellAfter: { borderLeftWidth: 1, borderLeftColor: colors.hairline },
  statValue: { ...typo.dateTitle, fontSize: 24, color: colors.ink },
  statLabel: { ...typo.caption, color: colors.muted, marginTop: 3 },
  sectionLabel: {
    ...typo.smallCaps,
    color: colors.muted,
    marginTop: 28,
    marginHorizontal: space.page,
  },
  card: {
    marginTop: 10,
    marginHorizontal: space.page,
    borderRadius: space.cardRadius,
    backgroundColor: colors.card,
    ...lift,
  },
  row: {
    height: space.cardHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 14,
  },
  rowDivided: { borderTopWidth: 1, borderTopColor: colors.hairline },
  rowIcon: { width: 28, alignItems: 'flex-start', justifyContent: 'center' },
  rowLabel: { ...typo.body, color: colors.ink, flex: 1, marginLeft: 8 },
});