import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, Button } from 'react-native';

import WorkoutHeader from '../../components/headers/WorkoutHeader';
import CustomButton from '../../components/CustomButton';
import RoutineContainer from '../../components/RoutineContainer';
import useAuthStore from '../../store/authStore';
import useWorkoutStore from '../../store/workoutStore';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';

const WorkoutScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { getUser } = useAuthStore();
  const currentUser = useAuthStore(state => state.currentUser);

  const handleUserFetch = useCallback(async () => {
    try {
      await performAuthenticatedOperation(async (token) => {
        await getUser(token); // Ensure getUser can optionally take a token and use it
      });
    } catch (error) {
      if (error.message === 'SessionExpired') {
        navigation.replace("Login");
      }
      console.error("Failed to fetch user data:", error);
    }
  }, [navigation]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await handleUserFetch();
    setRefreshing(false);
  }, [handleUserFetch]);

  useEffect(() => {
    handleUserFetch();
  }, [handleUserFetch]);

  const newRoutinePressed = () => {
    navigation.navigate("Routine");
  };

  const newWorkoutPressed = () => {
    navigation.navigate("WorkoutProcess");
    useWorkoutStore.getState().setIsWorkoutActive(true);
  };
  

  return (
    <View style={styles.root}>
      <WorkoutHeader navigation={navigation}/>
      <View style={styles.contentContainer}>
        <FlatList
          data={currentUser?.routines}
          keyExtractor={(item, index) => item?._id || String(index)}
          renderItem={({ item }) => (
            <RoutineContainer routine={item} navigation={navigation} />
          )}
          ListHeaderComponent={() => (
            <View style={styles.defaultPadding}>
              <CustomButton
                text="New Routine"
                onPress={newRoutinePressed}
                type="PRIMARY"
                icon_name="create-outline"
                textType="PRIMARY"
              />
              <Text style={styles.heading}>Your routines:</Text>
            </View>
          )}
          contentContainerStyle={styles.listContentContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
      <View style={styles.footer}>
        <CustomButton
          text="Start Empty Workout"
          onPress={newWorkoutPressed}
          type="SECONDARY"
          textType="PRIMARY"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  listContentContainer: {
    flexGrow: 1,
  },
  footer: {
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  defaultPadding: {
    paddingHorizontal: 20,
  },
});

export default WorkoutScreen;
