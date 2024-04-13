import React from 'react';
import { View, StyleSheet, Modal, FlatList, Dimensions } from 'react-native';

import ModalsHeader from '../../components/headers/ModalsHeader';
import FilteredElement from '../../components/FilteredElement';

const FilterModal = ({ modalVisible, data }) => {
    
    const handleClose = () => {
        close(); 
    };

    const close = () => {
        if (bodyPartsModalVisible) {
            useModalStore.getState().setBodyPartsModalVisible(false);
        } else if (equipmentModalVisible) {
            useModalStore.getState().setEquipmentModalVisible(false);
        }
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleClose}
            presentationStyle=''>
            <View style={styles.modalView}>
                <ModalsHeader />
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return <FilteredElement
                            item={item}
                        />
                    }}
                />
            </View>
        </Modal>
    )
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    modalView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: screenHeight * 0.78,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});

export default FilterModal;