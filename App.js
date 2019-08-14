import React,{ Component } from 'react';
import { createSwitchNavigator,createBottomTabNavigator,createAppContainer,createStackNavigator } from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { StyleSheet,View,Text,SafeAreaView,Image} from 'react-native';
import prom from './src/promos';
import myVIPeso from './src/myVIP';
import Restaurants from './src/Restaurant';
import Icon from 'react-native-vector-icons/Ionicons'
import Peso from './assets/peso.png';
import Rest from './assets/rest.png';
import promIcon from './assets/promoIcon.png';
import { SearchBar } from 'react-native-elements';

class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
      <AppContainer/>
     </SafeAreaView> 

 
    );
}}


let promo = createStackNavigator({ prom });
let myvip = createStackNavigator({ myVIPeso });
let resto = createStackNavigator({ Restaurants });

const tabNavigator = createMaterialBottomTabNavigator({
  Promos:{screen:promo,
    navigationOptions:{
      tabBarIcon:({focusesd,horizontal,tintColor}) =>{
        return <Image 
          source={promIcon}
          style={{width:45,height:20}}
          color={tintColor}
        />
  },}},
  myVIPeso:{screen:myvip,
    navigationOptions:{
      tabBarIcon:({focusesd,horizontal,tintColor}) =>{
        return <Image 
          source={Peso}
          style={{width:20,height:20}}
          color={tintColor}
        />
  },}},
  Restaurants:{screen:resto,
    navigationOptions:{
      tabBarIcon:({focusesd,horizontal,tintColor}) =>{
      return <Image 
          source={Rest}
          style={{width:30,height:30}}
          color={tintColor}
        />

    },}}
},
{
  initialRouteName:'Restaurants',
  shifting:true,
  activeColor: '#2d2929',
  inactiveColor: 'whitesmoke',
  barStyle: { backgroundColor: '#269fc5',padding:10},
}
);


const AppContainer = createAppContainer(tabNavigator);




export default App;