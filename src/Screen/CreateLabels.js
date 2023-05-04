import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, FlatList } from 'react-native'
import React, { useState, useContext, useCallback, useEffect } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { AuthContext } from '../navigation/AuthProvider';
import { addUserLabels, fetchLabelData} from '../Services/LabelServices'
import { useIsFocused } from '@react-navigation/native';
import LabelCard from '../Components/LabelCard';
import {useSelector, useDispatch} from 'react-redux';
import { labelsData } from '../Redux/Action';
import Names from '../Constants/Names';

const CreateLabels = ({ navigation }) => {
  const [icon, setIcon] = useState(false)
  const [label, setLabel] = useState("")
  const { user } = useContext(AuthContext)
  const focused = useIsFocused()
  const labelData = useSelector(state => state.labelData);
  const dispatch = useDispatch();

  const fetchData = useCallback( async () => {
    
    let data = await fetchLabelData(user.uid);
    dispatch(labelsData(data));
  },[user.uid, dispatch])

  useEffect(() => {
    if(focused) {
      fetchData();
    }  
  }, [focused, fetchData]);

  const addButton = async () => {
    setIcon(!icon);
  };

  const closeButton = async () => {
    setIcon(!icon);
    setLabel("")
  }

  const changeIcons = text => {
    setLabel(text);
    if (text !== '') {
      setIcon(false);
    } else {
      setIcon(false);
      
    }
  };

  const onCheckPress = async () => {
    setIcon(!icon);
    if (label !== '') {
      await addUserLabels(label, user.uid);
      fetchData();
      setLabel('');
      Keyboard.dismiss();
    }
  };
   
  return (
    <View style={styles.container} >
      <View style={styles.view}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} />
        </TouchableOpacity>
        <Text style={styles.textStyle}>
          Edit labels
        </Text>
      </View>
      <View style={icon?styles.iconView:styles.iconView1}>
        <TouchableOpacity>
          {icon ? (
            <MaterialIcons name="add" size={25} onPress={() => addButton()}/>
          ) : (
            <Ionicons name="close" size={25} onPress={() => closeButton()} />
          )}
        </TouchableOpacity>
      
        <TextInput
          style={styles.textInput}
          placeholder={Names.createLabel}
          value={label}
          onChangeText={(text) => changeIcons(text)}
        />
    
        <TouchableOpacity onPress={onCheckPress}>
          <Ionicons name={icon ? null : 'checkmark-sharp'} size={30} />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 15}}>
        <FlatList
          data={labelData}
          key={item => item.id}
          keyExtractor={item => item.id}
          renderItem={(item) => (
            <LabelCard {...item} fetchData={fetchData}/>
          )}
        />
      </View>
    </View>
  )
}

export default CreateLabels

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    marginLeft: 25,
    marginRight: 10,
    width: '75%',
    fontSize: 20
  },
  textStyle: {
    fontSize: 18,
    marginLeft: 20
  },
  iconView: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center', 
  },
  iconView1: {
    marginTop:15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth:1,
    borderTopWidth:1
  }
  
})