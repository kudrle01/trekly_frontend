import React from "react";
import {View, TouchableOpacity, StyleSheet} from 'react-native';

const DraggableIndicator = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.draggableIndicator}>
        <View style={styles.indicator} />
    </TouchableOpacity>
);


const styles = StyleSheet.create({
    // Existing styles...
    draggableIndicator: {
        width: '100%', // Take the full width of the modal
        alignItems: 'center', // Center the indicator
        paddingTop: 10,
    },
    indicator: {
        width: 40, // Width of the indicator
        height: 5, // Height of the indicator
        borderRadius: 2.5, // Make it slightly rounded
        backgroundColor: '#ccc', // A neutral color for the indicator
    },
    // Other styles...
});

export default DraggableIndicator