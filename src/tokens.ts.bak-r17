/**
 * Platform tokens generated from DESIGN.md (apps/tiimo/project/DESIGN.md).
 *
 * Every value here traces to a measurement. The batch-1 numbers come from
 * apps/tiimo/runs/visual-20260916T183500/source/reports:
 *  - bands-01-today-clean.json  (vertical rhythm of the Today page, 393x777)
 *  - box-*.json                 (per-region geometry)
 *  - probe.py run-length scans  (edges, fills, radii)
 *
 * Two corrections to the earlier draft, both driven by those scans:
 *  1. The focus ring is NOT a multicolour segmented band. Those colours were the
 *     task's marker emoji and the purple arrow badge. It is a flat light-lavender
 *     annulus (outer r≈121) around a plain disc (r≈86) filled with the task colour.
 *  2. The selected weekday chip is `sheet` (#F6F5F4), not lavender.
 *
 * Reference frame: 1080x2340 physical px @ 440 dpi => 2.75 px per dp. Content
 * crop (0,136,1080,2274) normalises to exactly 393x777.
 */

export const colors = {
  surface: '#FCFCFC',
  card: '#FFFFFF',
  sheet: '#F6F5F4',
  // Measured on the raw capture (runs/p0-mainline-20260916T090518/29-delete-confirm.png):
  // the delete panel reads 252,252,252, i.e. the same off-white as the page, and
  // is set apart by the dimmed backdrop and its radius rather than by being white.
  dialog: '#FCFCFC',
  ink: '#111717',
  muted: '#A7A7A7',
  primary: '#9F85FF',
  // Section pill tints, sampled from the pill interiors.
  anytimePill: '#F6F5F4',
  morningPill: '#FFF2ED',
  afternoonPill: '#F0F3FF',
  eveningPill: '#EFE8FF',
  donePill: '#F6F5F4',
  // To-do tab priority pills, sampled from
  // runs/p1-capture-20260917/raw/p1-todo.png at the pill interiors: HIGH 251,236,236;
  // MEDIUM 251,238,225; LOW 229,234,247; TO-DO/DONE fall back to the neutral sheet.
  highPill: '#FBECEC',
  mediumPill: '#FBEEE1',
  lowPill: '#E5EAF7',
  todoPill: '#F6F5F4',
  // Chrome.
  hairline: '#E5E5E5',
  // Quick-create sheet: the focused, empty "Type to begin" field. Sampled per
  // pixel on runs/p1-capture-20260917/source/p1-quickcreate.png, where the
  // darkest stroke pixel is (100,100,99) — i.e. `ink` at roughly 64%, not a
  // grey-blue. A coarse 4x4 colour map had bucketed it as light lavender, which
  // is what a first pass saw; the raw pixels are unambiguous.
  placeholder: '#646464',
  // Raw capture (runs/p0-mainline-20260916T090518/32-final-today-clean.png) reads
  // the placeholder card's dashed border as (242,241,240) over a (252,252,252)
  // surface. The earlier #E0E0E0 gave roughly three times that contrast.
  dash: '#F2F1F0',
  navSlot: '#EDEBE9',
  // Nav icons, sampled: the active tab's icon is ink; inactive Today/Focus read
  // (124,121,128) and inactive To-do (164,164,164).
  navInactive: '#7C7980',
  navTodo: '#A4A4A4',
  // Cross on the add discs, sampled (205,201,197).
  plusInk: '#CDC9C5',
  // Update-task sheet, sampled on 03-edit-form.png.
  subtleInk: '#B1ADA9',
  faintInk: '#D6D4D2',
  switchTrack: '#DDDDDD',
  switchThumb: '#B9B9B9',
  // Time-of-day picker: the current value's row is filled with this — measured
  // 237,235,233 on the reference — with `primary` text and a trailing check.
  timePickerSelected: '#EDEBE9',
  // Update-task glyph inks, sampled: lock (73,71,69), trash (211,77,75).
  lockInk: '#494745',
  // Progress-arc arrow: reads (217,206,255) on the #9F85FF arc, i.e. white at 60%.
  badgeArrow: 'rgba(255, 255, 255, 0.6)',
  dangerIcon: '#D34D4B',
  // GET PRO label while a task is focused, sampled (110,114,114).
  quietInk: '#6E7272',
  // Focus ring.
  aura: '#F4F1FD',
  discDefault: '#FAEFE0',
  discBlue: '#95C8DB',
  // Dialog buttons.
  cancelFill: '#E5E0DA',
  dangerFill: '#7C5157',
  danger: '#A03E40',
} as const;

