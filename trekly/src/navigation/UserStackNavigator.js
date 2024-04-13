import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import CreateUserStackNavigator from './CreateUserStackNavigator';

const UserStack = createNativeStackNavigator();

const UserStackNavigator = () => (
  <UserStack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <UserStack.Screen name="Login" component={LoginScreen} options={{
      gestureEnabled: false,
      headerLeft: () => null
    }} />
    <UserStack.Screen name="CreateUser" component={CreateUserStackNavigator} options={{ headerShown: false }} />
  </UserStack.Navigator>
);

export default UserStackNavigator;