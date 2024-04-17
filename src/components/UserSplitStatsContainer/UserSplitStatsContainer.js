import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import StreakCounter from '../../components/StreakCounter';
import RestDaysCounter from '../RestDaysCounter';


const UserSplitStatsContainer = ({ userData, navigation }) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const lastStreakEvidenceDate = new Date(userData?.lastStreakEvidence).setHours(0, 0, 0, 0);

    streakColor = today === lastStreakEvidenceDate ? '#ff8001' : '#a1a7aa';

    return (
        <View style={styles.stats}>
            <View style={styles.stats_row}>
                <StreakCounter size={40} user={userData} navigation={navigation}/>
                <Text style={{ fontSize: 15, color: streakColor }}>Day Streak</Text>
            </View>
            <View style={styles.stats_line} />
            <View style={styles.stats_row}>
                <RestDaysCounter size={40} user={userData} />
                <Text style={{ fontSize: 15, color:"#008DDA" }}>Free Rest Days</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    stats: {
        marginHorizontal: 20,
        marginTop: 40,
        marginBottom: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    stats_line: {
        borderWidth: 1,
        borderColor: '#a1a7aa',
        height: 70,
    },
    stats_row: {
        height: 70,
        width: '47%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UserSplitStatsContainer;