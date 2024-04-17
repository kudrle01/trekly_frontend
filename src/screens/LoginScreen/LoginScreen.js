import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../../store/authStore';
import Logo from '../../../assets/logo/logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import * as Application from 'expo-application';
import { saveCredentials, getCredentials, deleteCredentials } from '../../services/utilities/credentials';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const loginUser = useAuthStore(state => state.loginUser);
    const getUser = useAuthStore(state => state.getUser);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchStoredCredentials = async () => {
            try {
                const credentials = await getCredentials();
                if (credentials) {
                    const { username, password } = credentials;
                    setUsername(username);
                    setPassword(password);
                }
            } catch (error) {
                console.error('Error retrieving stored credentials:', error);
            }
        };
        fetchStoredCredentials();
    }, []);

    const handleLogin = async () => {
        if (isLoading) return;

        if (!username.trim() || !password.trim()) {
            setError('Please fill in both fields.');
            return;
        }

        setIsLoading(true);
        try {
            const result = await loginUser(username.trim(), password.trim());
            if (result.success) {
                await saveCredentials(username.trim(), password.trim());
                await getUser();
                // Reset the navigation state to MainContainer with Home Screen as the initial route
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainContainer' }],
                });
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgetMe = async () => {
        await deleteCredentials();
        setUsername('');
        setPassword('');
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
            <View style={styles.versionContainer}>
                <Text style={styles.versionText}>v{Application.nativeApplicationVersion}</Text>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.inner_container}>
                    <Image source={Logo} style={[styles.logo, { height: useWindowDimensions().height * 0.2 }]} resizeMode="contain" />
                    {error ? <Text style={styles.error_text}>{error}</Text> : null}
                    <CustomInput
                        placeholder="Username or E-mail"
                        value={username}
                        setValue={setUsername}
                        secureTextEntry={false}
                        type="PRIMARY"
                    />
                    <CustomInput
                        placeholder="Password"
                        value={password}
                        setValue={setPassword}
                        secureTextEntry={true}
                        type="PRIMARY"
                    />
                    <CustomButton
                        text={isLoading ? 'Logging in...' : 'Log in'}
                        onPress={handleLogin}
                        disabled={isLoading}
                        type="SECONDARY"
                        textStyle={styles.login_button_text}
                        hidden="hidden"
                        style={isLoading && styles.button_disabled}
                    />
                    <CustomButton
                        text="Forget Me"
                        onPress={handleForgetMe}
                        type="TERTIARY"
                    />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footer_text}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateUser')}>
                        <Text style={styles.sign_up_text}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    inner_container: {
        alignItems: 'center',
        padding: 20,
        flex: 1,
    },
    logo: {
        width: '60%',
        maxHeight: 200,
    },
    input: {
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 15,
    },

    login_button_text: {
        color: '#fff',
        fontSize: 18,
    },
    button_disabled: {
        backgroundColor: '#aaa',
    },
    error_text: {
        color: 'red',
        marginVertical: 10,
    },
    footer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    footer_text: {
        fontSize: 16,
    },
    sign_up_text: {
        color: '#007BFF',
        fontSize: 16,
        marginTop: 5,
    },
    versionContainer: {
        position: 'absolute',
        top: 20,
        right: 10,
        zIndex: 100, // Ensure it sits above other components
    },

    versionText: {
        fontSize: 16,
        color: 'gray',
    },
});

export default LoginScreen;