/**
 * Font faces, resolved 2026-09-18 from the reference APK (read-only listing):
 *  - Sans: the app bundles no sans face, so every sans string renders in the
 *    Android system Roboto. Its advances were checked equal to the open Roboto
 *    (OFL) bundled here, so sans widths can match the reference exactly.
 *  - Serif: Recoleta, a commercial face that cannot ship. Fraunces 400 (OFL) is
 *    the nearest open shape but is 5.5% wider per em, so every serif size is the
 *    Recoleta size times SERIF_SCALE; that keeps the measured string widths and
 *    costs ~0.6 dp of x-height. Recorded as a substitution, not a match.
 *
 * Each weight is its own family so no platform synthesises a faux bold: styles
 * pick a family and never set fontWeight.
 */
export const fontFiles = {
  'Roboto-400': require('../assets/fonts/Roboto_400Regular.ttf'),
  'Roboto-500': require('../assets/fonts/Roboto_500Medium.ttf'),
  'Roboto-700': require('../assets/fonts/Roboto_700Bold.ttf'),
  'Fraunces-400': require('../assets/fonts/Fraunces_400Regular.ttf'),
  // Icon fonts the reference renders its glyph TextViews with (same codepoints).
  MDI: require('../assets/fonts/MaterialCommunityIcons.ttf'),
  Feather: require('../assets/fonts/Feather.ttf'),
  AntDesign: require('../assets/fonts/AntDesign.ttf'),
  FontAwesome: require('../assets/fonts/FontAwesome.ttf'),
};

export const fonts = {
  regular: 'Roboto-400',
  medium: 'Roboto-500',
  bold: 'Roboto-700',
  serif: 'Fraunces-400',
} as const;

/** Recoleta "Wednesday" is 5.176 em wide, Fraunces 5.459 em. */
const SERIF_SCALE = 5.176 / 5.459;
const serif = (recoletaSize: number, lineHeight: number) => ({
  fontFamily: fonts.serif,
  fontSize: Math.round(recoletaSize * SERIF_SCALE * 10) / 10,
  lineHeight,
});

/**
 * Sizes are read off the reference text boxes: width / Roboto advance gives the
 * size, and the box height is the line height RN reports on Android.
 */
