import React, { useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import useAchievementStore from '../../store/achievementStore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AchievementNotification = () => {
    const { notification, hideAchievement } = useAchievementStore();
    const [slideAnim] = React.useState(new Animated.Value(-100));

    useEffect(() => {
        if (notification.isVisible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();

            setTimeout(() => {
                Animated.timing(slideAnim, {
                    toValue: -100,
                    duration: 500,
                    useNativeDriver: true,
                }).start();

                hideAchievement();
            }, 3000);
        }
    }, [notification.isVisible]);

    return notification.isVisible ? (
        <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.content}>
                <Ionicons name='star-outline' size={24} color='#FFD700' style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{notification.name}</Text>
                    <Text style={styles.description}>{notification.description}</Text>
                </View>
            </View>
        </Animated.View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#333', // Dark background for contrast
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#FFD700', // A gold border for visual interest
        flexDirection: 'row', // Align icon and text horizontally
        alignItems: 'center', // Center items vertically within the container
        justifyContent: 'center', // Center items horizontally
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    textContainer: {
        flexShrink: 1,
    },
    title: {
        color: '#FFD700',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4, 
    },
    description: {
        color: '#ccc',
        fontSize: 14,
        textAlign: 'left',
    },
});

export default AchievementNotification;
