import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { workouts } from '../utils/exercises';

export default function Home() {
    //display streak, stats, choose plan / continue plan, generate workout

    //choose a training plan || start / continue with training plan + current stats in training plan + next workout + all that stuff || change training plan

    //browse the training plans in little 2x2 grid of squares

    // const []

    let trainingPlans = {
        '🧪 Bro Split': {
            description: 'A balanced 4 day cycle of push (chest, shoulders), pull (back, shoulders), arms (tris & bis) & legs (glutes, quads, hammies & calves).'
        },
        '🍑 Glutelicious': {
            description: 'A leg dominant training plan to prioritise the growth of your glutes, quads and hammies for volumptious legs, with a hint of upper body.'
        },
        '⚡️ Bodyweight': {
            description: 'Build a physique with your body weight alone - great for getting started with training or developing an extremely athletic physique.'
        }

    }

    return (
        <>
            <View style={[styles.flexCol, { padding: 10, backgroundColor: '#eff6ff', borderRadius: 10 }]}>
                <View style={[styles.flexRow, { paddingBottom: 10 }]}>
                    <Text style={[styles.text, styles.headerText, { fontSize: 20, color: '#60a5fa', flex: 1, fontWeight: 600 }]}>⭐️ WELCOME BACK ⭐️</Text>
                    <View style={[styles.flexCol, { borderLeftWidth: 2, borderColor: 'white', paddingLeft: 10, }]}>
                        <Text style={[styles.text, { fontSize: 26 }]}>24🔥</Text>
                        <Text style={[styles.text, { fontSize: 10 }]}>Num Workouts</Text>
                    </View>
                </View>
                <View style={[styles.flexRow, { gap: 10, borderTopWidth: 2, borderColor: 'white', paddingTop: 10 }]}>
                    <TouchableOpacity style={[{ padding: 4 }]}>
                        <Ionicons name="settings-outline" size={24} color={"#60a5fa"} />
                    </TouchableOpacity>
                    <Text style={[styles.text, { color: '#60a5fa', fontSize: 16, flex: 1, flexWrap: 'wrap' }]}>You can update your training plan & other settings at any time in your Preferences. </Text>
                </View>
            </View>


            {/* IN HERE HAVE THE OPTIONAL WEIGHT TRACKER AND GRAPH & GYM GOALS INSIDE OF A BLUE BORDER WHITE BACKGROUND SECTION */}

            <View style={[styles.flexCol, { borderRadius: 10, backgroundColor: '#ecfdf5', }]}>
                <View style={[styles.flexCol, { padding: 10 }]}>

                    <View style={[styles.flexRow, { justifyContent: 'space-between', }]}>
                        <Text style={[styles.text, { fontSize: 30, color: '#818cf8', flex: 1 }]}>Training Plans</Text>
                        <Ionicons name="flask-outline" size={30} color={"#818cf8"} />
                    </View>
                    <Text style={[styles.text, { color: '#818cf8', fontSize: 16, }]}>✦ Training plans help you coordinate and schedule muscular assults so to reap unholy gains. </Text>
                </View>
                <View style={[styles.flexCol, { marginTop: 10, borderColor: 'white', borderTopWidth: 2, }]}>
                    {Object.keys(trainingPlans).map((plan, planIndex) => {
                        return (
                            <TouchableOpacity activeOpacity={0.5} key={planIndex} style={[styles.flexRow, { gap: 10, borderColor: 'white', padding: 10, borderBottomWidth: 2, }]}>
                                <View style={[styles.flexCol, { flex: 1 }]}>
                                    <Text style={[styles.text, { fontSize: 22, color: '#818cf8', }]}>{plan}  </Text>
                                    <Text style={[styles.text, { fontSize: 14, color: '#818cf8', }]}>{trainingPlans[plan].description}</Text>
                                </View>
                                <View style={[{ padding: 4 }]}>
                                    <Ionicons name="chevron-forward-outline" size={24} color={"#818cf8"} />
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>



            <View style={[styles.flexCol, { borderRadius: 10, backgroundColor: '#fefce8', }]}>
                <View style={[styles.flexCol, { padding: 10 }]}>

                    <View style={[styles.flexRow, { justifyContent: 'space-between', }]}>
                        <Text style={[styles.text, { fontSize: 30, color: '#f472b6', flex: 1 }]}>Workout Builder</Text>
                        <Ionicons name="flash-outline" size={30} color={"#f472b6"} />
                    </View>
                    <Text style={[styles.text, { color: '#f472b6', fontSize: 16 }]}>✦ Build a swoleymoley workout to annihilate your muscles & guarantee maximumal growth.</Text>
                </View>
                <View style={[styles.flexCol, { marginTop: 10, borderColor: 'white', borderTopWidth: 2, gap: 10 }]}>
                    <View style={[styles.flexCol, { flex: 1, gap: 10, borderColor: 'white', padding: 10, borderBottomWidth: 2, }]}>
                        <View style={[styles.flexCol]}>
                            <View style={[styles.flexRow, { gap: 10, alignItems: 'flex-end' }]}>
                                <Text style={[styles.text, styles.headerText, { fontSize: 24, color: '#fbcfe8', }]}>01</Text>
                                <Text style={[styles.text, { fontSize: 22, color: '#f472b6', }]}>Pick your poison</Text>
                            </View>
                            <Text style={[styles.text, { fontSize: 14, color: '#f472b6', }]}>&rarr; Select the workout you wish to endure.</Text>
                        </View>
                        <View style={[styles.flexRow, { flexWrap: 'wrap', gap: 6 }]}>
                            {Object.keys(workouts).map((workout, workoutIndex) => {
                                return (
                                    <TouchableOpacity key={workoutIndex}>
                                        <Text style={[styles.text, { textTransform: 'capitalize', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#fbcfe8', color: workoutIndex === 0 ? 'white' : '#f472b6', backgroundColor: workoutIndex === 0 ? '#f472b6' : 'white' }]}>{workout.replaceAll('_', ' ')}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={[styles.flexCol, { flex: 1, gap: 10, borderColor: 'white', padding: 10, borderBottomWidth: 2, }]}>
                        <View style={[styles.flexCol]}>
                            <View style={[styles.flexRow, { gap: 10, alignItems: 'flex-end' }]}>
                                <Text style={[styles.text, styles.headerText, { fontSize: 24, color: '#fbcfe8', }]}>02</Text>
                                <Text style={[styles.text, { fontSize: 22, color: '#f472b6', }]}>Lock on targets</Text>
                            </View>
                            <Text style={[styles.text, { fontSize: 14, color: '#f472b6', }]}>&rarr; Select the muscles judged for annihilation.</Text>
                        </View>
                        <View style={[styles.flexRow, { flexWrap: 'wrap', gap: 6 }]}>
                            {(workouts?.['individual'] || []).map((muscleGroup, muscleGroupIndex) => {
                                return (
                                    <TouchableOpacity key={muscleGroupIndex}>
                                        <Text style={[styles.text, { textTransform: 'capitalize', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#fbcfe8', color: muscleGroupIndex === 0 ? 'white' : '#f472b6', backgroundColor: muscleGroupIndex === 0 ? '#f472b6' : 'white' }]}>{muscleGroup.replaceAll('_', ' ')}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={[styles.flexCol, { flex: 1, gap: 10, borderColor: 'white', padding: 10, borderBottomWidth: 2, }]}>
                        <View style={[styles.flexCol]}>
                            <View style={[styles.flexRow, { gap: 10, alignItems: 'flex-end' }]}>
                                <Text style={[styles.text, styles.headerText, { fontSize: 24, color: '#fbcfe8', }]}>03</Text>
                                <Text style={[styles.text, { fontSize: 22, color: '#f472b6', }]}>Become juggernaut</Text>
                            </View>
                            <Text style={[styles.text, { fontSize: 14, color: '#f472b6', }]}>&rarr; Select your ultimate objective.</Text>
                        </View>
                        <View style={[styles.flexCol]}>
                            <View style={[styles.flexRow]}>
                                <Text style={[styles.text, { color: '#f472b6', fontSize: 14, }]}>Strength</Text>
                                <Text style={[styles.text, { color: '#f472b6', fontSize: 14, flex: 1, textAlign: 'center' }]}>Growth</Text>
                                <Text style={[styles.text, { color: '#f472b6', fontSize: 14, }]}>Endurance</Text>
                            </View>
                            <TouchableOpacity onPress={(e) => {
                                console.log(e.nativeEvent.locationX, )
                            }} activeOpacity={1} style={[{ borderWidth: 1, borderColor: '#fbcfe8', backgroundColor: 'white', height: 34, borderRadius: 6, position: 'relative', }]}>
                                <View style={[{ width: 2, backgroundColor: '#f472b6', borderRadius: 2, position: 'absolute', top: 4, bottom: 4, transform: [{ translateX: -1.5, }], left: '50%' || '50%' }]}></View>

                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>



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