import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';

import useModalStore from '../../store/modalStore';
import useFilterStore from '../../store/filterStore';


const FilteredElement = ({ item }) => {
    const bodyPartsModalVisible = useModalStore(state => state.bodyPartsModalVisible);
    const equipmentModalVisible = useModalStore(state => state.equipmentModalVisible);

    const setFilter = () => {
        if (bodyPartsModalVisible) {
            if (item.name === "All") {
                useFilterStore.getState().setBodyPart(useFilterStore.getState().defaultBodyPart);
            }   else {
                useFilterStore.getState().setBodyPart(item);
            }
            useModalStore.getState().setBodyPartsModalVisible(false);
        } else if (equipmentModalVisible) {
            if (item.name === "All") {
                useFilterStore.getState().setEquipment(useFilterStore.getState().defaultEquipment);
            }   else {
                useFilterStore.getState().setEquipment(item);
            }
            useModalStore.getState().setEquipmentModalVisible(false);
        }
    };

    return (
        <TouchableOpacity style={styles.root} onPress={setFilter}>
            <View style={styles.description}>
                <Text style={styles.name}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    root: {
        borderBottomWidth: 2,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },

    img: {
        width: 60,
        height: 60
    },

    description: {
        paddingHorizontal: 12
    },

    name: {
        fontWeight: 'bold',
        fontSize: 30,
    },
});

export default FilteredElement;