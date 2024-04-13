import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform, View, Image, useWindowDimensions, BackHandler } from 'react-native';
import Navigation from './src/navigation';
import { loadBodyParts, loadEquipment } from './src/services/utilities/utility';
import Logo from './assets/logo/logo.png';

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const { height } = useWindowDimensions();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load all the data asynchronously
        await Promise.all([
          loadBodyParts(),
          loadEquipment()
        ]);
      } catch (error) {
        console.error("Failed to load data", error);
        BackHandler.exitApp();
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor('white');
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

  if (isLoading) {
    // Display the loader if data is still loading
    return (
      <View style={styles.loaderContainer}>
        <Image source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode='contain'
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
        <StatusBar style='dark' />
        <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App;
