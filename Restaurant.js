import React,{ Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppRegistry,StyleSheet,Text,SafeAreaView,FlatList,Image,View,ActivityIndicator,TouchableWithoutFeedback,Button,Modal,TouchableHighlight,CheckBox} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
import {  getResList } from "./dataSource/Resto";
import contains  from "./dataSource/Resto";
import _ from 'lodash';




class restaurant extends Component {



	static navigationOptions = ({ navigation }) => {
	return {	
		title:'Restaurants',	
		headerStyle: {
      backgroundColor: '#269fc5',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold', position:'absolute',left:'35%'},
   	}};
   	

  constructor(props){
    super(props);
      this.state = {
          datasource: [],
          loading: false,
          error:null,
          query:"",
          fullData:[], 
          modal:false,
          one:true,
          two:false,
          three:false,
          four:false
      };
  }

componentDidMount()
{
  this.makeRemoteRequest();

  const url = 'http://localhost:3000/Restaurants?sort=resName&_order=asc'

    fetch(url)
    .then((response) => response.json())
    .then((responseJson) =>{
      this.setState({
         datasource: responseJson.Restaurants,
         fullData:responseJson.Restaurants,

      })
    })
    .catch((error) => {
      console.log(error)
    })
}

makeRemoteRequest = _.debounce(() => {
    this.setState({ loading: true });

    getResList(100,this.state.query)
      .then(LisOfRestaurants => {
        this.setState({
          loading: false,
          datasource: LisOfRestaurants,
          fullData: LisOfRestaurants,
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  },1000);

handleSearch = (text) =>{
  const formatQuery = text.toLowerCase();
  const data = _.filter(this.state.fullData, LisOfRestaurants => {
      return contains(LisOfRestaurants.formatQuery);
  })
  this.setState({query:formatQuery,data}, () => this.makeRemoteRequest());
}


renderSeparator = () => {
  return (
      <SafeAreaView
        style={{height:0.5,width:'100%',backgroundColor:'#269fc5',height:1}}>
        </SafeAreaView>

    )
}



 renderHeader = () => {

    return (
      <View style={{backgroundColor:'#269fc5'}}>
      <SearchBar placeholder="Search Here" lightTheme round placeholderTextColor='#269fc5'
      containerStyle={{backgroundColor: '#269fc5'}} 
      inputStyle={{backgroundColor:'#fff'}} onChangeText={this.handleSearch}/>
      </View> 
      ); 
  };


	handleModal = (bool) => {
		this.setState({
			modal: bool
		})
	}





  renderItem = ({item}) => {

  return (
     <TouchableWithoutFeedback>
    <SafeAreaView style={{flex:1,flexDirection:'row',marginBottom:3}}>
        <Image style={{width:120,height:120,margin:5,resizeMode:'contain'}}
          source={{uri:item.image}}/>
          <View>
            <Text style={{position:'absolute',top:'15%',color:'#1da548'}}>
            {item.status}
            </Text>
            <Text style={{marginTop:"30%",fontWeight:'bold'}}>
              {item.resName}
             </Text>
             <Text style={{fontSize:12,opacity:0.7}}> 
              {item.address}
            </Text>
            <View  style={{position:'absolute',right:"-70%",marginTop:'10%'}}>
             <Text style={{backgroundColor:'green',padding:2,borderRadius:10,zIndex:2,color:'whitesmoke'}}>
              {item.ratings} <Icon name="ios-star" size={14} />
              </Text>
             </View>  
            <View style={{position:'absolute',right:"-65%",marginTop:'25%'}}>
             <Text style={{fontSize:12,color:'orange'}}>
              {item.distance}km
            </Text>
            </View>         
          </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
    )
}









cB1()
{
	this.setState({one:true,two:false,three:false,four:false});

}
cB2() {
	this.setState({one:false,two:true,three:false,four:false});
}
cB3() {
	this.setState({one:false,two:false,three:true,four:false});
}
cB4() {
	this.setState({one:false,two:false,three:false,four:true});
}

  render() {

    const isLoading = this.state.loading;
          return (

        isLoading ?

           <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

            <ActivityIndicator size="large" color="#269fc5" animating/>
              <Text> Loading Restaurants </Text> 

           </View>

           :

      
          <SafeAreaView style={styles.container}>
          <SafeAreaView style={{backgroundColor:'#269fc5'}}> 
          	<View>
          		<View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',top:'5%'}}>   
          			<Icon name="md-restaurant" size={36} color="black"/>       				
          			<Icon name="ios-home" size={36} color="yellow"/>	
          			<Icon name="ios-restaurant" size={36} color="black"/>

          		</View>
          		<View style={{alignItems:'flex-end',marginRight:12}}>
                   <Icon name="ios-options" size={36} color="whitesmoke"  onPress={()=> this.handleModal(true)}/>
          		</View>
          	</View>
          </SafeAreaView>
          <FlatList
             data={this.state.datasource}
             renderItem={this.renderItem}
             keyExtractor={(item,index) => index.toString()}
             ItemSeparatorComponent ={this.renderSeparator}
             ListHeaderComponent={this.renderHeader}
          />
			
        <Modal transparent={true} visible={this.state.modal} animationType="fade"> 
       <View style={{width:'80%',height:'50%',justifyContent:'center',alignSelf:'center',top:'15%',backgroundColor:'whitesmoke',borderRadius:25}}>
       <View style={{position:'absolute',top:'5%',justifyContent:'center',alignSelf:'center',borderBottomWidth:0.5,width:'100%'}}>
       		<View style={{justifyContent:'center',alignSelf:'center'}}>
				<Text style={{fontSize:20}}> Sort by </Text>		       
       		</View>
       	</View>	
  		<View style={{position:'absolute',right:15,top:4}}>	
  			<Icon name="ios-close" size={40} color="black" onPress={this.handleModal}/>      			
  		</View>
  		<View style={{position:'absolute',top:'20%',left:'10%'}}>
  			<View style={{flexDirection:'row',marginBottom:24}}>
  			<Text> Partner Stores </Text>
  			<CheckBox value={this.state.one} onChange={() => this.cB1()}/>
  			</View>
  			<View style={{flexDirection:'row',marginBottom:24}}>
  			<Text> Highest Ratings </Text>
  			<CheckBox value={this.state.two} onChange={() => this.cB2()}/>
  			</View>
  			<View style={{flexDirection:'row',marginBottom:24}}>
  			<Text> Nearest </Text>
  			<CheckBox value={this.state.three} onChange={() => this.cB3()}/>
  			</View>
  			<View style={{flexDirection:'row',marginBottom:24}}>
  			<Text> Alphabetical </Text>
  			<CheckBox value={this.state.four} onChange={() => this.cB4()}/>
  			</View>

  		</View>
       	<View style={{top:'35%'}}>
  			<View style={{width:'30%',position:'absolute',left:'15%',borderRadius:25 }}>	
  				<Button 
  					style={{borderRadius:25}}
  					title="Cancel"
  					onPress={this.handleModal}
  					/>

  			</View>
  			<View style={{width:'30%',position:'absolute',right:'15%',borderRadius:25 }}>

  				<Button 
  					style={{borderRadius:25}}
  					title="Okay"
  					onPress={this.handleModal}
  					/>

  			</View>
  		 	</View>
  		</View>
  		</Modal>
</SafeAreaView>


       
  		
          ); 
  }
 



}

export default restaurant;

const styles = StyleSheet.create({
    container:{
    flex:1,

  }
});
