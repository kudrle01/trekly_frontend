import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WorkoutPostHeader = ({ navigation }) => {

    const donePressed = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={donePressed}>
                <Ionicons name="chevron-back-outline" size={25} />
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
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default WorkoutPostHeader;