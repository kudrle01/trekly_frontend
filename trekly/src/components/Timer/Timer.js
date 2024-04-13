import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useWorkoutStore from '../../store/workoutStore';

const Timer = () => {
  const duration = useWorkoutStore(state => state.duration);
  const isWorkoutActive = useWorkoutStore(state => state.isWorkoutActive);

  useEffect(() => {
    let interval = null;

    if (isWorkoutActive) {
      interval = setInterval(() => {
        useWorkoutStore.getState().setDuration(duration + 1);
      }, 1000);
    } else if (!isWorkoutActive && duration !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive, duration]);

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{new Date(duration * 1000).toISOString().substr(11, 8)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    padding: 10,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Timer;
