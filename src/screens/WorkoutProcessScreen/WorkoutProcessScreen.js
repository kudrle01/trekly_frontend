import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'

import WorkoutProcessHeader from '../../components/headers/WorkoutProcessHeader';
import CustomButton from '../../components/CustomButton';
import useWorkoutStore from '../../store/workoutStore';
import WorkoutExercisesList from '../../components/WorkoutExercisesList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showConfirmationAlert } from '../../services/utilities/alertUtils';

const WorkoutProcessScreen = ({ route, navigation }) => {
    const { routineId } = route.params || {};
    const isWorkoutActive = useWorkoutStore(state => state.isWorkoutActive);
    const toggleWorkoutStatus = useWorkoutStore(state => state.toggleWorkoutStatus)
    const workoutExercises = useWorkoutStore(state => state.exercises);

    const endWorkout = () => {
        navigation.goBack();
        useWorkoutStore.getState().endWorkout();
    };

    const handleDiscardPressed = () => {
        showConfirmationAlert("Discard Workout", "Are you sure you want to discard this workout?", endWorkout, () => { });
    };

    const workoutIcon = isWorkoutActive ? 'pause' : 'play';

    const filteredExercises = workoutExercises.filter(exercise =>
        exercise.sets.some(set => set.isDone)
    );

    const addExercisePressed = () => {
        navigation.navigate("AddExercise");
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
            <View style={styles.root}>
                <View style={styles.top_section}>
                    <WorkoutProcessHeader exercises={filteredExercises} navigation={navigation} />
                    <TouchableOpacity style={styles.playPauseButton} onPress={toggleWorkoutStatus}>
                        <Ionicons name={workoutIcon} size={30} color="#000" />
                    </TouchableOpacity>
                </View>

                <WorkoutExercisesList exercises={workoutExercises} routineId={routineId} navigation={navigation} ListFooterComponent={
                    <CustomButton
                        text="Add Exercise"
                        onPress={addExercisePressed}
                        type="SECONDARY"
                        icon_name="add"
                        textStyle={styles.add_exercise_button}
                        style={styles.button}
                    />}

                />
                <TouchableOpacity style={styles.button} onPress={handleDiscardPressed}>
                    <Text style={styles.button_text}>Discard Workout</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    )
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    top_section: {
        paddingHorizontal: 30
    },
    button: {
        alignSelf: 'center',
        marginTop: 10,
    },
    button_text: {
        fontSize: 20,
        color: 'red',
    },
    playPauseButton: {
        alignSelf: 'center',
        padding: 20,
    },
    add_exercise_button: {
        color: '#fff'
    },
});

export default WorkoutProcessScreen;