import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import InfoHeader from '../../components/headers/InfoHeader';

const InfoScreen = ({ navigation }) => {
    return (
        <View>
            <InfoHeader navigation={navigation} />
            <View style={styles.content}>
                <Text style={styles.header}>Project Information</Text>

                <Text style={styles.text}>
                    This project was created by Jan Kudrlička as part of a bachelor's thesis. The exercise database is provided by Justin, created for the community to enhance fitness experiences globally. For more details on the exercise database, visit
                    {' '}
                    <Text style={styles.link} onPress={() => Linking.openURL('https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb/details')}>
                        ExerciseDB API.
                    </Text>
                </Text>

                <Text style={styles.text}>
                    Trekly is a nonprofit project aimed at promoting fitness and well-being through gamification and community support. Our mission is to make fitness accessible and engaging for everyone.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    link: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
});

export default InfoScreen;
