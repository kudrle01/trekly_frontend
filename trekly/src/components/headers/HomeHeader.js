import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StreakCounter from '../StreakCounter';
import useAuthStore from '../../store/authStore';

const HomeHeader = ({ feedType, onPeopleIconPress, navigation, isFeedLoading }) => {
  const currentUser = useAuthStore(state => state.currentUser);

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPeopleIconPress} disabled={isFeedLoading}>
          <Ionicons name={feedType === 'global' ? "globe-outline" : "people-circle-outline"} size={25} />
        </TouchableOpacity>
        <TouchableOpacity>
          <StreakCounter size={25} user={currentUser} navigation={navigation} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("SearchUser") }}>
          <Ionicons name="search-outline" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.heading]}>{feedType === 'global' ? "Global news feed" : "Followed news feed"}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    height: 60,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20
  },
  heading: {
    color: '#333',
  },
});

export default HomeHeader;