export const type = {
  /** "Wednesday": Recoleta 28 in a 36 dp box. */
  dateTitle: serif(28, 36),
  /**
   * Uppercase labels share an 8.73 dp cap height (=> 12.3) and are tracked out;
   * the tracking is what the box width leaves over: 0.39 for the month, ~0.89 for
   * section pills and SUGGEST BREAKDOWN. A 14 dp untracked face matched the widths
   * too, but its caps stood 1.1 dp taller than the reference's.
   */
  monthCaption: { fontFamily: fonts.regular, fontSize: 12.3, lineHeight: 16, letterSpacing: 0.39 },
  /**
   * Weights were checked by ink mass (sum of darkness inside the text box, web vs
   * reference): a same-weight pair reads ~1.02, medium against regular ~1.3.
   */
  /** "ANYTIME (0)": 81.1 dp => 14, regular (medium read 1.37), 16 dp box. */
  section: { fontFamily: fonts.regular, fontSize: 12.3, lineHeight: 16, letterSpacing: 0.89 },
  /** Placeholder copy "Anytime today works": 122.3 dp => 13, regular (medium read 1.22), 16 dp box. */
  placeholder: { fontFamily: fonts.regular, fontSize: 13.15, lineHeight: 16 },
  /** Menu rows and form values ("Make a copy", "No repeat"): 20 dp box. */
  body: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 20 },
  /** "GET PRO", "Move to list": 14.5 medium (regular read 0.84) in a 20 dp box. */
  button: { fontFamily: fonts.medium, fontSize: 14.5, lineHeight: 20 },
  /** Action-menu rows: ink "Make a copy" 80.4 dp => 14.5, regular, 20 dp box. */
  menuRow: { fontFamily: fonts.regular, fontSize: 14.5, lineHeight: 20 },
  /** Filled dialog/focus buttons ("Cancel", "Delete", "Create task") read medium. */
  buttonStrong: { fontFamily: fonts.medium, fontSize: 14.5, lineHeight: 20 },
  /** "P0-Mainline-Task" card title: ink 111.6 dp => 14.3 medium, 17.1 dp box. */
  taskTitle: { fontFamily: fonts.medium, fontSize: 14.3, lineHeight: 17.1 },
  /** "30min": 33.8 dp => 12, 14.2 dp box. */
  caption: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 14 },
  /** Form field labels ("Time of day", "Repeat"): 16 dp box. */
  fieldLabel: { fontFamily: fonts.regular, fontSize: 13.5, lineHeight: 16 },
  /** Sheet heading "Update task" and group titles ("Sub-tasks"): 24 dp box. */
  heading: { fontFamily: fonts.medium, fontSize: 16.3, lineHeight: 24 },
  /** "Create a task to start focus": 24 dp box. */
  subtitle: { fontFamily: fonts.regular, fontSize: 16.4, lineHeight: 24 },
  /** Focus page task title: Recoleta in a 36 dp box. */
  focusTitle: serif(28, 36),
  /** "Delete task?": ink 126.9 dp wide => Fraunces 22.6, 32.8 dp box. */
  dialogTitle: { fontFamily: fonts.serif, fontSize: 22.6, lineHeight: 32.8 },
  /** Timer digits are Recoleta 45 in a 52 dp box; Fraunces digits run the same width. */
  timerDigits: { fontFamily: fonts.serif, fontSize: 45, lineHeight: 52 },
  /** Start/end times "09:24 AM": 68.8 dp => 16, 20 dp box. */
  timeRange: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 20 },
  /** Weekday letter: ~9.4 dp, bold, 12.4 dp box. */
  weekdayLetter: { fontFamily: fonts.bold, fontSize: 9.4, lineHeight: 12.4 },
  /** Day number is Recoleta (proportional figures: "17" is narrower than "16"); Fraunces 17.1 keeps the 17.1 dp width. */
  weekdayNumber: { fontFamily: fonts.serif, fontSize: 17.1, lineHeight: 27.3 },
  /** Small caps actions: "SUGGEST BREAKDOWN" 13.5 medium; "ADD SUB-TASK" 12 medium. */
  smallCaps: { fontFamily: fonts.regular, fontSize: 12.3, lineHeight: 16, letterSpacing: 0.86 },
  smallCapsMuted: { fontFamily: fonts.medium, fontSize: 12, lineHeight: 16 },
  /** Update-task sheet, sizes from ink widths on 03-edit-form.png. */
  floatLabel: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 13.8, paddingHorizontal: 12.25 },
  edgeLabel: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, paddingHorizontal: 4.2 },
  fieldValue: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 21.5 },
  nameInput: serif(18.45, 24),
  toggleTitle: { fontFamily: fonts.regular, fontSize: 14.7, lineHeight: 20 },
  toggleCaption: { fontFamily: fonts.regular, fontSize: 12.8, lineHeight: 16 },
  notes: { fontFamily: fonts.medium, fontSize: 14.3, lineHeight: 18 },
  /**
   * Title of a small picker card (e.g. the Repeat picker). Measured on
   * runs/p1-capture-20260917/raw/p1-repeat.png: ~24 px, semibold.
   */
  pickerTitle: { fontFamily: fonts.medium, fontSize: 24, lineHeight: 33 },
  /** Quick-create sheet input, measured on source/p1-quickcreate.png: ~17 px. */
  quickCreateInput: { fontFamily: fonts.regular, fontSize: 17, lineHeight: 20 },
  /** Meta-row chip labels, measured: 9 px cap height => ~13 px. */
  chipLabel: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 15, letterSpacing: 0.4 },
  /**
   * Day picker, measured on the captured date round-trip (a day chosen then
   * saved). "Select date" is a small medium label; the chosen day below it is
   * serif ("16 Sept"); the month header is medium; the weekday letters and day
   * numbers are regular.
   */
  calendarSelect: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 16 },
  calendarDate: serif(24, 33),
  calendarMonth: { fontFamily: fonts.medium, fontSize: 15, lineHeight: 20 },
  calendarWeekday: { fontFamily: fonts.medium, fontSize: 12, lineHeight: 16 },
  calendarDay: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 20 },
} as const;

