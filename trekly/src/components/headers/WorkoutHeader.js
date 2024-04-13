import React from 'react';
import { View, StyleSheet } from 'react-native';
import StreakCounter from '../StreakCounter';
import useAuthStore from '../../store/authStore';

const WorkoutHeader = ({ navigation }) => {
  const currentUser = useAuthStore(state => state.currentUser);

  return (
    <View style={styles.header}>
      <StreakCounter size={25} user={currentUser} navigation={navigation} />
    </View>
  )
};


const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default WorkoutHeader;