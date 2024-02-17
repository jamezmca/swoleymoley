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
import { trainingPlans, workouts } from './utils/exercises';
import { generateWorkout } from './utils/generate';

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
  const [workout, setWorkout] = useState(Object.keys(workouts)[0])
  const [muscles, setMuscles] = useState([])
  // const [scheme, setScheme] = useState('growthHypertrophy')
  const [leftDecimal, setLeftDecimal] = useState(0.5) // x / width
  const [wod, setWod] = useState([])
  const [plan, setPlan] = useState({})
  const [planDay, setPlanDay] = useState(0)
  const [numWorkouts, setNumWorkouts] = useState(0)

  async function handleSetWOD(input) {
    let scheme = leftDecimal > 0.66 ? 'cardiovascularEndurance' : leftDecimal < 0.33 ? 'strengthPower' : 'growthHypertrophy'
    if (!muscles.length) { return }
    let new_workout = generateWorkout({ muscles, workout, scheme })
    await AsyncStorage.setItem('swoley-workout', JSON.stringify({ wod: new_workout, muscles, workout }))
    setWod(new_workout)
    setView(1)
  }

  async function handleStartPlanWorkout() {
    let scheme = Math.random() < 0.75 ? 'growthHypertrophy' : 'cardiovascularEndurance'
    let plan_cycle_day = plan.day % trainingPlans[plan.plan].split.length
    let plan_muscles = trainingPlans[plan.plan].split[plan_cycle_day]
    let new_workout = generateWorkout({ muscles: plan_muscles, workout: 'individual', scheme })
    await AsyncStorage.setItem('swoley-workout', JSON.stringify({ wod: new_workout, muscles: plan_muscles, workout: 'individual', plan }))
    setWod(new_workout)
    setView(1)
  }

  async function handleSetPlan(inputPlan) {
    let new_plan_obj = { plan: inputPlan, day: 0 }
    await AsyncStorage.setItem('swoley-plan', JSON.stringify(new_plan_obj))
    setPlan(new_plan_obj)
  }

  function handleUpdateView(viewIndex) {
    return () => {
      if (viewIndex === 1 & !wod.length) { return }
      setView(viewIndex)
    }
  }

  function toggleMuscles(newMuscle) {
    if (muscles.includes(newMuscle)) {
      setMuscles(muscles.filter(val => val !== newMuscle))
      return
    }

    if (muscles.length === 3) {
      return
    }

    setMuscles([...muscles, newMuscle])
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      await AsyncStorage.clear()
      let saved_workout = await AsyncStorage.getItem('swoley-workout')
      let num_workouts = await AsyncStorage.getItem('swoley-history-count')
      let swoley_plan = await AsyncStorage.getItem('swoley-plan')
      if (saved_workout) {
        let parsed_workout = JSON.parse(saved_workout)
        parsed_workout.length !== 0 && setWod(parsed_workout.wod)
        setMuscles(parsed_workout.muscles || [])
        setWorkout(parsed_workout.workout || Object.keys(workouts)[0])
      }
      if (num_workouts) {
        setNumWorkouts(JSON.parse(num_workouts).count)
      }
      if (swoley_plan) {
        setPlan(JSON.parse(swoley_plan))
      }
    }
  }, [fontsLoaded]);

  useEffect(() => {
    setMuscles([])
  }, [workout])



  if (!fontsLoaded) {
    return null
  }


  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <ScrollView >
        <View style={styles.viewContainer}>
          {view === 0 && <Home handleStartPlanWorkout={handleStartPlanWorkout} numWorkouts={numWorkouts} handleSetWOD={handleSetWOD} toggleMuscles={toggleMuscles} workout={workout} setWorkout={setWorkout} muscles={muscles} leftDecimal={leftDecimal} handleSetPlan={handleSetPlan} setLeftDecimal={setLeftDecimal} plan={plan} setPlan={setPlan} planDay={planDay} setPlanDay={setPlanDay} />}
          {view === 1 && <Training plan={plan} setPlan={setPlan} wod={wod} workout={workout} muscles={muscles} setView={setView} />}
          {view === 2 && <Preferences setWod={setWod} setView={setView} setMuscles={setMuscles} setWorkout={setWorkout} />}
        </View>
      </ScrollView>
      <NavBar view={view} handleUpdateView={handleUpdateView} wod={wod} />
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
    gap: 10,
  },
});

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