/**
 * Measured vertical rhythm of the Today page (logical px).
 *
 * The split inside a section was resolved from the placeholder card's dashed
 * border, not from ink bands: on the reference the ANYTIME card's top edge sits at
 * y248 and its bottom edge at y295, and the section's pill runs y203..238, so the
 * pill-to-card gap is 10 and the card-to-next-pill gap is 20. Section pitch is then
 * 35 + 10 + 48 + 20 = 113, matching the measured 112.5. An earlier draft put all of
 * the slack below the card, which left the card 9 dp high even though every label
 * band lined up.
 */
export const space = {
  page: 16,
  // Geometry below is read off the reference uiautomator bounds (dp): header
  // buttons y16..56; section pills 36 tall; cards 48.8 tall, 8 below their pill;
  // next section 20 below the card (pitch 112.8).
  headerTop: 16,
  headerHeight: 40,
  pillHeight: 36,
  cardHeight: 48.8,
  cardRadius: 14,
  pillRadius: 18,
  pillToCard: 8,
  cardToNextSection: 20,
  firstSection: 32,
  dashWidth: 1.5,
  // To-do tab, measured from runs/p1-capture-20260917/raw/p1-todo.png: the
  // priority pill is 32 dp tall, the dashed hint card sits 8 dp below it, and
  // sections repeat every 104.4 dp (32 + 8 + 48 + 16). The first pill's top is
  // y154 logical, since this page has no weekday strip under the title.
  priorityPillHeight: 32,
  priorityPillToCard: 8,
  priorityCardToNext: 16,
  priorityFirstSection: 54,
  /**
   * Repeat picker, measured on runs/p1-capture-20260917/raw/p1-repeat.png:
   * the card spans x20..373 and y80..672.8 (radius 26, `surface`); the title's
   * line box runs y104..137; the white option list spans x45.1..347.5 and
   * y152.8..648.6 as eight 62 px rows separated by 1 px `sheet` hairlines; each
   * row carries a 20 px trailing radio at x306..326, filled with a 10 px dot on
   * the selected row. 24 + 33 + 16 + 8x62 + 24 = 593 = the measured card height.
   */
  repeatCardTop: 80,
  repeatCardInset: 20,
  repeatCardRadius: 26,
  repeatCardPadX: 25,
  repeatCardPadTop: 24,
  repeatCardPadBottom: 24,
  repeatTitleToList: 16,
  repeatListRadius: 16,
  repeatRowHeight: 62,
  repeatRowPadLeft: 24,
  repeatRowPadRight: 22,
  repeatRadioSize: 20,
  repeatRadioDot: 10,
  /** Stroke measured as a 5 px run on the raw capture, i.e. 1.8 logical px. */
  repeatRadioStroke: 1.8,
  /**
   * Quick-create bottom sheet, measured on
   * runs/p1-capture-20260917/source/p1-quickcreate.png (probe_qc1..probe_qc5).
   *
   * The capture has the IME open, so the sheet's own extent has to be read off
   * the keyboard's top edge rather than the frame bottom: the sheet runs
   * y379.2..495.2, i.e. 116 dp tall, and a bottom-anchored 116 dp sheet lifted
   * by the IME reproduces that top edge exactly. Content splits as
   * 16 + 45.5 + 5 + 32 + 17.4 = 115.9, which is the same height.
   *
   * The meta row's three pills are NOT on a uniform gap (11 / 12 / 12), and with
   * a uniform gap the trailing pill drifts 5 px, so the pills are placed by their
   * own measured left edges instead.
   *   ANYTIME   x21..110   (w 90)   white pill, 14 px clock, label at x50
   *   30M       x121..160  (w 40)   white pill, label at x130, no icon
   *   NO REPEAT x172..270  (w 99)   white pill, 13 px repeat glyph, label at x201
   *   more      x282..310  (29x30)  white circle, three-dot glyph, centre y461
   *
   * The sheet's top corners fit a radius of 34.7 across five points of the arc
   * (34.6 / 34.8 / 34.9 / 35.3 / 31.6), so 34.5.
   *
   * Below the meta row only 17 dp of blank sheet is visible before the keyboard
   * covers the rest, so the sheet carries no content under the meta row and the
   * reference's confirm affordance was never captured.
   */
  quickCreateHeight: 115.9,
  quickCreatePadTop: 16,
  quickCreatePadBottom: 17.4,
  quickCreatePadLeft: 21,
  quickCreateInputWidth: 344,
  quickCreateInputHeight: 45.5,
  quickCreateInputToMeta: 5,
  quickCreateMetaHeight: 32,
  quickCreatePillRadius: 16,
  quickCreatePillALeft: 0,
  quickCreatePillAWidth: 90,
  quickCreatePillBLeft: 100,
  quickCreatePillBWidth: 40,
  quickCreatePillCLeft: 151,
  quickCreatePillCWidth: 99,
  quickCreateMoreLeft: 261,
  quickCreateMoreWidth: 29,
  quickCreateMoreHeight: 30,
  quickCreateGlyph: 14,
  quickCreateRepeatGlyph: 13,
  quickCreateRadius: 34.5,
  navHeight: 57,
  navBottom: 16,
} as const;

