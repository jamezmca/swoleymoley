import React, { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { tempWorkout } from '../utils/generate'

//if no workout, show plan selection and generator, otherwise show current workout and have exercise tracker (01, 02, 03, sets & name) up top with most of the page being the exercise

//exercise
//muscle groups
//sets & reps 
// rest

//exercise description & click alternatives

function ExerciseToggle(props) {
    const { ele, eleIndex, selectedExercise, setSelectedExercise } = props

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => setSelectedExercise(eleIndex)} style={[styles.flexCol, { justifyContent: 'center', flex: 1, padding: 4, backgroundColor: selectedExercise === eleIndex ? '#60a5fa' : '#eff6ff', }]}>
            <Text numberOfLines={3} style={[styles.text, { textTransform: 'capitalize', color: selectedExercise !== eleIndex ? '#60a5fa' : 'white', fontSize: 16 }]}>{eleIndex + 1}. {ele.name.replaceAll('_', ' ')}</Text>
            {/* <View style={[styles.flexRow, { gap: 4 }]}>
                {[...Array(5)].map((val, setIndex) => {
                    return (
                        <View key={setIndex} style={[{ height: 1, position: 'relative', backgroundColor: selectedExercise === eleIndex ? 'white' : '#60a5fa', flex: 1 }]}>

                        </View>
                    )
                })}
            </View> */}

            {/* CHANGE TO GREEN WHEN COMPLETE */}
        </TouchableOpacity>
    )
}

function DetailBox(props) {
    const { title, value, color, bgColor, func } = props
    const [timeLeft, setTimeLeft] = useState(null)

    useEffect(() => {
        if (timeLeft === 0) {
            console.log("TIME LEFT IS 0")
            setTimeLeft(null)
        }

        // exit early when we reach 0
        if (!timeLeft) { return }

        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {

            setTimeLeft(timeLeft - 1)
        }, 1000)

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId)
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
    }, [timeLeft])

    let innerContent = (
        <>
            <Text style={[styles.text, { fontSize: 14, color: color, textTransform: 'uppercase' }]}>{title}</Text>
            <Text style={[styles.text, { fontSize: 24, color: color, textTransform: 'capitalize', flex: 1, flexWrap: 'wrap' }]}>{timeLeft || value}  </Text>
        </>
    )
    if (func || title === 'Rest') {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={title === 'Rest' ? () => {
                setTimeLeft(parseInt(value))
            } : func} style={[styles.flexCol, { gap: 4, flex: 1, backgroundColor: bgColor, padding: 10, borderRadius: 10, position: 'relative' },]}>
                {innerContent}
                {/* {(timeLeft && title === 'Rest') && (
                    <View style={[{ position: 'absolute', height: 4, bottom: 0, left: 0, backgroundColor: '#e0e7ff', zIndex: 10, width: `${(timeLeft / value) * 100}%` }]}>
                    </View>
                )} */}
            </TouchableOpacity>
        )
    }
    return (
        <View style={[styles.flexCol, { gap: 4, flex: 1, backgroundColor: bgColor, padding: 10, borderRadius: 10, },]}>
            {innerContent}
        </View>
    )
}

