import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import { fetchUserAchievements } from '../../services/api/achievements';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';

const UserAchievementsList = ({ userData }) => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        if (userData) {
            const fetchAchievements = async () => {
                try {
                    await performAuthenticatedOperation(async (token) => {
                        const fetchedAchievements = await fetchUserAchievements(token, userData._id);
                        setAchievements(fetchedAchievements);
                    });
                } catch (error) {
                    console.error("Failed to check achievements:", error);
                }
            };

            fetchAchievements();
        }
    }, [userData]);

    return (
        <ScrollView style={styles.list}>
            <Text style={styles.heading}>Achievements:</Text>
            {achievements.length > 0 ? (
                achievements.map((achievement, index) => (
                    <View key={index} style={styles.achievement}>
                        <View style={styles.achievementContent}>
                            <Ionicons name="star" size={24} color="#FFD700" style={styles.icon} />
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{achievement.name}</Text>
                                <Text style={styles.description}>{achievement.description}</Text>
                            </View>
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.noAchievements}>No achievements yet</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#333',
    },
    achievement: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    achievementContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    noAchievements: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default UserAchievementsList;
