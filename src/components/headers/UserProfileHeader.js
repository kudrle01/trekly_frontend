import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showConfirmationAlert } from '../../services/utilities/alertUtils';
import { reportUser, blockUser } from '../../services/api/reports';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';
import useAuthStore from '../../store/authStore';
import useRefreshStore from '../../store/refreshStore';

const UserProfileHeader = ({ navigation, userId }) => {

    const backPressed = () => {
        navigation.goBack();
    }

    const handleReportPressed = () => {
        showConfirmationAlert("Report User", "Are you sure you want to report this user?", report, () => { });
    };

    const handleBlockPressed = () => {
        showConfirmationAlert("Block User", "Are you sure you want to block this user?", block, () => { });
    };

    const report = async () => {
        try {
            await performAuthenticatedOperation(async (accessToken) => {
                await reportUser(accessToken, userId)
            });
          } catch (error) {
            console.error("Report failed: " + error);
            navigation.navigate("UserStack");
            useAuthStore.getState().logout();
          }
    }

    const block = async () => {
        try {
            await performAuthenticatedOperation(async (accessToken) => {
                await blockUser(accessToken, userId);
                useRefreshStore.getState().toggleRefresh();
                navigation.navigate("MainContainer");
            });
          } catch (error) {
            console.error("Report failed: " + error);
            navigation.navigate("UserStack");
            useAuthStore.getState().logout();
          }
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={backPressed}>
                <Ionicons name="chevron-back-outline" size={25} />
            </TouchableOpacity>
            <View style={styles.block_or_report}>
            <TouchableOpacity onPress={handleBlockPressed}>
                <Ionicons name="ban-outline" size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReportPressed}>
                <Ionicons name="flag-outline" size={25} />
            </TouchableOpacity>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    block_or_report: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 40,
    }
});

export default UserProfileHeader;