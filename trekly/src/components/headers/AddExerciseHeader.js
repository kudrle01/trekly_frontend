import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

import useFilterStore from '../../store/filterStore';

const AddExerciseHeader = ({ navigation }) => {
    const defaultBodyPart = useFilterStore(state => state.defaultBodyPart);
    const defaultEquipment = useFilterStore(state => state.defaultEquipment);

    const cancelPressed = () => {
        navigation.goBack();
        useFilterStore.getState().setBodyPart(defaultBodyPart);
        useFilterStore.getState().setEquipment(defaultEquipment);
        useFilterStore.getState().setSearchQuery("");
    }

    return (
        <View style={styles.header}>
            <Pressable onPress={cancelPressed}>
                <Text style={styles.text}>Cancel</Text>
            </Pressable>
        </View>
    )
};


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 30,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default AddExerciseHeader;