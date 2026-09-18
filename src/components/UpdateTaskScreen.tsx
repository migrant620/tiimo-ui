import * as React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { BreakdownGlyph, ClockGlyph } from './Glyphs';
import { Icon } from './Icon';
import type { GlyphName } from './Icon';
import { RepeatPicker } from './RepeatPicker';
import { colors, form, frame, lift, type as typo } from '../tokens';
import { DEFAULT_REPEAT } from '../model';
import type { RepeatOption, Task, TimeOfDay } from '../model';
const TIME_OPTIONS: {
    value: TimeOfDay;
    label: string;
}[] = [
    { value: 'anytime', label: 'Anytime' },
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'evening', label: 'Evening' },
];
type Box = readonly [
    number,
    number,
    number,
    number
];
const at = ([left, top, width, height]: Box): ViewStyle => ({ position: 'absolute', left, top, width, height });
const right = ([left, top, width, height]: Box, frameWidth: number = frame.width): ViewStyle => ({ position: 'absolute', right: frameWidth - left - width, top, width, height });
const span = ([left, top, width, height]: Box, frameWidth: number = frame.width): ViewStyle => ({ position: 'absolute', left, right: frameWidth - left - width, top, height });
const pos = ([left, top]: readonly [
    number,
    number
]): ViewStyle => ({ position: 'absolute', left, top });
const CARD_W = form.subtaskCard[2];
const PAIR: Box = [form.dateBox[0], form.dateBox[1], form.durationBox[0] + form.durationBox[2] - form.dateBox[0], form.dateBox[3]];
function EdgeLabel({ text, label, patch, patchColor, floating }: {
    text: string;
    label: readonly [
        number,
        number
    ];
    patch: Box;
    patchColor: string;
    floating?: boolean;
}) {
    return (<>
      <View style={[at(patch), { backgroundColor: patchColor }]}/>
      <Text style={[pos(label), floating ? styles.floatLabel : styles.edgeLabel]}>{text}</Text>
    </>);
}
interface Props {
    task: Task;
    dateText: string;
    heading?: string;
    onSubmit: (patch: Partial<Omit<Task, 'id'>>) => void;
    onDismiss: () => void;
    onStart: () => void;
    onDelete: () => void;
}
export function UpdateTaskScreen({ task, dateText, heading = 'Update task', onSubmit, onDismiss, onStart, onDelete }: Props) {
    const [name, setName] = React.useState(task.title);
    const [duration, setDuration] = React.useState(String(task.durationMin));
    const [timeOfDay, setTimeOfDay] = React.useState<TimeOfDay>(task.timeOfDay);
    const [repeat, setRepeat] = React.useState<RepeatOption>(task.repeat ?? DEFAULT_REPEAT);
    const [pickerOpen, setPickerOpen] = React.useState(false);
    const [repeatOpen, setRepeatOpen] = React.useState(false);
    const save = () => {
        const parsed = Number.parseInt(duration.replace(/[^0-9]/g, ''), 10);
        onSubmit({
            title: name.trim() || task.title,
            durationMin: Number.isFinite(parsed) && parsed > 0 ? parsed : task.durationMin,
            timeOfDay,
            repeat,
        });
    };
    return (<ScrollView style={styles.page} contentContainerStyle={styles.canvas} showsVerticalScrollIndicator={false}>
      <Pressable accessibilityLabel="Close without saving" onPress={onDismiss} style={[at(form.close), styles.round, styles.plain]}>
        <Icon name="close" size={26.2} color={colors.ink}/>
      </Pressable>
      <Text accessibilityRole="header" style={styles.title}>
        {heading}
      </Text>
      <Pressable accessibilityLabel="Save task" onPress={save} style={[right(form.save), styles.round, styles.saveCircle]}>
        <Icon name="check" size={26.2} color={colors.card}/>
      </Pressable>

      <View style={[span(form.nameField), styles.field]}/>
      <EdgeLabel text="Task name" label={form.nameLabel} patch={form.namePatch} patchColor={colors.surface} floating/>
      <TextInput accessibilityLabel="Task name" value={name} onChangeText={setName} placeholder="Task name" placeholderTextColor={colors.muted} style={[span(form.nameInput), styles.nameInput]}/>
      <Pressable accessibilityLabel="Task marker" onPress={() => undefined} style={[right(form.chip), styles.chip]}>
        <Text style={styles.chipGlyph}>{task.marker ?? ''}</Text>
      </Pressable>
      <View style={[right(form.chipLock), styles.chipLock]} pointerEvents="none">
        <Icon name="lock" size={10.2} color={colors.lockInk}/>
      </View>

      <Pressable accessibilityLabel="Time of day" onPress={() => setPickerOpen((open) => !open)} style={[span(form.timeField), styles.field, styles.row]}>
        <View style={styles.rowIcon}>
          <ClockGlyph size={13.1} color={colors.ink} strokeWidth={2}/>
        </View>
        <Text style={styles.rowValue}>{TIME_OPTIONS.find((o) => o.value === timeOfDay)?.label}</Text>
        <Icon name="chevronDown" size={20} lineHeight={21.1} color={colors.ink} style={[styles.rowChevron, pickerOpen && styles.flipped]}/>
      </Pressable>
      <EdgeLabel text="Time of day" label={form.timeLabel} patch={form.timePatch} patchColor={colors.card}/>

      <View style={[span(PAIR), styles.pairRow]}>
      <PairField grow={form.dateBox[2]} label="Date" patch={form.pairPatch.date} glyph="calendarMonth">
        <TextInput editable={false} value={dateText} style={[span(form.pairInput, form.dateBox[2]), styles.pairInput]}/>
      </PairField>
      <PairField grow={form.durationBox[2]} label="Duration (m)" patch={form.pairPatch.duration} glyph="clock">
        <TextInput accessibilityLabel="Duration in minutes" value={duration} onChangeText={setDuration} keyboardType="number-pad" style={[span(form.pairInput, form.durationBox[2]), styles.pairInput]}/>
      </PairField>
      </View>

      <Pressable accessibilityLabel="Repeat" accessibilityState={{ expanded: repeatOpen }} onPress={() => setRepeatOpen(true)} style={[span(form.repeatField), styles.field, styles.row]}>
        <View style={styles.rowIcon}>
          <Icon name="repeat" size={16} lineHeight={16.7} color={colors.ink}/>
        </View>
        <Text style={styles.rowValue}>{repeat}</Text>
        <Icon name="chevronDown" size={20} lineHeight={21.1} color={colors.ink} style={[styles.rowChevron, repeatOpen && styles.flipped]}/>
      </Pressable>
      <EdgeLabel text="Repeat" label={form.repeatLabel} patch={form.repeatPatch} patchColor={colors.card}/>

      <SubtaskCard />

      <View style={[span(form.notesCard), styles.card]}>
        <TextInput multiline placeholder="Write your notes..." placeholderTextColor={colors.ink} style={[span(form.notesInput, CARD_W), styles.notes]}/>
      </View>

      <Pressable accessibilityLabel="Delete task" onPress={onDelete} style={[at(form.trash), styles.round, styles.raised]}>
        <Icon name="trash" size={24} color={colors.dangerIcon}/>
      </Pressable>
      <Pressable accessibilityLabel="Start focus" onPress={onStart} style={[at(form.play), styles.round, styles.raised]}>
        <Icon name="play" size={24} color={colors.ink}/>
      </Pressable>
      <Pressable accessibilityLabel="Move to list" onPress={() => undefined} style={[right(form.move), styles.movePill]}>
        <Text style={styles.moveLabel}>Move to list</Text>
      </Pressable>

      {pickerOpen ? (<View style={styles.picker}>
          {TIME_OPTIONS.map((option) => (<Pressable key={option.value} accessibilityLabel={`Set ${option.label}`} onPress={() => {
                    setTimeOfDay(option.value);
                    setPickerOpen(false);
                }} style={styles.pickerRow}>
              <Text style={[styles.rowValue, option.value === timeOfDay && styles.pickerActive]}>{option.label}</Text>
            </Pressable>))}
        </View>) : null}

      {repeatOpen ? (<RepeatPicker value={repeat} onSelect={(option) => {
                setRepeat(option);
                setRepeatOpen(false);
            }} onDismiss={() => setRepeatOpen(false)}/>) : null}
    </ScrollView>);
}
function PairField({ grow, label, patch, glyph, children }: {
    grow: number;
    label: string;
    patch: Box;
    glyph: GlyphName;
    children: React.ReactNode;
}) {
    return (<Pressable accessibilityLabel={label} onPress={() => undefined} style={{ flexGrow: grow, flexBasis: 0 }}>
      <View style={[styles.field, styles.pairField]}/>
      <View style={[at(patch), { backgroundColor: colors.surface }]}/>
      <Text style={[pos([form.pairLabelLeft, 0]), styles.floatLabel]}>{label}</Text>
      <Pressable accessibilityLabel={`${label} picker`} onPress={() => undefined} style={[at(form.pairIcon), styles.round]}>
        <Icon name={glyph} size={16} color={colors.ink}/>
      </Pressable>
      {children}
    </Pressable>);
}
function SubtaskCard() {
    return (<View style={[span(form.subtaskCard), styles.card]}>
      <Text style={[pos(form.subtaskTitle), styles.cardTitle]}>Sub-tasks</Text>
      <Pressable accessibilityLabel="SUGGEST BREAKDOWN" onPress={() => undefined} style={[right(form.suggest, CARD_W), styles.suggest]}>
        <Text style={styles.suggestLabel}>SUGGEST BREAKDOWN</Text>
        <BreakdownGlyph size={16} color={colors.primary}/>
      </Pressable>
      <Pressable accessibilityLabel="ADD SUB-TASK" onPress={() => undefined} style={[span(form.addSubtask, CARD_W), styles.addSubtask]}>
        <Text style={styles.addSubtaskLabel}>ADD SUB-TASK</Text>
        <View style={styles.addLock}>
          <Icon name="lock" size={10.2} color={colors.lockInk}/>
        </View>
      </Pressable>
      <View style={[styles.divider, { top: form.divider }]}/>
      <Text style={[pos(form.timersTitle), styles.toggleTitle]}>Sub-task timers</Text>
      <Text style={[pos(form.timersCaption), styles.toggleCaption]}>A separate timer for each subtask</Text>
      <Pressable accessibilityRole="switch" accessibilityLabel="Sub-task timers" accessibilityState={{ checked: false }} onPress={() => undefined} style={[right(form.switchBox, CARD_W), styles.switchTrack]}>
        <View style={styles.switchRail}/>
        <View style={styles.switchKnob}/>
      </Pressable>
    </View>);
}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.sheet,
        borderTopLeftRadius: form.sheetRadius,
        borderTopRightRadius: form.sheetRadius,
    },
    canvas: { minHeight: form.contentHeight },
    round: { borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
    plain: { backgroundColor: colors.surface },
    raised: { backgroundColor: colors.card, ...lift },
    saveCircle: { backgroundColor: colors.primary },
    title: { ...typo.heading, color: colors.ink, position: 'absolute', top: form.titleTop, left: 64, right: 64, textAlign: 'center' },
    field: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: form.border,
        borderRadius: form.fieldRadius,
    },
    floatLabel: { ...typo.floatLabel, color: colors.ink },
    edgeLabel: { ...typo.edgeLabel, color: colors.ink },
    nameInput: { ...typo.nameInput, color: colors.ink, paddingLeft: form.nameInset, outlineStyle: 'none' } as object,
    chip: { borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
    chipGlyph: { fontSize: 21, lineHeight: 26.9 },
    chipLock: { borderRadius: 8, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
    row: { flexDirection: 'row', alignItems: 'center' },
    rowIcon: { position: 'absolute', left: form.rowIconLeft },
    rowValue: { ...typo.fieldValue, color: colors.ink, marginLeft: form.rowValueLeft, flex: 1 },
    rowChevron: { marginRight: form.rowChevronRight },
    flipped: { transform: [{ rotate: '180deg' }] },
    pairRow: { flexDirection: 'row', gap: form.durationBox[0] - form.dateBox[0] - form.dateBox[2] },
    pairField: { position: 'absolute', left: 0, right: 0, top: form.pairFieldTop, height: form.pairFieldHeight },
    pairInput: { ...typo.fieldValue, color: colors.ink, outlineStyle: 'none' } as object,
    card: { backgroundColor: colors.surface, borderRadius: form.cardRadius },
    cardTitle: { ...typo.heading, color: colors.ink },
    suggest: {
        backgroundColor: colors.card,
        borderRadius: 17.1,
        borderWidth: 1.1,
        borderColor: colors.hairline,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        gap: 6.1,
    },
    suggestLabel: { ...typo.smallCaps, color: colors.ink },
    addSubtask: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6.3 },
    addSubtaskLabel: { ...typo.smallCapsMuted, color: colors.faintInk },
    addLock: { width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
    divider: { position: 'absolute', left: 0, right: 0, height: 0.7, backgroundColor: colors.dash },
    toggleTitle: { ...typo.toggleTitle, color: colors.ink },
    toggleCaption: { ...typo.toggleCaption, color: colors.subtleInk },
    switchTrack: { justifyContent: 'center' },
    switchRail: { position: 'absolute', left: 5, width: 30.1, height: 14, borderRadius: 7, backgroundColor: colors.switchTrack },
    switchKnob: {
        position: 'absolute',
        left: 3.4,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.switchThumb,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
    },
    notes: { ...typo.notes, color: colors.ink, outlineStyle: 'none', textAlignVertical: 'top' } as object,
    movePill: { borderRadius: 20, backgroundColor: colors.card, paddingLeft: 24, justifyContent: 'center', ...lift },
    moveLabel: { ...typo.button, color: colors.ink },
    picker: {
        position: 'absolute',
        left: form.timeField[0],
        top: form.timeField[1] + form.timeField[3] + 4,
        width: form.timeField[2],
        backgroundColor: colors.card,
        borderRadius: form.fieldRadius,
        paddingVertical: 6,
        ...lift,
    },
    pickerRow: { height: 44, justifyContent: 'center' },
    pickerActive: { color: colors.primary },
});
