import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import useFilterStore from '../../store/filterStore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchUserHeader = ({ navigation }) => {
    const setSearchQuery = useFilterStore(state => state.setSearchQuery);

    const backPressed = () => {
        navigation.goBack();
        setSearchQuery("");
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={backPressed}>
                <Ionicons name="chevron-back-outline" size={25} />
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
        paddingHorizontal: 30,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default SearchUserHeader;