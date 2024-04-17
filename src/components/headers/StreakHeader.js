import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const StreakHeader = ({ navigation }) => {

    const donePressed = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={donePressed}>
                <Text style={styles.text}>Done</Text>
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        justifyContent: 'flex-end',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default StreakHeader;