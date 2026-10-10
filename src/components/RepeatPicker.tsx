import * as React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { RadioGlyph } from './Glyphs';
import { colors, lift, space, type as typo } from '../tokens';
import { REPEAT_CARD_OPTIONS, REPEAT_OPTIONS } from '../model';
import type { RepeatOption } from '../model';
export function RepeatPicker({ value, onSelect, onDismiss, inline, }: {
    value: RepeatOption;
    onSelect: (option: RepeatOption) => void;
    onDismiss: () => void;
    inline?: boolean;
}) {
    const options = inline ? REPEAT_OPTIONS : REPEAT_CARD_OPTIONS;
    const card = (<View style={inline ? styles.inlineCard : styles.repeatCard}>
      <Text accessibilityRole="header" style={styles.repeatTitle}>
        Repeat
      </Text>
      <View style={styles.repeatList} accessibilityRole="radiogroup">
        {options.map((option) => (<Pressable key={option} accessibilityRole="radio" accessibilityLabel={`Repeat ${option}`} accessibilityState={{ checked: option === value }} onPress={() => onSelect(option)} style={styles.repeatRow}>
            <Text style={styles.repeatLabel}>{option}</Text>
            
            <RadioGlyph size={space.repeatRadioSize} strokeWidth={space.repeatRadioStroke} dotSize={space.repeatRadioDot} selected={option === value} color={option === value ? colors.primary : colors.ink}/>
          </Pressable>))}
      </View>
    </View>);
    if (inline) {
        return card;
    }
    return (<Modal transparent visible animationType="none" onRequestClose={onDismiss}>
      <Pressable accessibilityLabel="Dismiss repeat options" style={[styles.scrim, { backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' } as any]} onPress={onDismiss}/>
      {card}
    </Modal>);
}
const styles = StyleSheet.create({
    scrim: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.30)' },
    repeatCard: {
        position: 'absolute',
        top: space.repeatCardTop,
        left: space.repeatCardInset,
        right: space.repeatCardInset,
        backgroundColor: colors.surface,
        borderRadius: space.repeatCardRadius,
        paddingHorizontal: space.repeatCardPadX,
        paddingTop: space.repeatCardPadTop,
        paddingBottom: space.repeatCardPadBottom,
    },
    inlineCard: {
        backgroundColor: colors.surface,
        borderRadius: space.repeatCardRadius,
        paddingHorizontal: space.repeatCardPadX,
        paddingTop: space.repeatCardPadTop,
        paddingBottom: space.repeatCardPadBottom,
        ...lift,
    },
    repeatTitle: { ...typo.pickerTitle, color: colors.ink },
    repeatList: {
        marginTop: space.repeatTitleToList,
        borderRadius: space.repeatListRadius,
        overflow: 'hidden',
        backgroundColor: colors.card,
    },
    repeatRow: {
        height: space.repeatRowHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: space.repeatRowPadLeft,
        paddingRight: space.repeatRowPadRight,
        backgroundColor: colors.card,
        borderBottomWidth: 1,
        borderBottomColor: colors.sheet,
    },
    repeatLabel: { ...typo.body, color: colors.ink },
});
