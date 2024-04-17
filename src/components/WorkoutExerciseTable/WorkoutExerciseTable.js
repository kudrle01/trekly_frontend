import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Swipeable } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../CustomButton';
import useWorkoutStore from '../../store/workoutStore';
import { showInfoAlert } from '../../services/utilities/alertUtils';

const WorkoutExerciseTable = ({ exercise }) => {
    const sets = exercise.sets;

    const addNewSet = () => {
        const newSet = { kilograms: "", reps: "", isDone: false };
        useWorkoutStore.getState().addSetToExercise(exercise._id, newSet);
    };

    const handleDeleteSet = (index) => {
        index === 0 ?
            showInfoAlert("You can't delete the first set") :
            useWorkoutStore.getState().deleteSetFromExercise(exercise._id, index);
    };


    return (
        <View style={styles.table}>
            <View style={[styles.table_row, styles.header_row]}>
                <Text style={[styles.cell, styles.header]}>Set</Text>
                <Text style={[styles.cell, styles.header]}>Kg</Text>
                <Text style={[styles.cell, styles.header]}>Reps</Text>
            </View>
            {sets.map((set, index) => (
                <View key={index} style={styles.table_row}>
                    {
                        index > 0 ?
                            <TouchableOpacity onPress={() => { handleDeleteSet(index) }}>

                                <View style={styles.deleteBox}>
                                    <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
                                </View>
                            </TouchableOpacity>
                            :
                            <View style={{ height: 20, width: 20 }}></View>
                    }
                    <Text style={styles.cell}>{index + 1}</Text>
                    <TextInput
                        style={styles.cell}
                        keyboardType='numeric'
                        maxLength={3}
                        onChangeText={(value) => useWorkoutStore.getState().updateSet(exercise, index, 'kilograms', value)}
                        value={set.kilograms.toString()}
                        placeholder="-"
                        placeholderTextColor="#a1a7aa"
                    />
                    <TextInput
                        style={styles.cell}
                        keyboardType='numeric'
                        maxLength={3}
                        onChangeText={(value) => useWorkoutStore.getState().updateSet(exercise, index, 'reps', value)}
                        value={set.reps.toString()}
                        placeholder="-"
                        placeholderTextColor="#a1a7aa"
                    />
                    <Checkbox
                        disabled={false}
                        value={set.isDone}
                        onValueChange={(value) => useWorkoutStore.getState().updateSet(exercise, index, 'isDone', value)}
                        style={styles.checkbox}
                    />

                </View>
            ))}
            <CustomButton
                text="Add Set"
                type="TERTIARY"
                icon_name="add"
                style={styles.button}
                textType="PRIMARY"
                onPress={addNewSet}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    table: {
        marginTop: 20,
        borderColor: '#a1a7aa',
    },
    table_row: {
        flexDirection: 'row',
        alignItems: 'center', // This line ensures that all items in the row are vertically centered
    },
    cell: {
        flex: 1, // Divide the row equally between set and reps
        padding: 10,
        textAlign: 'center',
        color: '#a1a7aa',
        fontSize: 20
    },
    header: {
        fontWeight: 'bold',
        color: '#a1a7aa',
    },
    header_row: {
        borderBottomWidth: 1,
        borderColor: '#a1a7aa',
    },
    button: {
        backgroundColor: '#333',
        borderRadius: 5,
    },
    button_text: {
        color: '#fff',
    },
    checkbox: {
        borderColor: '#a1a7aa',
    },
    deleteBox: {
        flex: 1,
        justifyContent: 'center',
    }
});


export default WorkoutExerciseTable;