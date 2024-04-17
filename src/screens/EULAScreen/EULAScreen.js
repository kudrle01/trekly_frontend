import React from 'react';
import { Text, StyleSheet, ScrollView, Button, View, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EULAScreen = ({ navigation }) => {
  const acceptEULA = async () => {
    await AsyncStorage.setItem('EULAAccepted', 'true');
    navigation.navigate('UserStack');
  };

  const openEULA = () => {
    const url = 'http://trekly.euweb.cz/EULA/';
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <View style={styles.textBlock}>
        <Text style={styles.text}>
          Please read and accept our <Text style={styles.link} onPress={openEULA}>End User License Agreement</Text> before continuing to use the app.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="View EULA" onPress={openEULA} color="#007AFF" />
        <Button title="Accept Terms" onPress={acceptEULA} color="#007AFF" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  textBlock: {
    padding: 10, 
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333'
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 20
  }
});

export default EULAScreen;
