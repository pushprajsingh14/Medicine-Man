import React, {useState,useEffect} from 'react';
import {View, Text, Button, StyleSheet,FlatList,ScrollView, Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';


const YourOrder = (props) => {


  const[AddressOrder,setAddressOrder] = useState([])

  const [addhouseno, setaddhouseno] = useState("")
  const [addstreet, setaddstreet] = useState("")
  const [addcity, setaddcity] = useState("")
  const [addstate, setaddstate] = useState("")
  const [addpin, setaddpin] = useState("")
  const [hover,sethover] = useState(true)
  const [hover2,sethover2] = useState(true)
  const [alladdress, setalladdress] = useState([[]])

    let medicines = props.route.params[0]
    let totalPrice = props.route.params[1]

    const [addressid,setAddressId] = useState()


    ////////ADD ADDRESSS

  const Addaddress = async  () => {

          if(addhouseno != "" && addstreet != "" && addcity != "" && addstate != "" && addpin != ""){
          let userToken;
        userToken = null;
        try {
          userToken = await AsyncStorage.getItem('userToken');
        } catch (e) {
          console.log(e);
        }
        console.log(userToken);
        const encodedValue = encodeURIComponent(userToken);


          const result = await
            axios.post(
              'https://mr-medicine-man.herokuapp.com/api/user/address/'+encodedValue +'', 
              {
                "addHouseNo":addhouseno,
                "addStreet": addstreet,
                "addCity":addcity,
                "addState":addstate,
                "addPincode":addpin
            },
              {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                }
              }
              ).then(res => {
                console.log(res.data)
               setAddressId(res.data)
                console.log("Address Added")
              }).catch(err => {
                console.log(err)
              }) 
              setAddressOrder([addhouseno,addstreet,addcity,addstate,addpin])
              console.log("Order Address" + AddressOrder)
              sethover(false)
              alert('Address added')
            }
          else{
            Alert.alert('Sorry!', 'Please enter all details.', [
              {text: 'Okay'},
            ]);
          }
  }


    ///PLACE YOUR ORDER

    const placeOrder =  async () => {

      let order_id;
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      console.log(userToken);
      const encodedValue = encodeURIComponent(userToken);

      
        const result1 = await
          axios.post(
            'https://mr-medicine-man.herokuapp.com/api/order?user_id='+encodedValue+'&address_id='+addressid+'', 
            {
                "orderDate":"2020-10-02",
                "orderStatus":"Pending",
                "orderIsOrdered":"True"      
          },
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            }
            ).then(res => {
              console.log("orderid" + res.data)
              // setAddressId(res.data)
              order_id = res.data
              console.log("Order placed")
            }).catch(err => {
              console.log(err)
            }) 
            sethover(false)

      console.log("order id is :" + order_id);
      props.navigation.navigate('allOrders',order_id)

    }


    ////GET ADDRESS

      const getaddress = async () => {
        let userToken;
        userToken = null;
        try {
          userToken = await AsyncStorage.getItem('userToken');
        } catch (e) {
          console.log(e);
        }
        console.log(userToken);
        const encodedValue = encodeURIComponent(userToken);

        const result = await
          axios.get(
            'https://mr-medicine-man.herokuapp.com/api/user/address/'+encodedValue +'', 
            ).then(res => {
              console.log(res.data)
              setalladdress(res.data)
              console.log("ADDESS :"+  alladdress)
            }).catch(err => {
              console.log(err)
            }) 
            sethover2(false)
          }


          const ItemView = (item1) => {
            return (
              <View key={item1} style={{}}>
                <Text style={styles.title}>{item1}</Text>
              </View>
            )
          }



        const renderItem = ({item}) => (
          <ScrollView key={item.pharmaId} style={styles.item}>
            <Text style={styles.title}>{item.brandName.charAt(0).toUpperCase() + item.brandName.slice(1)}</Text>
            <View style={{flexDirection:'row',padding:5}}>
            <View style={{backgroundColor:'#707070',borderRadius:10,marginLeft:5,padding:5}}>
            <Text style={styles.title}> Qyt : {item.quantity}</Text>
            </View>
            <Text style={{fontSize:20,marginLeft:50}}> ₹ {item.price.toFixed(2)}</Text>
            </View>
          </ScrollView>
          );


  return (
    <View style={styles.container}>
      {hover ? ( hover2 ? (
      <View>
        <View>
        <TextInput style={styles.text} keyboardType="numeric" placeholder="House number" onChangeText={(val) => setaddhouseno(val)} />
        <TextInput style={styles.text} placeholder="Street name" onChangeText={(val) => setaddstreet(val)}/>
        <TextInput style={styles.text} placeholder="City" onChangeText={(val) => setaddcity(val)} />
        <TextInput style={styles.text} placeholder="State" onChangeText={(val) => setaddstate(val)}/>
        <TextInput style={styles.text} keyboardType="numeric" placeholder="Pincode" onChangeText={(val) => setaddpin(val)}/>
        </View>
      
  
        <TouchableOpacity style={styles.button} onPress={() => {Addaddress()}}>
              <Text style={{fontSize:30,fontWeight:'bold',color:'white'}}>ADD ADDRESS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {getaddress()}}>
              <Text style={{fontSize:30,fontWeight:'bold',color:'white'}}>Stored Addresses</Text>
          </TouchableOpacity>
      </View>
          ):(
            <View style={{flex:1}}>
            <ScrollView>
                {alladdress.map(item => 
                <View key={item} style={styles.item} >
                  {item.map(ItemView)}
                  <TouchableOpacity style={styles.button2} onPress={() => {
                    setAddressId(item[0])
                    setAddressOrder([item[0],item[1],item[2],item[3],item[4],item[5]])
                    sethover(false)
                    console.log("OrderAddress:" +AddressOrder)
                    }}>
                  <Text style={{fontSize:15,fontWeight:'bold',color:'white'}}>SELECT</Text>
                    </TouchableOpacity>
                  </View>)}
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => {sethover2(true)}}>
              <Text style={{fontSize:30,fontWeight:'bold',color:'white'}}>Back</Text>
          </TouchableOpacity>
            </View>
          )) : (
            <View style={{flex:1}}>
              <View style={{}}>
              <Text style={{paddingLeft:20,paddingBottom:10}}><Text style={{fontWeight:'bold'}}>ADDRESS:                                                                                  </Text> {AddressOrder.map(item =><Text key={item}>{item} ,</Text>)}</Text>
              </View>
              <FlatList
        data={medicines}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
              <View>
              <Text style={{fontSize:30,marginLeft:30,padding:10}}>Amount : ₹ {totalPrice}</Text>
              </View>

            <TouchableOpacity style={styles.button} onPress={() => {placeOrder()}}>
              <Text style={{fontSize:30,fontWeight:'bold',color:'white'}}>PLACE ORDER</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {sethover(true)}}>
              <Text style={{fontSize:30,fontWeight:'bold',color:'white'}}>CHANGE ADDRESS</Text>
          </TouchableOpacity>
            </View>
          )
          } 
    </View>
  );
};

export default YourOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:40
  },
  text: {
    alignSelf:'center',
    width:'50%',
    borderWidth:1
  },
  button: {
    backgroundColor:'#009387',
    width:'75%',
    borderRadius:5,
    height:60,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:40,
    marginTop:10,
    marginBottom:10,
   },
   button2 : {
     backgroundColor:'#009387',
    width:'75%',
    borderRadius:5,
    height:60,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:40
   },
   item: {
    
    backgroundColor: '#F0F0F0',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  }
});
