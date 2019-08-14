import React,{ Component } from 'react';
import { StyleSheet,Text,SafeAreaView } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';


class Promos extends Component {

		static navigationOptions = {
		title:'Promos'
	};



  render() {
    return (
        <SafeAreaView style={styles.container}>
          <Text> Promos</Text>
        </SafeAreaView> 
    );
}
}

export default Promos;


const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center'
  }
});

