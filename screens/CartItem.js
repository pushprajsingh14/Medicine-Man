import React,{useState,useEffect} from 'react';
import {View, Text, Button,StyleSheet,Image,ScrollView, Alert,TouchableHighlight} from 'react-native';

import { Avatar} from 'react-native-paper';

import { useTheme, useIsFocused } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'
import Icon from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MedicalStore1 from '../constants/Data'
import AsyncStorage from '@react-native-community/async-storage';

const CartItem = (props) => {

  const [Medicines, setMedicines] = useState([]);
  const [totalprice,setTotalPrice] = useState(0);
  const [Hover, setHover] = useState(true)
  const [count,setCount] = useState(0);
  let medicineId = 3;
  const [EmptyData,setEmptyData] = useState(false);

  const calculate = (item) => {
    var total = 0
    for(var i = 0; i < Medicines.length; i ++) {
      total += Medicines[i].quantity * Medicines[i].price
    }
    total = total.toFixed(2);
    setTotalPrice(total)
    setHover(false)
  }
  
  const deleteitem = async () => {

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
      axios.delete(
        'https://mr-medicine-man.herokuapp.com/api/cart?userId='+encodedValue +'&medicineId='+medicineId, 

        ).then(res => {
          console.log(res.data)
          if(res.data === "Already ordered can't be removed") {
            alert(`Already ordered can't be removed`)
          }
        }).catch(err => {
          console.log(err)
        }) 
        setHover(true)
        setCount(count + 1)
      }


const [loading,setLoading] = useState(false)
    const {colors} = useTheme();
      
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
          'https://mr-medicine-man.herokuapp.com/api/cart/'+encodedValue +'',
        ).then((response) => response.json())
        .then((json) => {
          setMedicines(json);
          if(Array.isArray(json) && json.length) {
            setEmptyData(true)
        }
        })
        .catch((error) => {
          console.error(error);
        });
        setLoading(true)
      };
      fetchData();
      console.log("Temp")
    }, [count]);


    const changeHover = () => {
      setHover(true)
    }

    const ItemView = (item,key) => {
        return(

                    <View key={item.id} style={styles.card}>
                        <View style={styles.cardInfo}>
                          <View style={{flexDirection:'row'}}>
                            <MaterialIcons name="arrow-forward-ios" size={20}></MaterialIcons>
                             <Text style={styles.cardTitle}>{item.brandName.toUpperCase()}</Text>
                             </View>
                              <Text style={styles.cardDetails}>Generic Name: {item.genericName} </Text>
                              <TouchableOpacity style={{}} onPress={() => {
                                          medicineId = item.id
                                          deleteitem()
                                }}>
                                    <Icon name='minuscircleo' size={30} style={{marginLeft:300}}></Icon>
                              </TouchableOpacity>
                              <View style={{flexDirection:'row',paddingTop:25}}>
                                <Text style={{fontSize:20,color:'#009387'}}>$ {item.price.toFixed(2)}</Text>
                                <View style={{borderRadius:10,marginLeft:50}}><Text style={{fontSize:20,fontWeight:'bold'}}>Qyt : {item.quantity}</Text></View>
                              </View>
                        </View>
                    </View>            
        ) 
    }

    return(
      <View style={{flex:1}}>
        <ScrollView style={StyleSheet.container}>
        {loading ? (EmptyData ? ( 
            <View style={styles.cardsWrapper}>
                 {Medicines.map(ItemView)} 
            </View>
        ):(
          <View>
            <Text style={{textAlign:'center',fontSize:20,color:'#05375a',fontWeight:'bold'}}>No items added to the cart</Text>
          </View>
        )) : (
          <Icon name='loading1' size={50} style={{alignSelf:'center',marginTop:100}}></Icon>
        )
        }
       </ScrollView>
        <View style={{padding:10,borderTopWidth:0.5}}>
          {Hover ? (
          <TouchableOpacity style={styles.button2} onPress={() => {calculate()}}>
              <Text style={{fontSize:30,fontWeight:'bold',color:'white'}}>TOTAL</Text>
          </TouchableOpacity>
          ) : (
            <View>
            <TouchableOpacity onPress={changeHover}>
                <View>
              <Text style={{fontSize:30,marginLeft:30,padding:10}}>$ {totalprice}</Text>
              </View>
              </TouchableOpacity>
              {totalprice > 0 && 
               <TouchableOpacity style={styles.button} onPress={() => {
                props.navigation.navigate('YourOrder',[Medicines,totalprice])}}>
                 <Text style={{fontSize:30,fontWeight:'bold',color:'white'}}>CHECKOUT</Text>
             </TouchableOpacity>
              }
             </View>
          )
          }
          </View>
      </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardsWrapper: {
        marginTop: 5,
        width: '100%',
        alignSelf: 'center',
      },
      card: {
        height: 150,
        marginVertical: 10,
        flexDirection: 'row',
        elevation: 5,
      },
      cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: 'white',
      },
      cardTitle: {
        fontWeight: 'bold',
        fontSize:20
      },
      cardDetails: {
        fontSize: 12,
        color: '#444',
        
      },
      text: {
        color: 'gray',
        marginTop: 5,
      },
      button: {
       backgroundColor:'#009387',
       width:'90%',
       borderRadius:5,
       height:60,
       alignItems:'center',
       justifyContent:'center',
       marginLeft:10
      }
      ,
      button2: {
        backgroundColor:'#009387',
        width:'90%',
        borderRadius:5,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:10,
        bottom:5
       },
      signIn: {
        width: 140,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      textSign: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:20
      }
})

export default CartItem;

