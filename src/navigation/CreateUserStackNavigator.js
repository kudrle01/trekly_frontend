import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GenderSelectionScreen from '../screens/GenderSelectionScreen/GenderSelectionScreen';
import BirthDateSelectionScreen from '../screens/BirthDateSelectionScreen/BirthDateSelectionScreen';
import RegistrationScreen from '../screens/RegistrationScreen/RegistrationScreen';


const CreateUserStack = createNativeStackNavigator();

const CreateUserStackNavigator = () => (
  <CreateUserStack.Navigator
    initialRouteName="GenderSelection"
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <CreateUserStack.Screen name="GenderSelection" component={GenderSelectionScreen} />
    <CreateUserStack.Screen name="BirthDateSelection" component={BirthDateSelectionScreen} />
    <CreateUserStack.Screen name="Registration" component={RegistrationScreen} />
  </CreateUserStack.Navigator>
);

export default CreateUserStackNavigator;