import { StatusBar } from 'expo-status-bar';
import { useState, useCallback, useEffect } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Training from './components/Training';
import Preferences from './components/Preferences';


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    'Andy': require('./assets/fonts/Andy_Std_Bold.otf'),
    'Press': require('./assets/fonts/Terminal.ttf'),
    // 'Press': require('./assets/fonts/PressStart2P.ttf'),
  });

  const [view, setView] = useState(0)
  const [loadedStorage, setLoadedStorage] = useState(false)


  function handleUpdateView(viewIndex) {
    return () => setView(viewIndex)
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem('@storage_Key')
  //       if (jsonValue != null) {
  //         let data = JSON.parse(jsonValue)

  //       }
  //       setLoadedStorage(true)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  //   // getData()
  // }, [])

  // useEffect(() => {
  //   const storeData = async () => {
  //     try {
  //       const jsonValue = JSON.stringify({})
  //       await AsyncStorage.setItem('@storage_Key', jsonValue)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  //   storeData()
  // }, [])

  if (!fontsLoaded) {
    return null
  }


  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <ScrollView>
        <View style={styles.viewContainer}>
          {view === 0 && <Home />}
          {view === 1 && <Training />}
          {view === 2 && <Preferences />}
        </View>
      </ScrollView>
      <NavBar view={view} handleUpdateView={handleUpdateView} />
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
  },
  viewContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    gap: 10
  },
});
