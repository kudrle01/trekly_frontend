import { StyleSheet, View } from 'react-native';
import React from 'react';

import CustomButton from '../CustomButton';
import SearchBar from '../SearchBar';

import useModalStore from '../../store/modalStore';
import useFilterStore from '../../store/filterStore';

const ExerciseFilterContainer = () => {
    const bodyPartFilter = useFilterStore(state => state.bodyPart);
    const equipmentFilter = useFilterStore(state => state.equipment);

    const defaultBodyPart = useFilterStore(state => state.defaultBodyPart);
    const defaultEquipment = useFilterStore(state => state.defaultEquipment);

    const bodyPartPressed = () => {
        useModalStore.getState().setBodyPartsModalVisible(true);
    };

    const equipmentPressed = () => {
        useModalStore.getState().setEquipmentModalVisible(true);
    };

    return (
        <View style={styles.root}>
            <SearchBar placeholder={"Search exercises..."}/>
            <View style={styles.buttons_container}>
                <CustomButton
                    style={filterButton(bodyPartFilter.name, defaultBodyPart.name)}
                    text={bodyPartFilter.name}
                    onPress={bodyPartPressed}
                    type="TERTIARY"
                    hidden="hidden"
                    textStyle={styles.button_text}
                />
                <CustomButton
                    style={filterButton(equipmentFilter.name, defaultEquipment.name)}
                    text={equipmentFilter.name}
                    onPress={equipmentPressed}
                    type="TERTIARY"
                    hidden="hidden"
                    textStyle={styles.button_text}
                />
            </View>
        </View>
    );
};

const filterButton = (filter, defaultValue) => {
    if(filter !== defaultValue){
        return [styles.button, styles.button_filtered, styles.button_filtered_text]
    }
    return [styles.button, styles.button_text];
}


const styles = StyleSheet.create({
    root: {
    },

    buttons_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    button: {
        width: '45%',
        borderRadius: 10,
        borderColor: '#a1a7aa',
        borderWidth: 2,
        marginTop: 10,
        marginBottom: 20
    },

    button_filtered: {
        backgroundColor: '#000',
        borderColor: '#000',
    },

    button_text: {
        color: '#a1a7aa',
        fontSize: 10
    },
    button_filtered_text: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold'
    }

});

export default ExerciseFilterContainer;