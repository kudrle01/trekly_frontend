import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AchievementNotification from '../components/AchievementNotification/AchievementNotification';

// Screens
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen/WorkoutScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

// Screen names
const homeName = "Home";
const workoutName = "Workout";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

const MainContainer = () => {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === homeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === workoutName) {
                            iconName = focused ? 'barbell' : 'barbell-outline';
                        } else if (route.name === profileName) {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        borderTopColor: '#a1a7aa',
                    },
                })}>
                <Tab.Screen name={homeName} component={HomeScreen} />
                <Tab.Screen name={workoutName} component={WorkoutScreen} />
                <Tab.Screen name={profileName} component={ProfileScreen} />
            </Tab.Navigator>
            <AchievementNotification />
        </View>
    );
};

export default MainContainer;