import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Pressable } from 'react-native'
import { gradients } from './Survey';


export default function Settings(props) {
  const { skeletons, setSkeletons } = props

  const [newSurvey, setNewSurvey] = useState(Object.keys(skeletons).length == 0) //if surveys.length === zero then auto open it
  const [title, setTitle] = useState('')
  const [prompt, setPrompt] = useState('')
  const [color, setColor] = useState('pink')
  const [interval, setInterval] = useState('Weekly')
  const [showColors, setShowColors] = useState(false)
  const [type, setType] = useState('Bool')
  const [max, setMax] = useState('5')
  const [min, setMin] = useState('0')

  function handleAddSkeleton() {
    if (!title || !prompt || (type === 'Range' && (!max || !min))) { return }
    let newSurvey = {
      title,
      prompt,
      color,
      type,
      max,
      min,
      interval
    }
    setSkeletons(currSkels => ({ ...currSkels, [title]: newSurvey }))
    setTitle('')
    setPrompt('')
    setColor('pink')
    setType('Bool')
    setInterval('Weekly')
    setNewSurvey(false)
  }

  function handleRemoveSkeletonItem(obj) {
    let tempObj = { ...skeletons }
    delete tempObj[obj.title]
    setSkeletons(tempObj)
  }

  function handleEditSkeletonItem(obj) {
    setTitle(obj.title)
    setPrompt(obj.prompt)
    setColor(obj.color)
    setType(obj.type)
    setInterval(obj.interval)
    setNewSurvey(true)
    let tempObj = { ...skeletons }
    delete tempObj[obj.title]
    setSkeletons(tempObj)
  }



  return (
    <>
      <View style={[{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>

        <Text style={[styles.text, { fontSize: 24 }]}>&#62;&#62; Survey Setup </Text>
        <Ionicons name="settings-outline" size={24} color={"#5eead4"} />

      </View>
      <View style={[{ display: 'flex', flexDirection: 'column', gap: 10, borderRadius: 10, backgroundColor: '#134e4a', borderWidth: 1, borderColor: '#5eead4' }]}>

        {newSurvey ? (
          <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, paddingTop: 6 }]}>
            <Text style={[styles.text, { fontSize: 18 }]}>&rarr; New Survey</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={() => {
            setNewSurvey(!newSurvey)
          }} style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6 }]}>
            <Text style={[styles.text, { fontSize: 18 }]}>Add Survey</Text>
            <Ionicons name="add-outline" size={18} color={"#5eead4"} />
          </TouchableOpacity>
        )}

        {newSurvey && (
          <View style={[{ padding: 10, display: 'flex', flexDirection: 'column', gap: 10 }]}>
            <View style={[{ display: 'flex', flexDirection: 'column', gap: 4 }]}>
              <Text style={[styles.text, { fontSize: 16, }]}>
                ✦ Title ✦
              </Text>
              <TextInput
                style={[styles.textInput]}
                onChangeText={setTitle}
                value={title}
                placeholder="Unique keyword e.g. running"
                placeholderTextColor="white"
              // keyboardType="numeric"
              />
              <Text style={[styles.text, { fontSize: 14, color: '#f472b6' }]}>
                -- Using an existing keywork will overwrite the previous survey associated with the keyword.
              </Text>
            </View>

            <View style={[{ display: 'flex', flexDirection: 'column', gap: 4 }]}>
              <Text style={[styles.text, { fontSize: 16, }]}>
                ✦ Prompt ✦
              </Text>
              <TextInput
                style={[styles.textInput]}
                onChangeText={setPrompt}
                value={prompt}
                placeholder="Survey prompt e.g. did you run today?"
                placeholderTextColor="white"
              // keyboardType="numeric"
              />
              <Text style={[styles.text, { fontSize: 14, color: '#f472b6' }]}>
                -- Recommended to be organized into 4 categories of: Goals, Ailments, Habits, Mood :P
              </Text>
            </View>
            <View style={[{ display: 'flex', flexDirection: 'column', gap: 4 }]}>
              <Text style={[styles.text, { fontSize: 16, }]}>
                ✦ Survey Interval ✦
              </Text>
              <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }]}>
                {['Weekly', 'Monthly', 'Value'].map((ele, eleIndex) => {
                  return (
                    <TouchableOpacity onPress={() => setType(ele)} key={eleIndex} style={[{ backgroundColor: type === ele ? '#6C72DB' : '#020617', paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10, borderRadius: 6, borderWidth: 1, borderColor: '#6C72DB' }]}>
                      <Text style={[styles.text, { color: 'white', fontSize: 16 }]}>{ele}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
            <View style={[{ display: 'flex', flexDirection: 'column', gap: 4 }]}>
              <Text style={[styles.text, { fontSize: 16, }]}>
                ✦ Type of Survey ✦
              </Text>
              <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }]}>
                {['Bool', 'Range', 'Value'].map((ele, eleIndex) => {
                  return (
                    <TouchableOpacity onPress={() => setType(ele)} key={eleIndex} style={[{ backgroundColor: type === ele ? '#6C72DB' : '#020617', paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10, borderRadius: 6, borderWidth: 1, borderColor: '#6C72DB' }]}>
                      <Text style={[styles.text, { color: 'white', fontSize: 16 }]}>{ele}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
              {type === 'Range' && (
                <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }]}>
                  <View style={[{ display: 'flex', flexDirection: 'column', gap: 4 }]}>
                    <Text style={[styles.text, { fontSize: 14, color: 'white' }]}>
                      Min
                    </Text>
                    <TextInput
                      style={[styles.textInput]}
                      onChangeText={setMin}
                      value={min}
                      // placeholder="Survey prompt e.g. did you run today?"
                      // placeholderTextColor="white"
                      keyboardType="numeric"
                    />
                  </View>
                  <Text style={[styles.text, { fontSize: 34, color: 'white' }]}>
                    &rarr;
                  </Text>
                  <View style={[{ display: 'flex', flexDirection: 'column', gap: 4 }]}>
                    <Text style={[styles.text, { fontSize: 14, color: 'white' }]}>
                      Max
                    </Text>
                    <TextInput
                      style={[styles.textInput]}
                      onChangeText={setMax}
                      value={max}
                      // placeholder="Survey prompt e.g. did you run today?"
                      // placeholderTextColor="white"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              )}
            </View>
            <View style={[{ display: 'flex', flexDirection: 'column', gap: 4 }]}>
              <Text style={[styles.text, { fontSize: 16, }]}>
                ✦ Color ✦
              </Text>
              <View style={[{ display: 'flex', flexDirection: 'column', borderRadius: 10, backgroundColor: '#020617', borderWidth: 1, borderColor: '#6C72DB' }]}>

                <Pressable onPress={() => setShowColors(true)} style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10 }]}>
                  <View style={[{ display: 'flex', flexDirection: 'row', height: 30, alignItems: 'stretch', flex: 1, borderRadius: 4, overflow: 'hidden' }]}>
                    {gradients[color].map((val, valIndex) => {
                      return (
                        <View key={valIndex} style={[{ flex: 1, backgroundColor: val }]}>
                        </View>
                      )
                    })}
                  </View>
                  <Ionicons name="chevron-down-outline" size={18} color={"#5eead4"} />

                </Pressable>
                {showColors && (
                  <>
                    {Object.keys(gradients).filter(val => val !== color).map((newVal, newValIndex) => {
                      return (
                        <Pressable onPress={() => {
                          setColor(newVal)
                          setShowColors(false)
                        }} key={newValIndex} style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10 }]}>
                          <View style={[{ display: 'flex', flexDirection: 'row', height: 30, alignItems: 'stretch', flex: 1, borderRadius: 4, overflow: 'hidden' }]}>
                            {gradients[newVal].map((val, valIndex) => {
                              return (
                                <View key={valIndex} style={[{ flex: 1, backgroundColor: val }]}>
                                </View>
                              )
                            })}
                          </View>
                          <Ionicons name="chevron-forward-outline" size={18} color={"#5eead4"} />
                        </Pressable>
                      )
                    })}
                  </>
                )}
              </View>
            </View>
            <View style={[{ display: 'flex', flexDirection: 'row', gap: 10 }]}>
              <TouchableOpacity onPress={() => setNewSurvey(false)} style={[{ backgroundColor: '#020617', paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10, borderRadius: 6, borderWidth: 1, borderColor: '#6C72DB', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={[styles.text, { color: 'white', fontSize: 18 }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddSkeleton} style={[{ backgroundColor: '#6C72DB', paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10, borderRadius: 6, borderWidth: 1, borderColor: '#6C72DB', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={[styles.text, { color: 'white', fontSize: 18 }]}>Save & Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View style={[{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>

        <Text style={[styles.text, { fontSize: 24 }]}> Active Surveys &rarr; {Object.keys(skeletons).length} </Text>
        <Ionicons name="list-outline" size={24} color={"#5eead4"} />

      </View>
      <ScrollView style={[{ display: 'flex', flexDirection: 'column', gap: 10 }]}>
        {Object.keys(skeletons).map((skele, skeleIndex) => {
          return (
            <View key={skeleIndex} style={[{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 6, paddingLeft: 10, borderLeftWidth: 1, borderColor: '#5eead4', marginBottom: 10 }]}>
              <View style={[{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, }]}>
                {/* <Text style={[styles.text, { fontSize: 16, backgroundColor: '#020617', borderWidth: 1, borderColor: '#6C72DB', paddingTop: 4, paddingBottom: 4, paddingLeft: 8, paddingRight: 8, color: '#6C72DB', marginRight: 'auto', borderRadius: 6 }]}>Keyword: {skeletons[skele].title}</Text> */}
                <Text style={[styles.text, , { fontSize: 20 }]}>Prompt: {skeletons[skele].prompt}</Text>
                <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center' }]}>
                  <Text style={[styles.text, { fontSize: 14, flex: 1 }]}>
                    Keyword: {skeletons[skele].title}
                  </Text>
                  <Text style={[styles.text, { fontSize: 14, flex: 1 }]}>
                    Type: {skeletons[skele].type} {skeletons[skele].type === 'Range' ? `(${skeletons[skele].min} -> ${skeletons[skele].max})` : ''}
                  </Text>
                </View>
                <View style={[{ display: 'flex', flexDirection: 'row', height: 4, alignItems: 'stretch', flex: 1, borderRadius: 2, overflow: 'hidden', marginTop: 2 }]}>
                  {gradients[skeletons[skele].color].map((val, valIndex) => {
                    return (
                      <View key={valIndex} style={[{ flex: 1, backgroundColor: val }]}>
                      </View>
                    )
                  })}
                </View>
              </View>
              <View style={[{ display: 'flex', flexDirection: 'column', gap: 10 }]}>
                <TouchableOpacity onPress={() => handleEditSkeletonItem(skeletons[skele])} >
                  <Ionicons name="create-outline" size={24} color={"#5eead4"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemoveSkeletonItem(skeletons[skele])} >
                  <Ionicons name="trash-bin-outline" size={24} color={"#5eead4"} />
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </ScrollView>
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
  textInput: {
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#020617', //textColor, white,
    color: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6C72DB'
  }
})