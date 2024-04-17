import React from 'react';
import { View, StyleSheet } from 'react-native';

import ProfileHeader from '../../components/headers/ProfileHeader';
import ProfileContent from '../../components/ProfileContent';
import useAuthStore from '../../store/authStore';

const ProfileScreen = ({ navigation }) => {
    const currentUser = useAuthStore(state => state.currentUser);
    return (
        <View style={styles.root}>
            <ProfileHeader navigation={navigation} />
            <ProfileContent navigation={navigation} user={currentUser}/>
        </View>
    );
};


const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

export default ProfileScreen;
