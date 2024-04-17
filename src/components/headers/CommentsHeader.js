import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const CommentsHeader = () => {
    return (
        <View style={styles.header}>
            <Text style={[styles.text, styles.heading]}>Comments</Text>
        </View>
    )
};


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#a1a7aa',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20
    },
    heading: {
        color: '#a1a7aa',
    },
});

export default CommentsHeader;