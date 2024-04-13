import React from "react";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from "react-native";
import useRoutineStore from "../../store/routineStore";
import RoutineExerciseContainer from "../RoutineExerciseContainer/RoutineExerciseContainer";

const RoutineExercisesList = ({ exercises, id, ListFooterComponent, navigation }) => {
    const reorderRoutineExercises = useRoutineStore(state => state.reorderRoutineExercises);

    const renderItem = ({ item, drag, isActive }) => (
        <RoutineExerciseContainer exercise={item} drag={drag} isActive={isActive} navigation={navigation}/>
    );

    const onDragEnd = ({ data }) => {
        reorderRoutineExercises(id, data);
        useRoutineStore.getState().setExercises(data);
    };

    return (
        <GestureHandlerRootView style={styles.root}>
            <DraggableFlatList
                style={styles.list}
                data={exercises}
                renderItem={renderItem}
                keyExtractor={exercise => exercise._id}
                onDragEnd={onDragEnd}
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
});

export default RoutineExercisesList;
