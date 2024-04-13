import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { fetchImage, fetchExerciseById } from "../../services/api/api";

import WorkoutExerciseTable from "../WorkoutExerciseTable";
import Ionicons from 'react-native-vector-icons/Ionicons';
import useWorkoutStore from "../../store/workoutStore";

const WorkoutExerciseContainer = ({ exercise, drag, isActive, navigation }) => {
    const [exerciseData, setExerciseData] = useState("");
    const [imageUrl, setImageUrl] = useState(require('../../../assets/icon.png'));
    const getExerciseById = async (id) => {
        try {
            const response = await fetchExerciseById(id);
            const exercise = response.data;
            return exercise;
        } catch (e) {
            console.error("Error fetching exercise by its id", e);
        }
    };

    useEffect(() => {
        const fetchAndSetImageUrl = async () => {
            try {
                const imageUrl = fetchImage("exercises", exercise._id);
                const exerciseData = await getExerciseById(exercise._id);
                if (exerciseData && exerciseData.name) {
                    setImageUrl({ uri: imageUrl });
                    setExerciseData(exerciseData);
                }
            } catch (e) {
                console.error("Failed to fetch or set image URL", e);
            }
        };

        fetchAndSetImageUrl();
    }, [exercise]);

    const removeExercise = () => {
        useWorkoutStore.getState().removeExerciseFromWorkout(exercise._id);
    }

    const exercisePressed = () => {
        navigation.navigate("ExerciseInfo", {exercise: exerciseData, imageUrl: imageUrl});
      };

    return (
        <TouchableOpacity style={[styles.root, isActive && styles.activeItem]} onLongPress={drag} onPress={exercisePressed}>
            <View style={styles.header}>
                <Image style={styles.img} source={imageUrl} />
                <View style={styles.textContainer}>
                    <Text style={styles.exercise_name}>{exerciseData.name}</Text>
                </View>
                <TouchableOpacity onPress={removeExercise}>
                    <Ionicons name="remove-outline" size={25} color="#ff0000" />
                </TouchableOpacity>
            </View>
            <WorkoutExerciseTable exercise={exercise} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    root: {
        borderBottomWidth: 2,
        marginBottom: 5,
        paddingVertical: 10,
    },
    activeItem: {
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    exercise_name: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    img: {
        width: 50,
        height: 50,
    },
});

export default WorkoutExerciseContainer;
