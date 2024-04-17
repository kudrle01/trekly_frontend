import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const GenderSelectionScreen = ({ navigation }) => {
  const [gender, setGender] = useState('male');

  const handleNext = () => {
    navigation.navigate('BirthDateSelection', { gender });
  };

  return (
    <View style={styles.container}>
      <View style={styles.centered_view}>
        <Text style={styles.title}>You are:</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
      <Button title="Next" onPress={handleNext} color="#000"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centered_view: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
  picker: {
    marginBottom: 50,
  },
});

export default GenderSelectionScreen;