export const nav = {
  /** Bar bounds from the reference dump: x18.2 w232.9, y707..760.1 (53.1 tall). */
  barLeft: 18.2,
  barWidth: 232.9,
  barHeight: 53.1,
  barBottom: 16.9,
  /** Slots: 75 x 45.1 at x22.2 / 97.2 / 172.5, 4 dp inside the bar. */
  slotWidth: 75,
  slotHeight: 45.1,
  slotRadius: 22.5,
  barInset: 4,
  /** Avatar control 54.2 at x320.9 (same bottom as the bar); the face is 46.2 inside a white ring. */
  avatarWell: 54.2,
  avatarSize: 46.2,
  avatarLeft: 320.9,
  /** 393 - 320.9 - 54.2: anchored right so a narrower screen does not cut it off. */
  avatarRight: 17.9,
} as const;

export const focus = {
  /** Ring: outer r121; disc bounds 109.2,215.8 175.4x175 => r87.6 at (196.9, 303.3). */
  ringOuter: 121,
  ringDisc: 87.6,
  ringCenterX: 196.9,
  ringCenterY: 303.3,
  /** Progress arc: stroke 35.3 (the 0 s circle is 35.3 across), centre line 104.4 from the ring centre. */
  arcWidth: 35.3,
  badgeRadius: 104.4,
  arrowSize: 18.6,
  digitsTop: 441.6,
  buttonTop: 508.7,
  pillTop: 510.5,
  buttonHeight: 40,
  /** Lowest control (550.5) + the nav band below it (777 - 707) + 16 dp of air. */
  contentMin: 636.5,
} as const;

/**
 * Day picker (the Update-task form's Date row), measured on the captured date
 * round-trip at 393x777. The reference opens it as a full-frame page: a close
 * cross top-left, a purple "Save" top-right, then "Select date" with the chosen
 * day and an edit (pencil) button, a hairline, a month header with previous/next
 * chevrons, a Sunday-first weekday row, and a day grid. Every box below is
 * [x, y, width, height] except the grid, which is given as its first cell plus
 * column/row pitch.
 */
export const calendar = {
  close: [10.2, 12, 40, 40],
  save: [317.7, 13.1, 71.3, 37.8],
  selectLabel: [24, 74.2],
  dateLabel: [24, 95.3],
  editButton: [335.1, 81.5, 40.1, 40],
  /** Fitted from the raw capture: the full-width hairline sits at y139. */
  dividerY: 139,
  monthLabel: [22.2, 160.8],
  prev: [295.1, 151.4, 40, 40],
  next: [347.1, 151.4, 40.1, 40],
  weekdayTop: 221.2,
  gridLeft: 5.1,
  gridTop: 263.1,
  cell: 46.2,
  /** (342.1 - 5.1) / 6, the measured column centres on the 393 frame. */
  columnPitch: 56.17,
  rowPitch: 52.05,
  glyph: 24,
} as const;

/**
 * White controls (GET PRO, header circles, nav bar) float on a soft shadow, not a
 * stroke: the reference darkens from 225..232 at the edge to the 252 page over
 * ~4 dp on every side, with no crisp outline.
 */
export const lift = {
  shadowColor: '#000000',
  shadowOpacity: 0.13,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 0 },
  elevation: 3,
} as const;

/**
 * Update-task sheet, read off runs/edit-branches-20260916T152314/03-edit-form.xml
 * (dp, page coordinates; the sheet starts at y0). Each field is a bordered
 * #FCFCFC box; its label straddles the top border over a short patch that hides
 * the border behind the text. `box` entries are [x, y, width, height].
 */
