import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomButton = ({ onPress, text, type, textType, icon_name, hidden, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles[`container_${type}`], style]}
      onPress={onPress}
    >
      <Ionicons
        name={icon_name}
        size={20}
        style={[styles.icon, styles[`icon_${hidden}`], textStyle, styles[`text_${textType}`]]} />
      <Text
        style={[styles.text, textStyle, styles[`text_${textType}`]]}>{text}
        </Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  },

  container_PRIMARY: {
    justifyContent: 'flex-start',
    marginVertical: 10,
    backgroundColor: '#000',
  },
  
  container_SECONDARY: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  container_TERTIARY: {
    justifyContent: 'center',
  },

  text: {
    fontWeight: 'bold',
  },

  icon: {
    marginRight: 10
  },

  icon_hidden: {
    display: 'none',
  },

  text_PRIMARY: {
    color: '#fff',
  },

  text_REGISTER: {
    textDecorationLine: 'underline',
    fontSize: 15
  },
});

export default CustomButton;