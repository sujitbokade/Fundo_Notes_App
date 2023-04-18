import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl,FlatList } from 'react-native';
import React, { useContext, useEffect, useCallback, useState } from 'react'
import { fetchNoteData } from '../Services/NoteServices';
import { AuthContext } from '../navigation/AuthProvider';
import { useIsFocused } from '@react-navigation/native';
import NoteCard from './NoteCard';

const Notes = ({ navigation, layout }) => {
  const [pinnedNotes, setPinnedNotes] = useState([])
  const [otherNotes, setOtherNotes] = useState([])
  
  const { user } = useContext(AuthContext);
  const focused = useIsFocused()
  
  useEffect(() => {
    if(focused) {
      getNoteData();
    }  
  }, [getNoteData, focused]);
  
  const getNoteData = useCallback(async () => {
    let pinnedData = []
    let otherData = []
    let noteData = await fetchNoteData(user.uid);
    noteData.forEach(data => {
      if (data.pin) {
        pinnedData.push(data)
      } if (!data.pin && !data.archive && !data.deleted ) {
        otherData.push(data);
      }
    })
    setPinnedNotes(pinnedData)
    setOtherNotes(otherData) 
  }, [user.uid])

  const editNote = (item) => {
    navigation.navigate("CreateNote", { item: item })
  }

  const pinnedNoteData = () => {
    return (
      <View style={styles.container}>
        {pinnedNotes && (
          <Text style={{fontSize:15, marginLeft:20, marginBottom:8}}>
            {pinnedNotes.length ? 'Pinned' : null}
          </Text>
        )}
        <FlatList
          data={pinnedNotes}
          ListFooterComponent={otherNoteData}
          numColumns={layout? 1 : 2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View key={item.id} style={layout ? styles.listLayout : styles.gridLayout }>
            <TouchableOpacity
              onPress={() => {
                editNote(item);
              }}>
              <NoteCard {...item} />
            </TouchableOpacity>
            </View>
          )}
        />
      </View>
    )
  }

  const otherNoteData = () => {
    return (
      <View style={styles.container}>
        {pinnedNotes && (
          <Text style={{fontSize:15, marginLeft:20, marginBottom:8,marginTop:5}}>
            {pinnedNotes.length ? 'Others' : null}
          </Text>
        )}
        <FlatList
          data={otherNotes}
          keyExtractor={item => item.id}
          numColumns={ layout ? 1 : 2 }
          renderItem={({ item }) => (
            <View key={item.id} style={layout ? styles.listLayout : styles.gridLayout }>
            <TouchableOpacity
              onPress={() => {
                editNote(item);
              }}>
             <NoteCard {...item} />
            </TouchableOpacity>
            </View>
          )}
        />
      </View>
    )
  }
  return (
    <View>
    
      <FlatList
        ListHeaderComponent={pinnedNoteData}
      />
    </View>
  );
}
  export default Notes

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    gridLayout: {
      marginHorizontal: 8,
      marginVertical: 6,
      borderRadius: 10,
      padding: 12,
      width: "45%",
      borderWidth: 1,
      backgroundColor: '#f4e6f5'
    },
    listLayout: {
      borderWidth: 1,
      marginVertical: 5,
      marginHorizontal:10,
      borderRadius: 10,
      padding: 8,
      backgroundColor: '#f4e6f5'
    },
  })