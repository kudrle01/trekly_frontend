import { View, StyleSheet } from 'react-native';
import React from 'react';

import AddExerciseHeader from '../../components/headers/AddExerciseHeader';
import ExerciseFilterContainer from '../../components/ExerciseFilterContainer';

import useExercisesStore from '../../store/exercisesStore';
import useModalStore from '../../store/modalStore';
import FilterModal from '../../modals/FilterModal';
import ExercisesList from '../../components/ExercisesList';


const AddExerciseScreen = ({ navigation }) => {
    const bodyParts = useExercisesStore(state => state.bodyParts);
    const bodyPartsModalVisible = useModalStore(state => state.bodyPartsModalVisible);
    const equipment = useExercisesStore(state => state.equipment);
    const equipmentModalVisible = useModalStore(state => state.equipmentModalVisible);


    return (
        <View style={styles.root}>
            <AddExerciseHeader navigation={navigation} />
            <View style={styles.top_section}>
                <ExerciseFilterContainer />
            </View>
            <ExercisesList navigation={navigation} />
            <FilterModal
                data={bodyParts}
                modalVisible={bodyPartsModalVisible}
            />
            <FilterModal
                data={equipment}
                modalVisible={equipmentModalVisible}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    top_section: {
        paddingHorizontal: 20,
    }
});

export default AddExerciseScreen;