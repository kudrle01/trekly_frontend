import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useAuthStore from '../../store/authStore';
import SettingsHeader from '../../components/headers/SettingsHeader';
import { showConfirmationAlert } from '../../services/utilities/alertUtils';
import * as Linking from 'expo-linking';
import { deleteAccount } from '../../services/api/api';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';

const SettingsScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

    const logoutUser = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "UserStack" }],
        });
        useAuthStore.getState().logout();
    }

    const handleDeleteAccountPressed = () => {
        showConfirmationAlert("Delete Accout", "Are you sure you want to delete your account?", deleteUser, () => { });
    };

    const handleLogoutPressed = () => {
        showConfirmationAlert("Logout", "Do you want to logout??", logoutUser, () => { });
    };

    const deleteUser = async () => {
        setIsLoading(true);
        try {
            await performAuthenticatedOperation(async (accessToken) => {
                await deleteAccount(accessToken);
                logoutUser();
            });
        } catch (error) {
            console.error("Deleting failed: " + error);
            logoutUser();
        } finally {
            setIsLoading(false);
        }
    }

    const handleSupportPress = () => {
        const url = 'http://trekly.euweb.cz/support/';
        Linking.openURL(url).catch(err => console.error("An error occurred", err));
    }

    return (
        <View style={styles.root}>
            <SettingsHeader navigation={navigation} />
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <TouchableOpacity
                    style={styles.settings_item}
                    onPress={() => { navigation.navigate("About") }}
                    activeOpacity={0.7}>
                    <Ionicons name="information-circle-outline" size={24} style={styles.icon} />
                    <Text style={styles.settings_item_text}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.settings_item}
                    onPress={() => { navigation.navigate("Info") }}
                    activeOpacity={0.7}>
                    <Ionicons name="document-text-outline" size={24} style={styles.icon} />
                    <Text style={styles.settings_item_text}>Information</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.settings_item}
                    onPress={handleSupportPress}
                    activeOpacity={0.7}>
                    <Ionicons name="help-circle-outline" size={24} style={styles.icon} />
                    <Text style={styles.settings_item_text}>Support</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.settings_item, styles.logout_button]}
                    onPress={handleLogoutPressed}
                    activeOpacity={0.7}>
                    <Ionicons name="log-out-outline" size={24} style={styles.icon} />
                    <Text style={styles.settings_item_text}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
            {isLoading && <ActivityIndicator size="large" color="#000" />}
            <TouchableOpacity style={styles.delete_button} onPress={handleDeleteAccountPressed} disabled={isLoading}>
                <Text style={styles.delete_button_text}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollViewContainer: {
        paddingVertical: 20,
    },
    delete_button: {
        alignSelf: 'center',
        paddingVertical: 20,
    },
    delete_button_text: {
        fontSize: 20,
        color: 'red',
    },
    settings_item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    settings_item_text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        color: '#333',
    },
    icon: {
        color: '#007bff',
    },
    logout_button: {
        marginTop: 40,
    }
});

export default SettingsScreen;
