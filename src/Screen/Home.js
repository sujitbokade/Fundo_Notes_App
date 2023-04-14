import React from 'react';
import { StyleSheet, View } from 'react-native'
import Bottombar from '../Components/BottomBar';
import TopBar from '../Components/TopBar';
import Notes from '../Components/Notes';

const Home = ({ navigation }) => {
  const [layout, setLayout] = React.useState(false)
  return (
    <View style={styles.container}>
      <View>
        <TopBar
         onPress={() => { navigation.openDrawer() }} 
        layoutPress={() => setLayout(!layout)}
        layout={layout}
         />
      </View>
      <View style={{ flex: 3 }}>
        <Notes navigation={navigation}
               layout={layout}
        />
         
      </View>
      <View style={styles.bottomBar}>
        <Bottombar navigation={navigation}/>
      </View>
    </View>
  );
};

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'white'
  },
  bottomBar: {
    position: 'relative',
    justifyContent: 'flex-end'
  }
})
