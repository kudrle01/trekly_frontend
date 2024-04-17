import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RestDaysCounter = ({ size, user }) => {

    return (
        <TouchableOpacity style={styles.streak_container}>
            <Ionicons name='snow-outline' size={size} color="#008DDA"/>
            <Text style={[{fontSize: size, color: "#008DDA" }]}>{user?.restDays}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    streak_container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default RestDaysCounter;
