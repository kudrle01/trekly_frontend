import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { fetchExerciseById, fetchImage } from "../../services/api/api";


const FinishWorkoutExerciseContainer = ({ exercise }) => {
    const [exerciseName, setExerciseName] = useState("");
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
                    setExerciseName(exerciseData.name);
                }
            } catch (e) {
                console.error("Failed to fetch or set image URL", e);
            }
        };

        fetchAndSetImageUrl();
    }, [exercise]);

    const completedSets = exercise.sets.filter(set => set.isDone);

    const totalReps = completedSets.reduce((acc, currentSet) => acc + parseInt(currentSet.reps || 0), 0);

    return (
        <View style={styles.root}>
            <Image style={styles.img} source={imageUrl} />
            <View style={styles.exercise_info}>
                <Text style={styles.exercise_sets_reps}>{completedSets.length} sets, {totalReps} reps</Text>
                <Text style={styles.exercise_name}>{exerciseName}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
    },

    exercise_info: {
        flex: 1,
        marginLeft: 10,
    },

    exercise_sets_reps: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#a1a7aa',
    },
    exercise_name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    img: {
        width: 50,
        height: 50,
    },
});

export default FinishWorkoutExerciseContainer;
