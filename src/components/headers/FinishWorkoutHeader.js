import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import useWorkoutStore from '../../store/workoutStore';
import { showErrorAlert, showInfoAlert } from '../../services/utilities/alertUtils';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';
import { saveWorkout } from '../../services/api/api';
import useAuthStore from '../../store/authStore';

const FinishWorkoutHeader = ({ exercises, navigation }) => {
    const { workoutName, difficulty, duration, postContent, image } = useWorkoutStore(state => ({
        workoutName: state.name,
        difficulty: state.difficulty,
        duration: state.duration,
        postContent: state.postContent,
        image: state.image,
    }));
    const [isSaving, setIsSaving] = useState(false);

    const handleBackPressed = () => {
        useWorkoutStore.getState().setIsWorkoutActive(true);
        navigation.goBack();
    };

    const saveCurrentWorkout = async () => {
        setIsSaving(true);
        const formData = new FormData();
        if (image) {
            formData.append('file', {
                uri: image,
                type: 'image/jpeg',
                name: 'workout.jpg',
            });
        }
        formData.append('name', workoutName);
        formData.append('difficulty', difficulty);
        formData.append('duration', duration);
        formData.append('postContent', postContent);
        formData.append('exercises', JSON.stringify(exercises));

        await performAuthenticatedOperation(async (accessToken) => {
            await saveWorkout(accessToken, formData);
        }).catch((error) => {
            console.error("error saving workout: ", error);
            navigation.navigate("UserStack");
            useAuthStore.getState().logout();
        }).finally(() => {
            setIsSaving(false);
            showInfoAlert("Workout posted");
            navigation.navigate("MainContainer");
            useWorkoutStore.getState().endWorkout();
        });
    }

    const handleSavePressed = () => {
        if (workoutName.length === 0 || workoutName.length > 15) {
            showErrorAlert("", "Workout name should have 1-15 characters.");
        } else {
            saveCurrentWorkout();
        }
    };

    return (
        <View style={styles.header}>
            {isSaving ? (
                <View style={styles.savingOverlay}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : (
                <>
                    <TouchableOpacity onPress={handleBackPressed} disabled={isSaving}>
                        <Text style={styles.text}>Back</Text>
                    </TouchableOpacity>
                    <Text style={[styles.text, styles.heading]}>Workout Summary</Text>
                    <TouchableOpacity onPress={handleSavePressed} disabled={isSaving}>
                        <Text style={styles.text}>Save</Text>
                    </TouchableOpacity>
                </>
            )}
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
        fontSize: 20
    },
    heading: {
        color: '#a1a7aa',
    },
    savingOverlay: {
        ...StyleSheet.absoluteFill, // Make the overlay cover the entire header
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
    },
});

export default FinishWorkoutHeader;