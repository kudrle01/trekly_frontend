import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure you have Ionicons installed
import noProfilePictureIcon from '../../../assets/no_picture/no-profile-picture-icon.jpg';

const NotificationItem = ({ notification, navigation }) => {
    const renderIcon = () => {
        let iconName;
        switch (notification.action) {
            case 'like':
                iconName = 'heart';
                break;
            case 'comment':
                iconName = 'chatbubble';
                break;
            case 'follow':
                iconName = 'person-add';
                break;
            default:
                iconName = 'notifications';
        }
        return <Ionicons name={iconName} size={20} color="#4b6584" style={styles.icon} />;
    };

    const renderContent = () => {
        switch (notification.action) {
            case 'like':
                return `liked your workout.`;
            case 'comment':
                return `commented your workout.`;
            case 'follow':
                return `started following you.`;
            default:
                return '';
        }
    };

    const notificationItemPressed = () => {
        notification.action === 'follow' ? navigation.navigate("UserProfile", { user: notification.initiator }) : navigation.navigate("WorkoutPost", { workout: notification.targetWorkout });
    };

    return (
        <TouchableOpacity style={styles.notificationItem} onPress={notificationItemPressed}>
            <Image source={notification.initiator.profilePhotoUrl ? { uri: notification.initiator.profilePhotoUrl } : noProfilePictureIcon} style={styles.avatar} />
            <View style={styles.contentContainer}>
                <View style={styles.notificationContent}>
                    {renderIcon()}
                    <Text style={styles.text}>
                        <Text style={styles.username}>{notification.initiator.username} </Text>
                        {renderContent()}
                    </Text>
                </View>
                <Text style={styles.timestamp}>{formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    notificationItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal: 20,
    },
    contentContainer: {
        flex: 1,
    },
    notificationContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    text: {
        flex: 1,
        color: '#34495e',
        fontSize: 16,
    },
    username: {
        fontWeight: 'bold',
    },
    timestamp: {
        marginTop: 5,
        fontSize: 12,
        color: '#95a5a6',
        textAlign: 'right',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#e1e4e8',
    },
});

export default NotificationItem;
