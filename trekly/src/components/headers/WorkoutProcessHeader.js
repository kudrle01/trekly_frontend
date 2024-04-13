import React, { useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler, TouchableOpacity } from 'react-native';
import Timer from '../../components/Timer';
import { showConfirmationAlert, showInfoAlert } from '../../services/utilities/alertUtils';
import useWorkoutStore from '../../store/workoutStore';

const WorkoutProcessHeader = ({ exercises, navigation }) => {
    const endWorkout = () => {
        navigation.goBack();
        useWorkoutStore.getState().endWorkout();
    };

    const handleBackPress = () => {
        showConfirmationAlert(
          "Discard Workout",
          "Are you sure you want to discard this workout?",
          endWorkout,
          () => {}
        );
        return true;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
        );

        return () => backHandler.remove();
    }, []);

    const handleCancelPressed = () => {
        showConfirmationAlert("Discard Workout", "Are you sure you want to discard this workout?", endWorkout, () => {});
    };

    const handleFinishPressed = () => {
        if (exercises.length === 0) {
            showInfoAlert("Finish at least one set.");
        } else {
            useWorkoutStore.getState().setIsWorkoutActive(false);
            navigation.navigate("FinishWorkout", { exercises: exercises });
        }
    };

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleCancelPressed}>
                <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
            <Timer />
            <TouchableOpacity onPress={handleFinishPressed}>
                <Text style={styles.text}>Finish</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default WorkoutProcessHeader;
