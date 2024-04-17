import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackNavigator from './AppStackNavigator';

const MyTheme = {
  colors: {
    background: '#fff'
  }
};

const Navigation = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <AppStackNavigator />
    </NavigationContainer>
  );
};

export default Navigation;