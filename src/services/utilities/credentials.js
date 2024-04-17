import * as SecureStore from 'expo-secure-store';

export const saveCredentials = async (username, password) => {
    await SecureStore.setItemAsync('username', username);
    await SecureStore.setItemAsync('password', password);
};

export const getCredentials = async () => {
    const username = await SecureStore.getItemAsync('username');
    const password = await SecureStore.getItemAsync('password');
    return { username, password };
};

export const deleteCredentials = async () => {
    await SecureStore.deleteItemAsync('username');
    await SecureStore.deleteItemAsync('password');
};
