import React, { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { trainingPlans } from '../utils/exercises';

export default function PlanTracker(props) {
    const { plan, setShowPlans, handleStartPlanWorkout } = props
    return (
        <>
            <View style={[styles.flexRow, { borderColor: 'white', borderBottomWidth: 2, justifyContent: 'space-between' }]}>
                {/* <Text style={[styles.text, { color: '#818cf8', fontSize: 16, }]}>Current Plan</Text> */}
                <Text style={[styles.text, styles.headerText, { color: '#818cf8', fontSize: 12, padding: 10, textTransform: 'uppercase' }]}>&#62;&#62; Current Training Plan</Text>

                <TouchableOpacity onPress={() => setShowPlans(true)} activeOpacity={0.6} style={[styles.flexRow, { gap: 4, backgroundColor: '#eef2ff', padding: 10 }]}>
                    <Text style={[styles.text, { color: '#818cf8', fontSize: 16, }]}>Adjust</Text>
                    <Ionicons name="settings-outline" size={16} color={"#818cf8"} />
                </TouchableOpacity>

            </View>
            {/* <Text style={[styles.text, { color: '#818cf8', fontSize: 16, }]}>Current Plan</Text> */}
            <View style={[styles.flexRow, { justifyContent: 'space-between', padding: 10 }]}>
                <Text style={[styles.text, { fontSize: 30, color: '#818cf8', flex: 1 }]}>{plan.plan}</Text>
                <Ionicons name="flask-outline" size={30} color={"#818cf8"} />
            </View>
            <View style={[styles.flexRow, { gap: 10, borderColor: 'white', borderTopWidth: 2, alignItems: 'stretch' }]}>
                <View style={[styles.flexCol, { flex: 1, padding: 10 }]}>
                    <Text style={[styles.text, { fontSize: 14, color: '#818cf8', }]}>Days Completed  </Text>
                    <Text style={[styles.text, { fontSize: 20, color: '#818cf8', }]}>{plan.day}</Text>
                </View>
                <View style={[{ width: 2, backgroundColor: 'white' }]}></View>
                <View style={[styles.flexCol, { flex: 2, padding: 10 }]}>
                    <Text style={[styles.text, { fontSize: 14, color: '#818cf8', }]}>Next Workout  </Text>
                    <Text style={[styles.text, { fontSize: 20, color: '#818cf8', textTransform: 'capitalize' }]}>{trainingPlans[plan.plan].split[parseInt(plan.day % trainingPlans[plan.plan].split.length)].join(' + ')}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={handleStartPlanWorkout} activeOpacity={0.5} style={[styles.flexRow, { gap: 10, borderColor: 'white', padding: 10, borderTopWidth: 2, justifyContent: 'space-between' }]}>
                <Text style={[styles.text, { fontSize: 24, color: '#818cf8', }]}>Start Workout  </Text>
                <Ionicons name="chevron-forward-outline" size={24} color={"#818cf8"} />
            </TouchableOpacity>
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


//color combos
//#34d399 && #ecfdf5 green
//#eff6ff && #60a5fa blue
//#f472b6 && #fae8ff pink
//#facc15 && #fefce8 yellow
//#94a3b8 && #f0f9ff grey
//#818cf8 && #eef2ff indigo