import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chip from './Chip'
import moment from 'moment'

const NoteCard = props => {
  return (
    <View>
      <Text style={styles.titleText}>{props.title}</Text>
      <Text style={styles.noteText}>{props.note}</Text>
      <View style={{ flexDirection: 'row', marginLeft: -6, flexWrap: 'wrap', marginBottom: 10 }}>
        {props.labelData.map(item => (
          <Chip key={item.id}>{item.label}</Chip>
        ))}
      </View>
      {props.notificationDateAndTime ? (
        <View >
          <View style={styles.timeDateView} >
            <View style={styles.iconView}>
              <Icons name="alarm" size={20} />
            </View>
            <Text>
              {props.notificationDateAndTime
                ? moment(props.notificationDateAndTime).format('lll')
                : null}
            </Text>
          </View>
        </View>
      ) : null}
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

  timeDateView: {
    backgroundColor: "#d5c5d6",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 6,
    borderRadius: 10,
    marginLeft: -8,

  },
  iconView: {
    marginRight: 2,
    marginLeft: -5,

  }
})