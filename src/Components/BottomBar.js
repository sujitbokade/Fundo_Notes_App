import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Iconicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Sizes from '../Constants/Sizes'

const Bottombar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.firstIcon}>
        <TouchableOpacity>
          <Iconicons
            name="checkbox-outline"
            size={Sizes.normalButton}
            style={{ color: 'black' }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconMargin}>
        <TouchableOpacity>
          <Iconicons
            name="brush-outline"
            size={Sizes.normalButton}
            style={{ color: 'black' }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconMargin}>
        <TouchableOpacity>
          <Iconicons
            name="mic-outline"
            size={Sizes.normalButton}
            style={{ color: 'black' }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconMargin}>
        <TouchableOpacity>
          <Iconicons
            name="image-outline"
            size={Sizes.normalButton}
            style={{ color: 'black' }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backIcon} onPress={() => { }}>
        <View style={styles.plusIcon}>
          <FontAwesome5 name="plus" size={30} style={{ color: '#e01f99' }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Bottombar

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    backgroundColor: '#DFDADA',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  firstIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  iconMargin: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
  },
  plusIcon: {
    borderColor: 'white',
    width: 70,
    height: 70,
    borderRadius: 20,
    borderWidth: 9,
    backgroundColor: '#DFDADA',
    marginLeft: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    top: -45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});