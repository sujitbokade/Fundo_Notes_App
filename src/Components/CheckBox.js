import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CheckBox = ({item, checked, unchecked}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="label-outline"
        size={25}
      />
      <Text style={styles.text}> {item.label} </Text>
      <TouchableOpacity onPress={unchecked} >
        <MaterialIcons
          size={25}
          name={checked ? 'check-box' : 'check-box-outline-blank'}
          style={{marginLeft: 30}}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    paddingLeft: 10,
  },
  text: {
    width: '65%',
    marginLeft: 25,
    fontSize: 20,
  }
})

export default CheckBox 