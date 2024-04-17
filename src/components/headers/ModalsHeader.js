import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import useModalStore from '../../store/modalStore';

const ModalsHeader = () => {

    const bodyPartsModalVisible = useModalStore(state => state.bodyPartsModalVisible);
    const equipmentModalVisible = useModalStore(state => state.equipmentModalVisible);

    const close = () => {
        if (bodyPartsModalVisible) {
            useModalStore.getState().setBodyPartsModalVisible(false);
        } else if (equipmentModalVisible) {
            useModalStore.getState().setEquipmentModalVisible(false);
        }
    };


    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={close}>
                <Text style={styles.text}>Close</Text>
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default ModalsHeader;