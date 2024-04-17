import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, BackHandler } from 'react-native';

import { saveRoutine, updateRoutine } from '../../services/api/api';
import useRoutineStore from '../../store/routineStore';
import useAuthStore from '../../store/authStore';
import { showConfirmationAlert, showInfoAlert } from '../../services/utilities/alertUtils';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';

const RoutineHeader = ({ routineId, navigation }) => {
    const getUser = useAuthStore(state => state.getUser);
    const routineName = useRoutineStore(state => state.name.trim()); // Trim routineName
    const routineExercises = useRoutineStore(state => state.exercises);

    const cancelRoutine = () => {
        navigation.goBack();
        useRoutineStore.getState().clearExercises();
        useRoutineStore.getState().setName("");
    };

    const handleCancelPressed = () => {
        showConfirmationAlert("Cancel Routine", "Are you sure you want to cancel this routine?", cancelRoutine, () => { });
    };

    const saveCurrentRoutine = async () => {
        try {
            await performAuthenticatedOperation(async (token) => {
                if (routineId) {
                    await updateRoutine(token, routineId, routineName, routineExercises);
                } else {
                    await saveRoutine(token, routineName, routineExercises);
                }
                await getUser();
                navigation.goBack();
            });
        } catch (error) {
            if (error.message === 'SessionExpired') {
                navigation.navigate("UserStack");
            } else {
                showInfoAlert("Failed to save routine. Please try again.");
            }
        } finally {
            useRoutineStore.getState().clearExercises();
            useRoutineStore.getState().setName("");
        }
    };

    const savePressed = () => {
        const trimmedRoutineName = routineName.trim(); // Trim routineName
        if (trimmedRoutineName.length === 0 || trimmedRoutineName.length > 15) {
            showInfoAlert("Routine name should have 1-15 characters.");
        } else if (routineExercises.length === 0) {
            showInfoAlert("Please add at least one exercise to the routine.");
        } else {
            saveCurrentRoutine();
        }
    };

    useEffect(() => {
        const backPressHandler = () => {
            handleCancelPressed();
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', backPressHandler);

        return () => BackHandler.removeEventListener('hardwareBackPress', backPressHandler);
    }, [handleCancelPressed]);


    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleCancelPressed}>
                <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={savePressed}>
                <Text style={styles.text}>Save</Text>
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
        paddingHorizontal: 30,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default RoutineHeader;
