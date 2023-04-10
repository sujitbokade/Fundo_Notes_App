import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import React, { useContext, useEffect, useCallback, useState } from 'react'
import { fetchNoteData } from '../Services/NoteServices';
import { AuthContext } from '../navigation/AuthProvider';


const Notes = ({navigation}) => {
  const [noteDetails, setNoteDetails] = useState([]);
  
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getNoteData();
  }, [getNoteData]);

  let nData = []

  const getNoteData = useCallback(async () => {
    let noteData = await fetchNoteData(user.uid);
    noteData.forEach(data => {
      
        nData.push(data)  
    })
    console.log(noteData)
    setNoteDetails(nData) 
    setLoading(false)   
  }, [user.uid])

  const editNote = (item) => {
    navigation.navigate("CreateNote",{item: item})
  }

 
  return (
    <ScrollView style={styles.container} >
      {
        noteDetails.map ((item, index) => 
          (
            <View key={index} style={styles.noteView}>
              <TouchableOpacity onPress={() => editNote(item)}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.noteText}>{item.note}</Text>
              </TouchableOpacity>
            </View>
          )
        )
      }
    </ScrollView>
  )
}
export default Notes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight:10
  },
  noteView: {
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#f4e6f5'
  },
  titleText: {
    fontSize:18
  },
  noteText: {
    fontSize:14
  }
})