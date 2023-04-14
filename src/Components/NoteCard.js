import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const NoteCard = (props) => {
    return (
        <View>
            <Text style={styles.titleText}>{props.title}</Text>
            <Text style={styles.noteText}>{props.note}</Text>
        </View>
    )
}

export default NoteCard

const styles = StyleSheet.create({
    titleText: {
        fontSize: 18
      },
      noteText: {
        fontSize: 14
      },
})