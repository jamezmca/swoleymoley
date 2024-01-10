import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'


const surveys = {
    daily: {
        complete: true
    },
    weekly: {
        complete: false
    },
    // monthly: {
    //     complete: false
    // }
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function Home(props) {
    const now = new Date()
    const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const currDay = dayList[now.getDay()]
    const currDayNum = now.getDate()
    const currMonth = monthList[now.getMonth()]
    const currYear = now.getFullYear()

    const { history } = props

    const [period, setPeriod] = useState('monthly')


    function daysIntoYear(date) {
        return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    }

    function daysInYear(year) { return new Date(year, 1, 29).getMonth() == 1 ? 366 : 365; }

    return (
        <>
            <View style={[styles.headerContainer]}>

                <Text style={[styles.text, { fontSize: 24 }]}>&#62;&#62; {currDay} {currDayNum} of {currMonth} </Text>
                <Text style={[styles.text, { fontSize: 24 }]}>47 🔥</Text>
            </View>
            <View style={[styles.notificationsContainer]}>
                <Ionicons name="notifications-outline" size={24} color={"#5eead4"} />

                <Text style={[styles.text, { fontSize: 24, }]}>Notifications</Text>
            </View>
            <View style={[styles.surveyContainer]}>
                {Object.keys(surveys).map((key, keyIndex) => {
                    const completed = surveys[key].complete
                    return (
                        <View key={key} style={[styles.surveyItem]}>
                            <View style={[styles.checkBox, completed ? { backgroundColor: '#5eead4' } : {}]}>
                                {completed && <Ionicons name="checkmark-outline" size={20} color={"#020617"}></Ionicons>}
                            </View>
                            <View style={[{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }]}>
                                <Text style={[styles.text, { textTransform: 'capitalize', fontSize: 18 }]}>{key} Survey</Text>
                                <Text style={[styles.text]}>Time left: 24h 32m 14s</Text>
                            </View>
                            {!completed && (
                                <TouchableOpacity style={[{ paddingLeft: 5, paddingRight: 5, paddingTop: 3, paddingBottom: 3, backgroundColor: '#134e4a', borderRadius: 4, borderWidth: 1, borderColor: '#5eead4' }]}>
                                    <Text style={[styles.text, { fontSize: 16, color: '#5eead4' }]}>
                                        Complete &rarr;
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )
                })}
            </View>
            {/* <TouchableOpacity></TouchableOpacity> */}
            <View style={[styles.notificationsContainer]}>
                <Ionicons name="stats-chart-outline" size={24} color={"#5eead4"} />
                <Text style={[styles.text, { fontSize: 24, flex: 1 }]}>Analytics </Text>
                {/* <View style={[{ display: 'flex', flexDirection: 'row', gap: 10, flex: 1 }]}> */}
                {/* </View> */}

                <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }]}>
                    <TouchableOpacity onPress={() => setPeriod('weekly')}>
                        <Text style={[styles.text, { fontSize: 18, color: period === 'weekly' ? '#5eead4' : "#134e4a" }]}>Weekly</Text>
                    </TouchableOpacity>
                    <Text style={[styles.text, { fontSize: 18 }]}>/</Text>
                    <TouchableOpacity onPress={() => setPeriod('monthly')}>
                        <Text style={[styles.text, { fontSize: 18, color: period === 'monthly' ? '#5eead4' : "#134e4a" }]}>Monthly</Text>
                    </TouchableOpacity>
                    {/* <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }]}> */}
                    {/* </View> */}
                    <TouchableOpacity >
                        <Text style={[styles.text, { fontSize: 18 }]}>&#60;</Text>
                    </TouchableOpacity>
                    <Text style={[styles.text, { fontSize: 18 }]}>{currYear}</Text>
                    <TouchableOpacity >
                        <Text style={[styles.text, { fontSize: 18 }]}>&#62;</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 4, alignItems: 'center' }]}>
                {/* in here gonna have all the filterings */}
                {/* {Object.keys(history)} */}
            </View>
            {months.map((month, monthIndex) => {
                let year = 2024
                let monthNow = new Date(year, months.indexOf(month), 1)

                const firstDayOfMonth = monthNow.getDay()
                const daysInMonth = new Date(year, months.indexOf(month) + 1, 0).getDate()
                const daysToDisplay = firstDayOfMonth + daysInMonth

                return (
                    <View key={monthIndex} style={[{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 20, paddingRight: 20 }]}>
                        <Text style={[styles.text, { color: '#818cf8', fontSize: 18 }]}>&rarr; {month} </Text>
                        {/* <View style={[{ paddingLeft: 4, paddingRight: 4, paddingTop: 3, paddingBottom: 3, borderRadius: 6, backgroundColor: '#312e81', borderWidth: 1, borderColor: '#818cf8' }]}>

                        </View> */}
                        <View style={[{ display: 'flex', flexDirection: 'row', gap: 3 }]}>
                            {[...Array(7).keys()].map((val, valindex) => {
                                let numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)
                                // console.log(`monthNow: ${monthNow}\nFirstdayofmonth: ${firstDayOfMonth}\ndaysinmonth: ${daysInMonth}\ndaysToDisplay: ${daysToDisplay}\nnumRows: ${numRows}\n`)
                                return (
                                    <View key={valindex} style={[{ display: 'flex', flexDirection: 'column', flex: 1, gap: 3, }]}>
                                        {[...Array(numRows).keys()].map((row, rowIndex) => {
                                            let dayIndex = (row * 7) + val - (firstDayOfMonth - 1)
                                            let displayDay = dayIndex > daysInMonth ? false : (row === 0 && valindex < firstDayOfMonth) ? false : true
                                            let isToday = dayIndex === now.getDate() && monthIndex === now.getMonth() && year === now.getFullYear()
                                            // console.log(dayIndex, now.getDate(), monthIndex, now.getMonth(), year, now.getFullYear())
                                            return (
                                                <View key={rowIndex} style={[{ aspectRatio: '16/9', borderWidth: 1, borderColor: isToday ? '#5eead4' : '#1e1b4b', opacity: displayDay ? 1 : 0, borderRadius: 3, padding: 1, backgroundColor: isToday ? '#134e4a' : '' }]}>
                                                    <Text style={[styles.text,]}>{dayIndex <= daysInMonth ? dayIndex : '-'}</Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                )
            })}

        </>
    )
}




export const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        color: '#5eead4',
        fontFamily: 'Andy'
    },
    notificationsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10

    },
    surveyContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    surveyItem: {
        backgroundColor: '#3E429A',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#6C72DB'
    },
    checkBox: {
        height: 24,
        aspectRatio: 1,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#5eead4',
        backgroundColor: '#020617',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateText: {
        fontSize: 24
    },
    calendar: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    day: {
        height: 7,
        width: 7,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#134e4a'
    },
    currentMonth: {
        borderColor: '#5eead4'
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },

})

//#6C72DB - light purple
//#3E429A - darker purple
