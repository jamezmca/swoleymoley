import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


export default function NavBar(props) {
    const { view, handleUpdateView, wod } = props
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7} onPress={handleUpdateView(0)} style={[styles.navItem, styles.navOne, view === 0 ? { backgroundColor: '#f8fafc' } : {}]}>
                <Ionicons name="home-outline" size={24} color={"#60a5fa"} />
                <Text style={[styles.text,]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={handleUpdateView(1)} style={[styles.navItem, styles.navTwo, view === 1 ? { backgroundColor: '#f8fafc' } : {}, { opacity: wod.length ? 1 : 0.4 }]}>
                <Ionicons name="barbell-outline" size={24} color={"#60a5fa"} />
                <Text style={[styles.text,]}>Training</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={handleUpdateView(2)} style={[styles.navItem, styles.navThree, view === 2 ? { backgroundColor: '#f8fafc' } : {}]}>
                <Ionicons name="bookmark-outline" size={24} color={"#60a5fa"} />
                <Text style={[styles.text,]}>History</Text>
            </TouchableOpacity>
        </View>
    )
}


export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        color: '#60a5fa',
        // color: '#93c5fd',
        fontFamily: 'Andy'
    },
    navItem: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        justifyContent: 'center',
        padding: 10,
        // backgroundColor: 'white',
        // borderColor: '#020617',
        borderColor: '#f8fafc',
        // borderColor: 'white',
        borderTopWidth: 1.5,
        borderBottomWidth: 1.5,
    },
    navOne: {
        borderRightWidth: 1.5
    },
    navThree: {
        borderLeftWidth: 1.5
    }
});