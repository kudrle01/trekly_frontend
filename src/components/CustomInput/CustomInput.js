import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, type }) => {
  return (
    <View style={styles[`container_${type}`]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={[styles.input ,styles[`input_${type}`]]}
        secureTextEntry={secureTextEntry} 
        autoCapitalize="none"
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container_PRIMARY: {
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
  },

  container_SECONDARY: {
    width: '100%',
    marginVertical: 5,
    flexDirection: 'row',
    borderBottomWidth: 2,
    paddingBottom: 10,
    borderColor: '#a1a7aa',
  },

  input: {
    width: '100%'
  },

  input_PRIMARY: {

  },

  input_SECONDARY: {
    fontSize: 30
  }
})

export default CustomInput;