import React from 'react';
import { View, StyleSheet } from 'react-native';

import ProfileContent from '../../components/ProfileContent';
import UserProfileHeader from '../../components/headers/UserProfileHeader';

const UserProfileScreen = ({ route, navigation }) => {
    const { user } = route.params || {};
    return (
        <View style={styles.root}>
            <UserProfileHeader navigation={navigation} userId={user._id}/>
            <ProfileContent navigation={navigation} user={user}/>
        </View>
    );
};


const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

export default UserProfileScreen;