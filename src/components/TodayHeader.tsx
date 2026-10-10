import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SparkleGlyph } from './Glyphs';
import { Icon } from './Icon';
import { colors, frame, lift, space, type as typo } from '../tokens';
export function TodayHeader({ onAdd }: {
    onAdd: () => void;
}) {
    return (<View style={styles.row}>
      <Pressable accessibilityLabel="Get Pro" onPress={() => undefined} style={styles.proPill}>
        <Text style={styles.proLabel}>GET PRO</Text>
        <SparkleGlyph size={18} color={colors.primary}/>
      </Pressable>
      <View style={styles.controls}>
        <Pressable accessibilityLabel="Settings" onPress={() => undefined} style={styles.circle}>
          <Icon name="cog" size={24} color={colors.ink}/>
        </Pressable>
        <Pressable accessibilityLabel="Add task" onPress={onAdd} style={styles.circle}>
          <Icon name="plus" size={24} lineHeight={24.7} color={colors.ink}/>
        </Pressable>
      </View>
    </View>);
}
const CIRCLE = 40;
const PRO_W = 117.5;
const styles = StyleSheet.create({
    row: {
        height: space.headerHeight,
        marginTop: space.headerTop,
        justifyContent: 'center',
    },
    proPill: {
        position: 'absolute',
        left: (frame.width - PRO_W) / 2 - 0.9,
        width: PRO_W,
        height: CIRCLE,
        borderRadius: CIRCLE / 2,
        backgroundColor: colors.card,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24,
        gap: 8,
        ...lift,
    },
    proLabel: { ...typo.button, color: colors.ink },
    controls: {
        position: 'absolute',
        right: 16,
        height: space.headerHeight,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8.1,
    },
    circle: {
        width: CIRCLE,
        height: CIRCLE,
        borderRadius: CIRCLE / 2,
        backgroundColor: colors.card,
        alignItems: 'center',
        justifyContent: 'center',
        ...lift,
    },
});
