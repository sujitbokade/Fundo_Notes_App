import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const Chip = ({children}) => {
  return (
    <View>
      <Text style={styles.container}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d5c5d6',
    fontSize: 15,
    borderRadius: 20,  
    padding: 8,
    marginTop: 10,
    marginRight: 10,
    
  },
});
export default Chip;