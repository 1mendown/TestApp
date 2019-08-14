import React,{ Component } from 'react';
import { StyleSheet,Text,SafeAreaView } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';


class myVIPeso extends Component {

		static navigationOptions = {
		title:'myVIPeso'
	};



  render() {
    return (
        <SafeAreaView style={styles.container}>
          <Text> myVIP </Text>
        </SafeAreaView> 
    );
}
}

export default myVIPeso;


const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center'
  }
});