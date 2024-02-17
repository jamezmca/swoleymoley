import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { workouts, trainingPlans } from '../utils/exercises';
import PlanTracker from './PlanTracker';
import { generateWorkout } from '../utils/generate';

export default function Home(props) {
    const { toggleMuscles, workout, setWorkout, scheme, setScheme, muscles, leftDecimal, setLeftDecimal, plan, setPlan, planDay, setPlanDay, handleSetWOD, handleSetPlan, numWorkouts, handleStartPlanWorkout } = props

    //display streak, stats, choose plan / continue plan, generate workout

    //choose a training plan || start / continue with training plan + current stats in training plan + next workout + all that stuff || change training plan

    //browse the training plans in little 2x2 grid of squares

    const [swipeWidth, setSwipeWidth] = useState(0)
    const [showPlans, setShowPlans] = useState(false)

    return (
        <>
            <View style={[styles.flexCol, { padding: 10, backgroundColor: '#eff6ff', borderRadius: 10 }]}>
                <View style={[styles.flexRow, { paddingBottom: 10 }]}>
                    <Text style={[styles.text, styles.headerText, { fontSize: 20, color: '#60a5fa', flex: 1, fontWeight: 600 }]}>⭐️ WELCOME BACK ⭐️</Text>
                    <View style={[styles.flexCol, { borderLeftWidth: 2, borderColor: 'white', paddingLeft: 10, }]}>
                        <Text style={[styles.text, { fontSize: 26 }]}>{numWorkouts}🔥</Text>
                        <Text style={[styles.text, { fontSize: 10 }]}>Num Workouts</Text>
                    </View>
                </View>
                <View style={[styles.flexRow, { gap: 10, borderTopWidth: 2, borderColor: 'white', paddingTop: 10 }]}>
                    <TouchableOpacity style={[{ padding: 4 }]}>
                        <Ionicons name="bookmark-outline" size={24} color={"#60a5fa"} />
                    </TouchableOpacity>
                    <Text style={[styles.text, { color: '#60a5fa', fontSize: 16, flex: 1, flexWrap: 'wrap' }]}>You can view all your past training workouts inside of the History tab! </Text>
                </View>
            </View>


            {/* IN HERE HAVE THE OPTIONAL WEIGHT TRACKER AND GRAPH & GYM GOALS INSIDE OF A BLUE BORDER WHITE BACKGROUND SECTION */}

            <View style={[styles.flexCol, { borderRadius: 10, backgroundColor: '#ecfdf5', overflow: 'hidden' }]}>

                {(!plan.plan || showPlans) ? (
                    <>
                        {(plan.plan) && (
                            <View style={[styles.flexRow, { borderColor: 'white', borderBottomWidth: 2, justifyContent: 'space-between' }]}>
                                {/* <Text style={[styles.text, { color: '#818cf8', fontSize: 16, }]}>Current Plan</Text> */}
                                <Text style={[styles.text, styles.headerText, { color: '#818cf8', fontSize: 12, padding: 10, textTransform: 'uppercase' }]}>&#62;&#62; Adjust Training Plan</Text>

                                <TouchableOpacity onPress={() => {
                                    setShowPlans(false)
                                }} activeOpacity={0.6} style={[styles.flexRow, { gap: 4, backgroundColor: '#eef2ff', padding: 10 }]}>
                                    <Text style={[styles.text, { color: '#818cf8', fontSize: 16, }]}>Cancel</Text>
                                    <Ionicons name="settings-outline" size={16} color={"#818cf8"} />
                                </TouchableOpacity>
                            </View>
                        )}
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
                                    <TouchableOpacity onPress={() => {
                                        setShowPlans(false)
                                        handleSetPlan(plan)
                                    }} activeOpacity={0.5} key={planIndex} style={[styles.flexRow, { gap: 10, borderColor: 'white', padding: 10, borderBottomWidth: 2, }]}>
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

                    </>
                ) : (
                    <PlanTracker handleStartPlanWorkout={handleStartPlanWorkout} plan={plan} showPlans={showPlans} setShowPlans={setShowPlans} />
                )}
            </View>



            <View style={[styles.flexCol, { borderRadius: 10, backgroundColor: '#fefce8', }]}>
                <View style={[styles.flexCol, { padding: 10 }]}>

                    <View style={[styles.flexRow, { justifyContent: 'space-between', }]}>
                        <Text style={[styles.text, { fontSize: 30, color: '#f472b6', flex: 1 }]}>Workout Builder</Text>
                        <Ionicons name="flash-outline" size={30} color={"#f472b6"} />
                    </View>
                    <Text style={[styles.text, { color: '#f472b6', fontSize: 16 }]}>✦ Build a swoleymoley workout to annihilate your muscles & guarantee maximal growth.</Text>
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
                        <View style={[styles.flexCol, { gap: 6 }]}>
                            <View style={[styles.flexRow, { gap: 6, flex: 1 }]}>
                                {Object.keys(workouts).slice(0, 2).map((ele, workoutIndex) => {
                                    return (
                                        <View key={workoutIndex} style={[styles.flexCol, { flex: 1 }]}>
                                            <TouchableOpacity onPress={() => setWorkout(ele)} style={[styles.flexRow, { justifyContent: 'center', backgroundColor: ele === workout ? '#f472b6' : 'white', paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#fbcfe8', }]}>
                                                <Text style={[styles.text, { textTransform: 'capitalize', color: ele === workout ? 'white' : '#f472b6' }]}>{ele.replaceAll('_', ' ')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
                            <View style={[styles.flexRow, { gap: 6, flex: 1 }]}>
                                {Object.keys(workouts).slice(2).map((ele, workoutIndex) => {
                                    return (
                                        <View key={workoutIndex} style={[styles.flexCol, { flex: 1 }]}>
                                            <TouchableOpacity onPress={() => setWorkout(ele)} style={[styles.flexRow, { justifyContent: 'center', backgroundColor: ele === workout ? '#f472b6' : 'white', paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#fbcfe8', }]}>
                                                <Text style={[styles.text, { textTransform: 'capitalize', color: ele === workout ? 'white' : '#f472b6' }]}>{ele.replaceAll('_', ' ')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
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
                            {(workout === 'individual' ? workouts?.[workout] : Object.keys(workouts?.[workout]) || []).map((muscleGroup, muscleGroupIndex) => {
                                return (
                                    <TouchableOpacity onPress={() => toggleMuscles(muscleGroup)} key={muscleGroupIndex} style={[styles.flexRow, { flexGrow: 1, justifyContent: 'center', backgroundColor: muscles.includes(muscleGroup) ? '#f472b6' : 'white', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#fbcfe8', }]}>
                                        <Text style={[styles.text, { textTransform: 'capitalize', color: muscles.includes(muscleGroup) ? 'white' : '#f472b6', }]}>{muscleGroup.replaceAll('_', ' ')}</Text>
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
                            <TouchableOpacity onLayout={(e) => {
                                const { x, y, width, height } = e.nativeEvent.layout;
                                setSwipeWidth(width)
                                setLeftDecimal(0.5)
                            }} onPress={(e) => {
                                // console.log(e.nativeEvent.locationX, swipeWidth)
                                let xCoord = e.nativeEvent.locationX
                                setLeftDecimal(xCoord / swipeWidth)
                            }} activeOpacity={1} style={[{ borderWidth: 1, borderColor: '#fbcfe8', backgroundColor: 'white', height: 34, borderRadius: 6, position: 'relative', }]}>
                                <View style={[{ width: 2, backgroundColor: '#f472b6', borderRadius: 2, position: 'absolute', top: 4, bottom: 4, transform: [{ translateX: -1.5, }], left: `${leftDecimal * 100}%` || '50%' }]}></View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={handleSetWOD} activeOpacity={0.5} style={[styles.flexRow, { justifyContent: 'center', padding: 10, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#f472b6' }]}>
                            <Text style={[styles.text, { color: '#f472b6', fontSize: 24 }]}>Formulate</Text>
                        </TouchableOpacity>
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