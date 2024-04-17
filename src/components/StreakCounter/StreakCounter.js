import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StreakCounter = ({ size, user, navigation }) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const lastStreakEvidenceDate = new Date(user?.lastStreakEvidence).setHours(0, 0, 0, 0);

    const streakColor = today === lastStreakEvidenceDate ? '#ff8001' : '#a1a7aa';

    return (
        <TouchableOpacity style={styles.streak_container} onPress={() => navigation.navigate("Streak", {user})}>
            <Ionicons name={today === lastStreakEvidenceDate ? 'flame' : 'flame-outline'} size={size} color={streakColor} />
            <Text style={[{fontSize: size, color: streakColor }]}>{user?.streak}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    streak_container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default StreakCounter;
