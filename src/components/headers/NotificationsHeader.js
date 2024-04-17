import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import useFilterStore from '../../store/filterStore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NotificationsHeader = ({ navigation }) => {
    const setSearchQuery = useFilterStore(state => state.setSearchQuery);

    const backPressed = () => {
        navigation.goBack();
        setSearchQuery("");
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={backPressed} style={styles.backButton}>
                <Ionicons name="chevron-back-outline" size={25} color="#a1a7aa" />
            </TouchableOpacity>
            <Text style={[styles.text, styles.heading]}>Notifications</Text>
            <View style={styles.placeholder} />
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between', // This spreads out the items to the full width
        paddingHorizontal: 30,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20
    },
    heading: {
        color: '#a1a7aa',
    },
    placeholder: {
        width: 25, 
    },
});

export default NotificationsHeader;
