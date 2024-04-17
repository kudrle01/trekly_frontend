import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import noProfilePictureIcon from '../../../assets/no_picture/no-profile-picture-icon.jpg';
import { uploadUserImage } from '../../services/utilities/uploadUserImage';
import { showErrorAlert } from '../../services/utilities/alertUtils';
import useAuthStore from '../../store/authStore';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';

const UserProfilePhotoContainer = ({ userData }) => {
    const { updateProfilePhoto, currentUser } = useAuthStore();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            updateProfilePhoto(uri); // This ensures the local UI is updated immediately.
            try {
                await performAuthenticatedOperation(async (token) => {
                    await uploadUserImage(token, "user", uri);
                });
            } catch (error) {
                showErrorAlert("Upload Error", "Failed to update profile photo.");
                // If the upload fails, consider reverting the profile photo update here if necessary
            }
        }
    };

    return (
        <View style={styles.profile_photo_section}>
            {
                userData?._id === currentUser._id ? (
                    <TouchableOpacity onPress={pickImage}>
                        <Image source={userData?.profilePhotoUrl ? { uri: userData.profilePhotoUrl } : noProfilePictureIcon} style={styles.profile_photo} defaultSource={noProfilePictureIcon} />
                    </TouchableOpacity>
                ) :
                <View>
                    <Image source={userData?.profilePhotoUrl ? { uri: userData.profilePhotoUrl } : noProfilePictureIcon} style={styles.profile_photo} defaultSource={noProfilePictureIcon} />
                </View>
            }
            <Text style={styles.username}>{userData?.username || ""}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    profile_photo_section: {
        alignItems: 'center',
        marginTop: 20,
    },
    profile_photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#e1e4e8',
    },
    username: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default UserProfilePhotoContainer;
