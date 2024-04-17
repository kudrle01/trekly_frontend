import React from "react";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from "react-native";
import useWorkoutStore from "../../store/workoutStore";
import WorkoutExerciseContainer from "../WorkoutExerciseContainer";

const WorkoutExercisesList = ({ exercises, ListFooterComponent, navigation }) => {

    const renderItem = ({ item, drag, isActive }) => {
        return (
            <WorkoutExerciseContainer exercise={item} drag={drag} isActive={isActive} navigation={navigation}/>
        );
    };

    return (
        <GestureHandlerRootView style={styles.root}>
            <DraggableFlatList
                style={styles.list}
                data={exercises}
                renderItem={renderItem}
                keyExtractor={(item, _) => item._id}
                onDragEnd={({data}) => useWorkoutStore.getState().setExercises(data)}
                ListFooterComponent={ListFooterComponent}
            />
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    list: {
        paddingHorizontal: 20,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        backgroundColor: "#f9f9f9",
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 4,
    },
    text: {
        fontWeight: "bold",
    }
});

export default WorkoutExercisesList;
