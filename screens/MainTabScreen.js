import React, {useState, useEffect} from 'react';

import {TextInput,Text,StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ShoppingCartIcon from './ShoppingCartIcon'
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme,} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

import ProfileScreen from './ProfileScreen';
import CardListScreen from './cardListScreen';
import SearchScreen from './SearchScreen';
import MedicineCartScreen from './MedicineCartScreen';
import SearchMedicine from './SearchMedicine'
import YourOrder from './YourOrder'
import CartItem from './CartItem';

import OrderScreen from './OrderScreen'


const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


const MainTabScreen = () => (
  
  <Tab.Navigator initialRouteName="Home" activeColor="#fff" barStyle={{ backgroundColor: '#009387' }}>
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
  
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = (props) => {
 
 const {colors} = useTheme();
 const [medicine, setMedicine] = useState("");

  return(
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor:colors.background,
          elevation:0,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '',
          headerLeft: () => (
            <View style={{marginLeft:10,flexDirection:'row',marginTop:5}}>
              <Icon.Button
                name="ios-menu"
                size={30}
                color= {colors.text}
                backgroundColor={colors.background}
                style={{marginTop:20,height:80}}
                onPress={() => props.navigation.openDrawer()}></Icon.Button>
                <View style={styles.action}>
                  <TextInput
                    onSubmitEditing={() => {
                      props.navigation.navigate('Medicines List',medicine)}
                    }
                    placeholder="Search Medicine"
                    placeholderTextColor="#666666"
                    
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    autoCapitalize="none"
                    onChangeText={(val) => setMedicine(val)}
                />
              </View>
            </View>
          ),
          
          headerRight: () => (
            <TouchableOpacity onPress = {() => {props.navigation.navigate('Cart Item Screen')}}>
              <ShoppingCartIcon  style={{ color: colors.text }}/>
            </TouchableOpacity>
              
           )
        }}
      />
      <HomeStack.Screen
        name="PharmacyDetails"
        component={CardListScreen}
        options={{
          title: 'Medicines',
          headerLeft: () => (
            <View style={{marginLeft:10,flexDirection:'row',marginTop:5}}>
              <Icon.Button
                name="ios-menu"
                size={30}
                color= {colors.text}
                backgroundColor={colors.background}
                style={{marginLeft:5,marginTop:5}}
                onPress={() => props.navigation.openDrawer()}></Icon.Button>
                
              </View>
            
          ), headerLeft: () => (
            <View style={{marginLeft:10,flexDirection:'row',marginTop:5}}>
              <Icon
                name="ios-notifications"
                size={30}
                color= {colors.text}
                backgroundColor={colors.background}
                style={{marginLeft:5,marginTop:5}}
                onPress={() => props.navigation.navigate('allOrders')}></Icon>
                
              </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress = {() => {props.navigation.navigate('Cart Item Screen')}}>
              <ShoppingCartIcon />
            </TouchableOpacity>
              
          ),
        }}
        />

      <HomeStack.Screen
        name="List of Pharmacies"
        component={SearchScreen}
        options={{
          title: 'Pharmacies',
          headerLeft: () => (
            <View style={{marginLeft:10,flexDirection:'row',marginTop:5}}>
              <Icon
                name="ios-notifications"
                size={30}
                color= {colors.text}
                backgroundColor={colors.background}
                style={{marginLeft:5,marginTop:5}}
                onPress={() => props.navigation.navigate('allOrders')}></Icon>
                
              </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress = {() => {props.navigation.navigate('Cart Item Screen')}}>
              <ShoppingCartIcon />
            </TouchableOpacity>
          ),
        }}
        />

        <HomeStack.Screen
        name="Details of Medicine"
        component={MedicineCartScreen}
        options={{
          title: 'Medicine Detail',
          headerLeft: () => (
            <View style={{marginLeft:10,flexDirection:'row',marginTop:5}}>
              <Icon
                name="ios-notifications"
                size={30}
                color= {colors.text}
                backgroundColor={colors.background}
                style={{marginLeft:5,marginTop:5}}
                onPress={() => props.navigation.navigate('allOrders')}></Icon>
                
              </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress = {() => {props.navigation.navigate('Cart Item Screen')}}>
              <ShoppingCartIcon />
            </TouchableOpacity>
              
          ),
        }}
        />

    <HomeStack.Screen
        name="Medicines List"
        component={SearchMedicine}
        options={{
          title: '',
          headerLeft: () => (
            <View style={{marginLeft:10,flexDirection:'row',marginTop:5}}>
              <Icon.Button
                name="ios-menu"
                size={30}
                color= {colors.text}
                backgroundColor={colors.background}
                style={{marginLeft:5,marginTop:5}}
                onPress={() => props.navigation.openDrawer()}></Icon.Button>
                
              </View>
            
          ),
          headerRight: () => (
            <TouchableOpacity onPress = {() => {props.navigation.navigate('Cart Item Screen')}}>
              <ShoppingCartIcon />
            </TouchableOpacity>
              
          ),
        }}
        />

      <HomeStack.Screen
        name="YourOrder"
        component={YourOrder}
        options={{
          title: 'Place Your Order',
          headerRight: () => (
            <View style={{marginRight:10,flexDirection:'row',marginTop:5}}>
              <Icon
                name="ios-notifications"
                size={30}
                color= {colors.text}
                backgroundColor={colors.background}
                style={{marginLeft:5,marginTop:5}}
                onPress={() => props.navigation.navigate('allOrders')}></Icon>
                
              </View>
          )
      }}
      
          />

    <HomeStack.Screen
        name="Cart Item Screen"
        component={CartItem}
        options={{
          title: 'Order Summary', 
          headerRight: () => (
            <View style={{marginRight:10,flexDirection:'row',marginTop:5}}>
              <Icon
                name="ios-notifications"
                size={30}
                color= {colors.text}
                backgroundColor={colors.background}
                style={{marginRight:5,marginTop:5}}
                onPress={() => props.navigation.navigate('allOrders')}></Icon>
                
              </View>
          )  
        }}
        />


      <HomeStack.Screen
        name="allOrders"
        component={OrderScreen}
        options={{
          title: 'Orders',
          headerLeft: () => (
            <View style={{marginLeft:10,flexDirection:'row',marginTop:5}}>
              <Icon.Button
                name="ios-menu"
                size={30}
                color= {colors.text}
                backgroundColor={colors.background}
                style={{marginLeft:5,marginTop:5}}
                onPress={() => props.navigation.openDrawer()}></Icon.Button>
              </View>
            
          ),
          headerRight: () => (
            <TouchableOpacity onPress = {() => {props.navigation.navigate('Cart Item Screen')}}>
              <ShoppingCartIcon />
            </TouchableOpacity>
              
          )
        }}
      />

    </HomeStack.Navigator>

    
  )
  };

const DetailsStackScreen = ({navigation}) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <DetailsStack.Screen
      name="Details"
      component={DetailsScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
      }}
    />
  </DetailsStack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  action: {
    flexDirection: 'row',
    marginTop: 30,
    // borderBottomWidth: 1,
    // borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    width:280,
  },
  textInput: {
    flex: 1,
    marginTop:5,
    paddingLeft: 10,
    color: '#05375a',
    width:400,
    height:50,
  }
});