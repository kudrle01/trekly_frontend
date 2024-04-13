import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StreakHeader from '../../components/headers/StreakHeader';

const StreakScreen = ({ route, navigation }) => {
    const { user } = route.params || {};
    const size = 50;
    return (
        <View style={styles.container}>
            <StreakHeader navigation={navigation} />
            <View style={styles.centered_content}>
                <View style={styles.info_container}>
                    <Text style={styles.info}>Workout for 10 minutes</Text>
                    <Text style={styles.info}>to extend your streak!</Text>
                </View>
                <View style={styles.stats}>
                    <View style={styles.counterContainer}>
                        <View style={styles.iconAndNumber}>
                            <Ionicons name="flame" size={size} color="#ff8001" />
                            <Text style={[styles.numberText, { color: "#ff8001", fontSize: size }]}>{user?.streak}</Text>
                        </View>
                        <Text style={[styles.descriptionText, { color: "#ff8001" }]}>Day Streak</Text>
                    </View>
                    <View style={styles.counterContainer}>
                        <View style={styles.iconAndNumber}>
                            <Ionicons name='snow-outline' size={size} color="#008DDA" />
                            <Text style={[styles.numberText, { color: "#008DDA", fontSize: size }]}>{user?.restDays}</Text>
                        </View>
                        <Text style={[styles.descriptionText, { color: "#008DDA" }]}>Free Rest Days</Text>
                    </View>
                </View>
                <View style={styles.info_container}>
                    <Text style={styles.add_info}>You get 10 rest days every month.</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    centered_content: {
        flex: 1,
        justifyContent: 'center',
    },
    info_container: {
        alignItems: 'center',
        marginBottom: 80,
    },
    info: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    add_info: {
        fontSize: 15,
        marginTop: 20,
        color: '#333',
        fontWeight: 'bold',
    },
    stats: {
        gap: 40,
    },
    counterContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconAndNumber: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    numberText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    descriptionText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
    },
});

export default StreakScreen;
