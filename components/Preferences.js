import React, { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Preferences(props) {
  const { setWod, setView, setMuscles, setWorkout } = props
  //allow people to enter weight (enable a weight tracker feature which shows on main screen and prompts to enter weight) and height
  //expertise, goals (strength, endurance, mobility), at home / at gym
  // enable gym goals (also displays on main screen)

  // at the bottom allow people to enable pro features which includes custom workout builder, following & sharing workouts & have register your interest part

  // FOR NOW IS JUST HISTORY

  const [history, setHistory] = useState([])
  const [showOptions, setShowOptions] = useState(null)

  useEffect(() => {
    async function getHistory() {
      let history_arr = await AsyncStorage.getItem('swoley-history')
      if (history_arr) {
        history_arr = JSON.parse(history_arr).history_arr
        setHistory(history_arr)
      }
    }
    getHistory()
  }, [])

  async function handleStartWorkout(workout_obj) {
    let { muscles, workout, wod } = workout_obj
    await AsyncStorage.setItem('swoley-workout', JSON.stringify({ wod, muscles, workout }))
    setWod(wod)
    setView(1)
  }

  async function handleDeleteWorkout(index) {
    let filtered_history = history.filter((val, val_index) => {
      return index !== val_index
    })
    setHistory(filtered_history)
    await AsyncStorage.setItem('swoley-history', JSON.stringify({ history_arr: filtered_history }))
    await AsyncStorage.setItem('swoley-history-count', JSON.stringify({ count: filtered_history.length }))
  }



  return (
    <>
      <View style={[styles.flexRow, { justifyContent: 'space-between', gap: 10, backgroundColor: '#eff6ff', padding: 10, borderRadius: 10 }]}>
        <Text style={[styles.text, styles.headerText, { fontSize: 20, color: '#60a5fa', flex: 1, fontWeight: 600, textTransform: 'uppercase' }]}>&#62;&#62; Training Logs
        </Text>
        <Text style={[styles.text, { fontSize: 20, color: '#60a5fa' }]}>{history.length}🔥</Text>
      </View>
      {history.length === 0 && (
        <Text style={[styles.text, { color: '#60a5fa', fontSize: 20, textAlign: 'center', paddingTop: 40 }]}>You have no saved workouts!</Text>
      )}
      {history.map((val, valIndex) => {
        return (
          <View key={valIndex} style={[styles.flexCol, { gap: 10 }]}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => { setShowOptions(valIndex) }} style={[styles.flexCol, { gap: 10, borderColor: '#eff6ff', borderRadius: 10, padding: 10, borderWidth: 1 }]}>
              <View style={[styles.flexRow, { gap: 10, justifyContent: 'space-between' }]}>
                <Text style={[styles.text, { color: '#60a5fa', fontSize: 16 }]}>{val.date.split('T')[0]}</Text>
                <Text style={[styles.text, { color: '#60a5fa', textTransform: 'capitalize', fontSize: 16 }]}>{[...Array(parseInt(val.rating)).keys()].reduce((acc, curr) => { return acc + '⭐️' }, '')}</Text>
              </View>
              <Text style={[styles.text, { color: '#60a5fa', textTransform: 'capitalize', fontSize: 24 }]}>{val.workout.replaceAll('_', ' ')} ({val.muscles.join(' ')})</Text>
              {val?.plan?.plan && (<Text style={[styles.text, { color: '#60a5fa', fontSize: 20 }]}>Plan &rarr; {val?.plan?.plan}</Text>)}
            </TouchableOpacity>
            {showOptions === valIndex && (
              <View style={[styles.flexRow, { gap: 10 }]}>
                <TouchableOpacity onPress={() => { handleDeleteWorkout(valIndex) }} activeOpacity={0.8} style={[styles.flexRow, { justifyContent: 'center', padding: 10, borderRadius: 10, }]}>
                  <Text style={[styles.text, styles.headerText, { color: '#60a5fa', textTransform: 'uppercase', fontSize: 16 }]}>
                    <Ionicons name="trash-outline" size={28} color={"#fb7185"} />
                  </Text>
                </TouchableOpacity>
                {val.rating > 3 && (
                  <TouchableOpacity onPress={() => { handleStartWorkout(val) }} activeOpacity={0.8} style={[styles.flexRow, { justifyContent: 'center', padding: 10, borderRadius: 10, backgroundColor: '#eff6ff', flex: 1 }]}>
                    <Text style={[styles.text, styles.headerText, { color: '#60a5fa', textTransform: 'uppercase', fontSize: 16 }]}>Start Workout</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View >
        )
      })}
    </>
  )
}

export const styles = StyleSheet.create({
  flexCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: '#020617',
    fontFamily: 'Andy'
  },
  headerText: {
    fontFamily: 'Press'
  }
})