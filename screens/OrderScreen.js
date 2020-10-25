import React, {useState,useEffect} from 'react';
import {View, Text, Button, StyleSheet,FlatList,ScrollView, Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme,} from '@react-navigation/native';

import ShoppingCartIcon from './ShoppingCartIcon'

const OrderScreen = (props) => {

  const {colors} = useTheme();

    const[allorders, setallorders] = useState([])
    // let orderid = props.route.params
    // console.log(orderid);
    const [count,setCount] = useState(0);

    let orderid;
    const [data,setdata] = useState([1,2,3,4,5,6,7])
    useEffect(() => {

    const fetchData = async () => {
  
    let userToken;
    userToken = null;
    try {
      userToken = await AsyncStorage.getItem('userToken');
    } catch (e) {
      console.log(e);
    }
    console.log(userToken);

    const encodedValue = encodeURIComponent(userToken);

          const result = await fetch(
            'https://mr-medicine-man.herokuapp.com/api/order/orderId?id='+encodedValue,
          ).then((response) => response.json())
          .then((json) => {
            setallorders(json);
            console.log(json)
            console.log("Orders" + allorders)
          })
          .catch((error) => {
            console.error(error);
          });
        };
        fetchData();
        console.log("Temp")
      }, [count]);


      
      const getStatus = async () => {
        //'https://stack-our-stock-inv.herokuapp.com/api/app/orders/'+orderid+'';
        const result = await
          axios.get(
            'https://stack-our-stock-inv.herokuapp.com/api/app/orders/'+orderid, 
            ).then(res => {
              console.log(res.data)
              if(res.data.status === "SHIPPED") {
                let date = new Date(res.data.createdAt)
                console.log('Creating Date---'+date +'\nTracking Id---' + res.data.trackingId)
                alert('Creating Date---'+date+' \nYour Tracking ID is--- ' + res.data.trackingId)
              }else {
                alert("Not Shipped")
              }
            }).catch(err => {
              console.log(err)
            }) 
        }




      const ItemView = (item) => {
        return (
          <View key={item} style={styles.item}>
            <Text style={styles.title}>OrderNO : {item}</Text>
            <TouchableOpacity style={styles.button2} onPress={() => {
                orderid = item + 30
                getStatus();
              }
            }>
              <Text style={{fontSize:15,fontWeight:'bold',color:'white'}}>STATUS</Text>
          </TouchableOpacity>
          </View>
        )
      }

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row'}}>
            </View>
      <ScrollView style={{flex:1}}>
          {allorders.map(ItemView)}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => {setCount(count + 1)}}>
              <Text style={{fontSize:30,fontWeight:'bold',color:'white'}}>Refresh</Text>
          </TouchableOpacity>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex:1,
   backgroundColor: '#F0F0F0',
   marginVertical: 8,
   height:100,
   flexDirection:'row',
   padding:20
 },
 title: {
   fontSize: 20,
   paddingLeft:20
 },
 button2 : {
  backgroundColor:'#009387',
 borderRadius:5,
 height:40,
 width:100,
 alignItems:'center',
 justifyContent:'center',
 marginLeft:40,
}, button: {
  backgroundColor:'#009387',
  width:'75%',
  borderRadius:5,
  height:60,
  alignItems:'center',
  justifyContent:'center',
  marginLeft:40,
  marginTop:10,
  marginBottom:10,
 }
});
