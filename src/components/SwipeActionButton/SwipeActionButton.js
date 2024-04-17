import React from 'react';
import { Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';

const SwipeActionButton = ({ dragX }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const translateX = interpolate(dragX.value, [0, 50, 100, 101], [-100, -50, 0, 0]);
        return {
            transform: [{ translateX }],
        };
    });

    return (
        <TouchableOpacity
            onPress={() => Alert.alert('Delete Routine', 'Are you sure you want to delete this routine?', [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete', onPress: () => {
                    }
                },
            ])}
            style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}>
            <Animated.Text style={[styles.text, animatedStyle]}>
                Delete
            </Animated.Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
    }
});

export default SwipeActionButton;
