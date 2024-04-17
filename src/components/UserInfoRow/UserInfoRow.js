import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, View } from 'react-native';
import noProfilePictureIcon from '../../../assets/no_picture/no-profile-picture-icon.jpg';

const UserInfoRow = ({ user, navigation, setModalVisible }) => {
    const userPressed = () => {
        navigation.navigate("UserProfile", { user: user });
        if (setModalVisible) setModalVisible(false);
    };

    return (
        <TouchableOpacity style={styles.user_info} onPress={user?._id ? userPressed : () => {}}>
            <Image source={user?.profilePhotoUrl ? { uri: user?.profilePhotoUrl } : noProfilePictureIcon} style={styles.avatar} />
            <Text style={styles.username}>{user?.username || "Anonymous"}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    user_info: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#e1e4e8',
    },
    username: {
        fontWeight: '600',
        fontSize: 16,
        color: '#2c3e50',
    },
});

export default UserInfoRow;