export default function Training(props) {
    const { wod, setView, setPlan, plan } = props
    const [selectedExercise, setSelectedExercise] = useState(0)
    const [setCount, setSetCount] = useState({})
    const [showInformation, setShowInformation] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [rating, setRating] = useState(null)


    // if (!workout) {
    //     return null
    // }

    let tempWorkout = wod

    function incrementSetCount() {
        let new_obj = { ...setCount, [selectedExercise]: selectedExercise in setCount ? (setCount[selectedExercise] + 1) % 5 : 1 }
        setSetCount(new_obj)
    }

    function isComplete() {
        return Object.keys(setCount).reduce((acc, curr) => { return acc + setCount[curr] }, 0) === wod.length * 4
    }

    function handleCompleteWorkout() {
        if (!isComplete()) { return }
        setShowModal(true)
    }

    async function handleSubmitReview() {
        // if rating is 4 or above, save the workout, otherwise just save main metrics

        if (!rating) { return }

        let swoley_workout = await AsyncStorage.getItem('swoley-workout')
        if (!swoley_workout) { return }
        swoley_workout = JSON.parse(swoley_workout)

        let saved_data_obj = {
            ...swoley_workout,
            wod: rating > 3 ? wod : [],
            rating,
            date: new Date()
        }
        // add in save plan line too
        if (swoley_workout.plan) {
            // progress plan
            let newPlanValues = { ...plan, day: plan.day + 1 }
            setPlan(newPlanValues)
            await AsyncStorage.setItem('swoley-plan', JSON.stringify(newPlanValues))
        }

        // if swoley workout contains a plan, increment the plan day and save it

        // read in current data, write to it, save it
        let history_arr = await AsyncStorage.getItem('swoley-history')
        if (history_arr) {
            history_arr = JSON.parse(history_arr).history_arr
        } else {
            history_arr = []
        }

        history_arr = [...history_arr, saved_data_obj]

        // save length  to a count state separately 
        await AsyncStorage.setItem('swoley-history', JSON.stringify({ history_arr }))
        await AsyncStorage.setItem('swoley-history-count', JSON.stringify({ count: history_arr.length }))
        setView(0)
    }

    return showModal ? (
        <>
            <View style={[styles.flexCol, { justifyContent: 'center', alignItems: 'center', flex: 1, gap: 20, }]}>
                <TouchableOpacity onPress={() => setShowModal(false)} activeOpacity={0.6} style={[{ marginRight: 'auto', marginBottom: 160 }]}>
                    <Ionicons name="arrow-back-outline" size={28} color={"#60a5fa"} />
                </TouchableOpacity>
                <Text style={[styles.text, { color: '#60a5fa', fontSize: 24, textAlign: 'center' }]}>
                    How did you find your workout?
                </Text>
                <View style={[styles.flexRow, { gap: 10 }]}>
                    {[1, 2, 3, 4, 5].map((val, val_index) => {
                        return (
                            <TouchableOpacity onPress={() => setRating(val)} key={val_index} style={[styles.flexCol, { alignItems: 'center', opacity: !rating ? 1 : rating === val ? 1 : 0.4 }]}>
                                <Text style={[styles.text, { fontSize: 32 }]}>⭐️</Text>
                                <Text style={[styles.text, { fontSize: 20, color: '#60a5fa' }]}>{val}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <TouchableOpacity onPress={handleSubmitReview} activeOpacity={0.6} style={[styles.flexRow, { justifyContent: 'center', padding: 10, borderRadius: 10, backgroundColor: '#eff6ff', borderColor: '#60a5fa', borderWidth: 1, opacity: rating ? 1 : 0.4 }]}>
                    <Text style={[styles.text, styles.headerText, { color: '#60a5fa', textTransform: 'uppercase', fontSize: 20 }]}>Submit</Text>
                </TouchableOpacity>
            </View>
        </>
    ) : (
        <>
            <View style={[styles.flexCol, { gap: 2, backgroundColor: 'white', borderRadius: 10, overflow: 'hidden' }]}>
                <View style={[styles.flexRow, { justifyContent: 'space-between', gap: 10, backgroundColor: '#eff6ff', padding: 10 }]}>
                    <Text style={[styles.text, styles.headerText, { fontSize: 20, color: '#60a5fa', flex: 1, fontWeight: 600, textTransform: 'uppercase' }]}>&#62;&#62; The DANGER zone
                    </Text>
                    <Ionicons name="skull-outline" size={28} color={"#fb7185"} />
                </View>
                <View style={[styles.flexCol, { gap: 2 }]}>
                    <View style={[styles.flexRow, { gap: 2, alignItems: 'stretch' }]}>
                        {tempWorkout.slice(0, 3).map((ele, eleIndex) => {
                            return (
                                <ExerciseToggle ele={ele} key={eleIndex} eleIndex={eleIndex} selectedExercise={selectedExercise} setSelectedExercise={setSelectedExercise}></ExerciseToggle>
                            )
                        })}
                    </View>
                    <View style={[styles.flexRow, { gap: 2, alignItems: 'stretch' }]}>
                        {tempWorkout.slice(3).map((ele, eleIndex) => {
                            return (
                                <ExerciseToggle ele={ele} key={eleIndex} eleIndex={eleIndex + 3} selectedExercise={selectedExercise} setSelectedExercise={setSelectedExercise}></ExerciseToggle>
                            )
                        })}
                    </View>
                </View>

            </View >

            <View style={[styles.flexCol, { gap: 20, flex: 1, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#eff6ff' }]}>
                <View style={[styles.flexCol, { gap: 10 }]}>

                    {/* <Text style={[styles.text, { fontSize: 14, color: '#60a5fa', textTransform: 'uppercase' }]}>NAME </Text> */}
                    <Text style={[styles.text, { fontSize: 32, color: '#60a5fa', textTransform: 'capitalize', flex: 1, flexWrap: 'wrap' }]}>{tempWorkout[selectedExercise]?.name.replaceAll('_', ' ')}  </Text>
                    <View style={[styles.flexCol, { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, backgroundColor: '#f0f9ff' }]}>
                        {/* have overall progress bar in here */}
                        <Text style={[styles.text, { fontSize: 20, color: '#60a5fa', textTransform: 'capitalize', }]}>
                            &rarr; {tempWorkout[selectedExercise].muscles.join(' + ')}
                        </Text>
                    </View>

                </View>


                <View style={[styles.flexCol, { gap: 10 }]}>

                    <View style={[styles.flexRow, { gap: 10 }]}>
                        <DetailBox title={"Sets"} func={incrementSetCount} value={`${setCount[selectedExercise] || 0} / 4`} bgColor={'#ecfdf5'} color={"#34d399"} borderColor={'#34d399'} />
                        <DetailBox title={"Reps"} value={tempWorkout[selectedExercise]?.reps} bgColor={'#fae8ff'} color={"#f472b6"} />
                    </View>
                    <View style={[styles.flexRow, { gap: 10 }]}>
                        <DetailBox title={"Tempo"} value={tempWorkout[selectedExercise]?.tempo} bgColor={'#fefce8'} color={"#60a5fa"} />
                        <DetailBox title={"Rest"} value={tempWorkout[selectedExercise]?.rest} bgColor={'#eef2ff'} color={"#818cf8"} />
                    </View>
                </View>
                <View style={[styles.flexCol, { gap: 4 }]}>
                    {tempWorkout[selectedExercise]?.description.split('___').map((ele, eleIndex) => {
                        return (
                            <View key={eleIndex} style={[styles.flexRow, { gap: 10, alignItems: 'flex-start' }]}>

                                <Text style={[styles.text, { fontSize: 20, color: '#60a5fa', }]}>
                                    &#62;
                                </Text>
                                <Text style={[styles.text, { fontSize: 20, color: '#60a5fa', flex: 1, flexWrap: 'wrap' }]}>
                                    {ele}
                                </Text>
                            </View>
                        )
                    })}
                </View>


            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setShowInformation(!showInformation)} style={[styles.flexCol, { borderWidth: 1, borderColor: '#fae8ff', padding: 10, borderRadius: 10, gap: 4 }]}>
                <View style={[styles.flexRow, { gap: 10 }]}>

                    <Ionicons name="information-circle-outline" size={20} color={"#f472b6"} />
                    <Text style={[styles.text, { color: '#f472b6', flex: 1 }]}>
                        Information
                    </Text>
                    <Ionicons name={`chevron-${showInformation ? 'up' : 'down'}-outline`} size={20} color={"#f472b6"} />
                </View>

                {showInformation && (
                    <>
                        <Text style={[styles.text, { color: '#f472b6' }]}>
                            Reps is the number of repetitions, rest is specified in seconds, and tempo is the number of seconds for each movement phase in the order of eccentric - isometric - concentric (or down - pause - up).
                        </Text>
                        <Text style={[styles.text, { color: '#f472b6' }]}>
                            For weight selection, choose a weight that allows you to complete the repetitions with minimal sacrifice to form.
                        </Text>
                        <Text style={[styles.text, { color: '#f472b6' }]}>
                            Count your sets for each exercise by clicking on the Sets tile, and track your rest by clicking on the Rest tile.
                        </Text>
                        <Text style={[styles.text, { color: '#f472b6' }]}>
                            To complete a workout and save it to your training logs, you must first complete all the sets for every exercise!
                        </Text>
                    </>
                )}
            </TouchableOpacity >
            <TouchableOpacity onPress={handleCompleteWorkout} activeOpacity={0.8} style={[styles.flexRow, { justifyContent: 'center', padding: 10, borderRadius: 10, backgroundColor: '#eff6ff', borderColor: '#60a5fa', borderWidth: 1, opacity: isComplete() ? 1 : 0.4 }]}>
                <Text style={[styles.text, styles.headerText, { color: '#60a5fa', textTransform: 'uppercase', fontSize: 20 }]}>Complete Workout</Text>
            </TouchableOpacity>

            {/* BACK NEXXT/COMPLETE (then to rate workout page * save in history) */}
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