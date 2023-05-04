import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, {useState, useContext} from 'react'
import { AuthContext } from '../navigation/AuthProvider'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeleteNoteBottomSheet from '../Components/DeleteNoteBottomSheet';
import { deleteNoteData } from '../Services/NoteServices';


const TrashNote = ({navigation, route}) => {
    const noteDetails = route.params?.item
    const [title, setTitle] = useState(noteDetails?.title)
    const [note, setNote] = useState(noteDetails?.note)
    const { user } = useContext(AuthContext)
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    
    const onPressBack = async () => {
        navigation.goBack();
      };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.viewOne}>
          <TouchableOpacity onPress={onPressBack}>
            <Ionicons
              name="arrow-back"
              size={25}
            />
          </TouchableOpacity>
      </View>
      <View style={styles.viewThree}>
          <TextInput
            style={styles.titleText}
            value={title}
            editable={false}
            placeholder="Title"
          /> 
        <ScrollView>
            <TextInput
              style={styles.noteText}
              value={note}
              editable={false}
              placeholder="Note"
              multiline={true}
            />
        </ScrollView>
      </View>
      <View style={styles.viewFour}>
        <View style={styles.viewFive}>
          <TouchableOpacity style={styles.plusButton} disabled={true}>
            <MaterialCommunityIcons
              name="plus-box-outline"
             
              size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.colorButton} disabled={true}>
            <Ionicons name="color-palette-outline"  size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {setBottomSheetVisible(!bottomSheetVisible);}}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View>
        <DeleteNoteBottomSheet
          visible={bottomSheetVisible}
          onRequestClose={() => setBottomSheetVisible(false)}
          hideModal={() => setBottomSheetVisible(false)}
          onPressDeleteForever={async () => {
            await deleteNoteData(user.uid, noteDetails.id);
          }}
        />
      </View>
    </View>
  )
}

export default TrashNote

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    viewOne: {
      justifyContent: 'flex-start',
      paddingTop: 20,
      paddingLeft: 20,
    },
    viewThree: {
      flex: 1,
      marginLeft:20,
      marginTop: 20,
    },
    titleText: {
      fontSize: 25, 
    },
    noteText: {
      fontSize: 20,
      marginTop:-14
    },
    viewFour: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    viewFive: {
      flexDirection: 'row',
    },
    plusButton: {
      marginRight: 15,
      marginLeft:10
    },
    colorButton: {
      marginLeft: 15,
    }
  });