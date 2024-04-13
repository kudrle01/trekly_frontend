import React, { useState } from 'react';
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
  ActivityIndicator
} from 'react-native';

import Logo from '../../../assets/logo/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import useAuthStore from '../../store/authStore';
import bannedUsernames from '../../services/config/bannedUsernames.json';
import { saveCredentials } from '../../services/utilities/credentials';


const RegistrationScreen = ({ route, navigation }) => {
  const { gender, birthDate } = route.params;
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const registerUser = useAuthStore(state => state.registerUser);
  const getUser = useAuthStore(state => state.getUser);

  const handleInputChange = (name, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleRegistration = async () => {
    if (isRegistering) return;

    setIsRegistering(true);
    setError(''); // Clear any previous errors

    const { username, email, password, confirmPassword } = form;

    // Trim input values to remove leading and trailing whitespace
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Check if any of the trimmed input values are empty or contain only whitespace
    if (!trimmedUsername || !trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      setError('Please fill in all fields.');
      setIsRegistering(false);
      return;
    }

    // Username validation for length and banned list
    if (trimmedUsername.length < 4 || trimmedUsername.length > 20) {
      setError('Username must be between 4 and 20 characters long.');
      setIsRegistering(false);
      return;
    }
    if (bannedUsernames.includes(trimmedUsername.toLowerCase())) {
      setError('This username is not allowed. Please choose another one.');
      setIsRegistering(false);
      return;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      setIsRegistering(false);
      return;
    }

    if (trimmedPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      setIsRegistering(false);
      return;
    }
    if (!/[A-Za-z]/.test(trimmedPassword) || !/[0-9]/.test(trimmedPassword)) {
      setError('Password must contain both letters and numbers.');
      setIsRegistering(false);
      return;
    }
    if (trimmedPassword !== trimmedConfirmPassword) {
      setError('Passwords do not match.');
      setIsRegistering(false);
      return;
    }

    try {
      const result = await registerUser(trimmedUsername.toLowerCase(), trimmedEmail.toLowerCase(), trimmedPassword, birthDate, gender);
      if (result.success) {
        await saveCredentials(trimmedUsername.toLowerCase(), trimmedPassword);
        await getUser();
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainContainer' }],
        });
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (e) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.inner_container}>
          <Image source={Logo} style={[styles.logo, { height: useWindowDimensions().height * 0.2 }]} resizeMode="contain" />
          {error ? <Text style={styles.error_text}>{error}</Text> : null}
          <CustomInput
            placeholder="Username"
            value={form.username}
            setValue={value => handleInputChange('username', value)}
            type="PRIMARY"
          />
          <CustomInput
            placeholder="E-mail"
            value={form.email}
            setValue={value => handleInputChange('email', value)}
            type="PRIMARY"
          />
          <CustomInput
            placeholder="Password"
            value={form.password}
            setValue={value => handleInputChange('password', value)}
            secureTextEntry={true}
            type="PRIMARY"
          />
          <CustomInput
            placeholder="Confirm Password"
            value={form.confirmPassword}
            setValue={value => handleInputChange('confirmPassword', value)}
            secureTextEntry={true}
            type="PRIMARY"
          />
          <CustomButton
            text={isRegistering ? 'Signing up...' : 'Sign up'}
            onPress={handleRegistration}
            disabled={isRegistering}
            type="SECONDARY"
            textStyle={styles.button_text}
            style={[styles.button, isRegistering && styles.button_disabled]}
          >
            {isRegistering && <ActivityIndicator size="small" color="#fff" />}
          </CustomButton>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footer_text}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.log_in_text}>Log In</Text>
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

  button_text: {
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
  log_in_text: {
    color: '#007BFF',
    fontSize: 16,
    marginTop: 5,
  },
});

export default RegistrationScreen;
