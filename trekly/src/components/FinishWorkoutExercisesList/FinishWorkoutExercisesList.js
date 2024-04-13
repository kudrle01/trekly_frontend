import React from 'react';
import { StyleSheet, View } from 'react-native';

import FinishWorkoutExerciseContainer from '../FinishWorkoutExerciseContainer';

const FinishWorkoutExercisesList = ({ exercises }) => {
    return (
        <View style={styles.root}>
            {exercises.map((exercise) => (
                <FinishWorkoutExerciseContainer exercise={exercise} key={exercise._id} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        marginVertical: 10,
    }
});

export default FinishWorkoutExercisesList;