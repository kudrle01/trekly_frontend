import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WorkoutPost from '../../components/WorkoutPost';


const UserWorkoutList = ({ workouts, navigation, refreshUserData }) => {
    return (
        <View style={styles.list}>
            <Text style={styles.heading}>Workouts:</Text>
            {workouts && workouts.slice().reverse().map((workout, index) => (
                <WorkoutPost key={index} workout={workout} navigation={navigation} refreshUserData={refreshUserData} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#333',
    },
});

export default UserWorkoutList;