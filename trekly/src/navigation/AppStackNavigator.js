import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RoutineScreen from '../screens/RoutineScreen/RoutineScreen';
import MainContainer from './MainContainer';
import UserStackNavigator from './UserStackNavigator';
import AddExerciseScreen from '../screens/AddExerciseScreen/AddExerciseScreen';
import WorkoutProcessScreen from '../screens/WorkoutProcessScreen/WorkoutProcessScreen';
import FinishWorkoutScreen from '../screens/FinishWorkoutScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import ExerciseInfoScreen from '../screens/ExerciseInfoScreen/ExerciseInfoScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingScreen';
import SearchUserScreen from '../screens/SearchUserScreen/SearchUserScreen';
import UserProfileScreen from '../screens/UserProfileScreen/UserProfileScreen';
import AboutScreen from '../screens/AboutScreen/AboutScreen';
import InfoScreen from '../screens/InfoScreen/InfoScreen';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';
import WorkoutPostScreen from '../screens/WorkoutPostScreen/WorkoutPostScreen';
import StreakScreen from '../screens/StreakScreen/StreakScreen';
import EULAScreen from '../screens/EULAScreen/EULAScreen';


const AppStack = createNativeStackNavigator();

const AppStackNavigator = () => {
    return (
        <AppStack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_bottom',
            }}>

            <AppStack.Screen
                name="Splash"
                component={SplashScreen}
                options={{
                    gestureEnabled: false,
                    headerLeft: () => null
                }} />
            <AppStack.Screen
                name="EULA"
                component={EULAScreen} />
            <AppStack.Screen
                name="UserStack"
                component={UserStackNavigator}
                options={{ headerShown: false }} />

            <AppStack.Screen
                name="MainContainer"
                component={MainContainer}
                options={{
                    gestureEnabled: false,
                    headerLeft: () => null
                }}
            />
            <AppStack.Screen
                name="Routine"
                component={RoutineScreen}
                options={{
                    gestureEnabled: false,
                    headerLeft: () => null
                }}
            />
            <AppStack.Screen
                name="AddExercise"
                component={AddExerciseScreen}
            />
            <AppStack.Screen
                name="WorkoutProcess"
                component={WorkoutProcessScreen}
                options={{
                    gestureEnabled: false,
                    headerLeft: () => null
                }}
            />
            <AppStack.Screen
                name="FinishWorkout"
                component={FinishWorkoutScreen}
                options={{
                    animation: 'slide_from_right',
                }}
            />
            <AppStack.Screen
                name="ExerciseInfo"
                component={ExerciseInfoScreen}
                options={{
                    animation: 'slide_from_right',
                }}
            />
            <AppStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    animation: 'slide_from_right',
                }}
            />
            <AppStack.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{
                    animation: 'slide_from_right',
                }}
            />
            <AppStack.Screen
                name="WorkoutPost"
                component={WorkoutPostScreen}
                options={{
                    animation: 'slide_from_right',
                }}
            />
            <AppStack.Screen
                name="SearchUser"
                component={SearchUserScreen}
                options={{
                    animation: 'slide_from_right',
                }}
            />
            <AppStack.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={{
                    animation: 'slide_from_right',
                }}
            />

            <AppStack.Screen
                name="About"
                component={AboutScreen}
                options={{
                    animation: 'slide_from_right',
                }}
            />

            <AppStack.Screen
                name="Info"
                component={InfoScreen}
                options={{
                    animation: 'slide_from_right',
                }}
            />
            <AppStack.Screen
                name="Streak"
                component={StreakScreen}
            />
        </AppStack.Navigator>
    );
};

export default AppStackNavigator;
