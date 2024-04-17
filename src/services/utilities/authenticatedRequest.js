import * as SecureStore from 'expo-secure-store';
import useAuthStore from '../../store/authStore';

const performAuthenticatedOperation = async (operation) => {
    const { refreshUserAccessToken, logout } = useAuthStore.getState();
    const accessToken = await SecureStore.getItemAsync('accessToken');

    try {
        return await operation(accessToken);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            const refreshResult = await refreshUserAccessToken();
            if (refreshResult.success) {
                const newAccessToken = await SecureStore.getItemAsync('accessToken');
                return await operation(newAccessToken);
            } else {
                logout();
                throw new Error('SessionExpired');
            }
        } else {
            throw error;
        }
    }
};

export default performAuthenticatedOperation;
