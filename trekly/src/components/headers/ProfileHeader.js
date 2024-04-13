import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileHeader = ({ navigation }) => {

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => { navigation.navigate("Notifications") }}>
        <Ionicons name="notifications-outline" size={25} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate("Settings") }}>
        <Ionicons name="settings-outline" size={25} />
      </TouchableOpacity>
    </View>
  )
};


const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },

  streak_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  streak_number: {
    fontSize: 25,
    color: '#a1a7aa'
  }
});

export default ProfileHeader;