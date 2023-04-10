import { StyleSheet, View } from 'react-native'
import Bottombar from '../Components/BottomBar';
import TopBar from '../Components/TopBar';
import Notes from '../Components/Notes';

const Home = ({ navigation }) => {

  return (
    <View style={styles.topBar}>
      <View>
        <TopBar
         onPress={() => { navigation.openDrawer() }} 
         />
      </View>
      <View style={{ flex: 3 }}>
        <Notes navigation={navigation}/> 
      </View>
      <View style={styles.bottomBar}>
        <Bottombar navigation={navigation}/>
      </View>
    </View>
  );
};

export default Home

const styles = StyleSheet.create({
  topBar: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'white'
  },
  bottomBar: {
    position: 'relative',
    justifyContent: 'flex-end'
  }
})