export const form = {
  sheetRadius: 37.6,
  contentHeight: 778,
  fieldRadius: 14,
  cardRadius: 25.4,
  border: '#EDEBE9',
  close: [16, 22.2, 42.2, 41.8],
  save: [335.1, 22.2, 41.8, 41.8],
  titleTop: 30.9,
  // Task name: floating label, bordered field, serif input, marker chip + lock.
  nameLabel: [18.9, 88.4],
  namePatch: [25.1, 93.9, 71.7, 3.3],
  nameField: [16, 94.6, 308.9, 49.9],
  nameInput: [16, 96.4, 308.9, 48],
  nameInset: 16.6,
  chip: [337, 100.4, 40, 40],
  chipLock: [361, 124.4, 16, 16],
  // Time of day.
  timeLabel: [26.2, 163.4],
  timePatch: [26.2, 171.4, 71, 4],
  timeField: [16, 172.5, 361, 50.2],
  // Date / Duration pair.
  dateBox: [16, 244.5, 174.7, 56],
  durationBox: [202.7, 244.5, 174.3, 56],
  pairLabelLeft: 2.9,
  pairPatch: { date: [9.1, 5.5, 37.5, 3.3], duration: [9.1, 5.5, 80.8, 3.3] },
  pairFieldTop: 6.2,
  pairFieldHeight: 49.9,
  pairIcon: [12, 15, 32, 32],
  pairInput: [56, 8, 118.6, 48],
  // Repeat.
  repeatLabel: [26.2, 319.5],
  repeatPatch: [26.2, 327.5, 45.5, 4],
  repeatField: [16, 328.6, 361, 50.2],
  // Row internals shared by Time of day and Repeat.
  rowIconLeft: 17.1,
  rowValueLeft: 45.9,
  rowChevronRight: 17.1,
  // Time-of-day picker. The row expands in place under its field: option rows
  // are 48 tall and start 5.1 below the panel top, the label ink begins 21.4 in
  // from the panel's left edge, and the current value carries a 20 dp `primary`
  // check centred in a 24 dp box, 15 in from the panel's right edge.
  timePickerPadTop: 5.1,
  timePickerRowHeight: 48,
  timePickerPadLeft: 21.4,
  timePickerPadRight: 15,
  timePickerCheckBox: 24,
  timePickerCheckSize: 20,
  // Sub-tasks card with the timers section under a hairline.
  subtaskCard: [16, 400.6, 361, 188.5],
  subtaskTitle: [16, 20.8],
  suggest: [151.4, 16.1, 193.6, 34.2],
  addSubtask: [16, 58.3, 329, 42.9],
  divider: 117.2,
  timersTitle: [16, 134.3],
  timersCaption: [16, 156.2],
  switchBox: [298.4, 139.8, 46.6, 26.9],
  notesCard: [16, 611, 361, 82.2],
  notesInput: [16, 16, 329, 50.2],
  // Bottom action bar.
  trash: [16, 715, 40, 40],
  play: [64, 715, 40, 40],
  move: [253.6, 715, 123.4, 40],
} as const;

/**
 * P1 light/dark themes. `light` mirrors the measured `colors` (the app ships light by
 * default); `dark` is a first-pass lavender-tinted inversion pending a measured dark-mode
 * capture — to be confirmed against Tiimo's actual dark palette in a later followup.
 * Components will read `themes[scheme]` once the ThemeProvider lands.
 */
export const themes = {
  light: colors,
  dark: {
    ...colors,
    surface: '#16151A',
    card: '#1F1E24',
    sheet: '#26242B',
    dialog: '#16151A',
    ink: '#F2F1F4',
    muted: '#9A97A0',
    primary: '#9F85FF',
    hairline: '#2E2C34',
    placeholder: '#9A97A0',
    dash: '#2E2C34',
    navSlot: '#2A2830',
    navInactive: '#8C8893',
    navTodo: '#B4B0B8',
    plusInk: '#4A4750',
    subtleInk: '#7A7680',
    faintInk: '#403D45',
    switchTrack: '#3A3840',
    switchThumb: '#5A5760',
    lockInk: '#C9C5CF',
    aura: '#2A2440',
    discDefault: '#2A2418',
    discBlue: '#1E3A44',
    cancelFill: '#3A383F',
    dangerFill: '#4A2E33',
    danger: '#C97A7C',
    quietInk: '#9A97A0',
    badgeArrow: 'rgba(255, 255, 255, 0.6)',
  },
} as const;

/** Reference logical viewport used to derive every measurement above. */
export const frame = {
  width: 393,
  height: 777,
} as const;
