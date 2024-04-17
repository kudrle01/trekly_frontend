import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showConfirmationAlert } from '../../services/utilities/alertUtils';

import CustomButton from '../CustomButton';
import useWorkoutStore from '../../store/workoutStore';
import useRoutineStore from '../../store/routineStore';
import { deleteRoutine } from '../../services/api/api';
import useAuthStore from '../../store/authStore';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';

const RoutineContainer = ({ routine, navigation }) => {
    const [fadeAnim] = useState(new Animated.Value(1));
    const updateRoutines = useAuthStore(state => state.updateRoutines);
    const currentUser = useAuthStore(state => state.currentUser);

    const openRoutine = () => {
        useRoutineStore.getState().setExercises(routine.exercises);
        useRoutineStore.getState().setName(routine.name);
        navigation.navigate("Routine", { routineId: routine._id });
    };

    const startRoutine = () => {
        useWorkoutStore.getState().setExercises(routine.exercises);
        useWorkoutStore.getState().setName(routine.name);
        useWorkoutStore.getState().setIsWorkoutActive(true);
        navigation.navigate("WorkoutProcess", { routineId: routine._id });
    };

    const deleteSelectedRoutine = async () => {
        const originalRoutines = currentUser.routines;
        const updatedRoutines = originalRoutines.filter(r => r._id !== routine._id);
        updateRoutines(updatedRoutines);

        try {
            await performAuthenticatedOperation(async (token) => {
                await deleteRoutine(token, routine._id);
            });
        } catch (error) {
            console.error('Error in deleting routine', error);
            updateRoutines(originalRoutines);
            navigation.navigate("UserStack");
        }
    };
    

    const handleDelete = () => {
        showConfirmationAlert(
            "Cancel Routine",
            "Are you sure you want to delete this routine?",
            deleteSelectedRoutine,
            () => { }
        );
    }

    return (
        <Animated.View style={[styles.root, { opacity: fadeAnim }]}>
            <TouchableOpacity onPress={openRoutine} style={styles.touchableArea}>
                <View style={styles.description}>
                    <Text style={styles.name}>{routine.name}</Text>
                    <TouchableOpacity onPress={handleDelete}>
                        <Ionicons name="trash-outline" size={25} color="#ff6b6b" />
                    </TouchableOpacity>
                    <Text style={styles.exercises}>{routine.exercises.length} exercises</Text>
                </View>
                <CustomButton
                    text="Start Routine"
                    type="TERTIARY"
                    icon_name="play-outline"
                    style={styles.button}
                    textType="PRIMARY"
                    onPress={startRoutine}
                />
            </TouchableOpacity>
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: 160,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff', // Set background color to white
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.1, // Shadow opacity
        shadowRadius: 4, // Shadow blur radius
        elevation: 3, // Elevation for Android
        marginHorizontal: 20, // Horizontal margin
    },
    description: {
        paddingVertical: 15,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    exercises: {
        fontSize: 20,
        color: '#a1a7aa',
        width: '100%',
    },
    button: {
        backgroundColor: '#333',
        borderRadius: 5,
    },
});

export default RoutineContainer;