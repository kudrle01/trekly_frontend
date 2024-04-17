import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const AboutHeader = ({ navigation }) => {

    const backPressed = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={backPressed}>
                <Text style={styles.text}>Back</Text>
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
        fontSize: 20
    }
});

export default AboutHeader;