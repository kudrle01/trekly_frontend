import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthStore from '../../store/authStore';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';

const SplashScreen = ({ navigation }) => {
    const { getUser, logout } = useAuthStore();

    useEffect(() => {
        const checkEULAAcceptanceAndAuthenticate = async () => {
            try {
                const eulaAccepted = await AsyncStorage.getItem('EULAAccepted');
                if (eulaAccepted !== 'true') {
                    navigation.replace("EULA");
                    return;
                }
                const userFetchResult = await performAuthenticatedOperation(async () => {
                    return await getUser();
                });

                if (userFetchResult?.success) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'MainContainer' }],
                    });
                } else {
                    navigation.replace("UserStack");
                    logout();
                }
            } catch (error) {
                console.error("Authentication or EULA check failed:", error);
                logout();
                navigation.replace("UserStack");
            }
        };

        checkEULAAcceptanceAndAuthenticate();
    }, [navigation, getUser, logout]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#000" />
        </View>
    );
};

export default SplashScreen;
