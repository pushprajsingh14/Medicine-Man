import React, {useState,useEffect} from 'react';
import {View, Text, Button, StyleSheet, StatusBar,TouchableWithoutFeedback,Dimensions,Image, ScrollView,} from 'react-native';
import axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import MedicalStore1 from '../constants/Data'

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';


const MedicineCartScreen = (props) => {

  /////HOOOOKKSSSSS//////////////
  const {colors} = useTheme();
  const [loading,setLoading] = useState(false)
  const [medicineobject,setMedicineObject] = useState({})

  let med_id = props.route.params.data.id;
  
  let med_price = medicineobject.price

  

  const [isHover, setisHover] = useState(false);
  const [qyt, setqyt] = useState(0);

  const handlePress = () => {
    setisHover(true);
    setqyt(qyt + 1)
  }

  const handleInc = () => {
    setqyt(qyt + 1);
  }

  const handleDec = () => {
    setqyt(qyt - 1);
  }

  const handleClose = () => {
    setisHover(false);
  }
  //#C0C0C0

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        'https://stack-our-stock-inv.herokuapp.com/api/app/medicine/'+med_id,
      ).then((response) => response.json())
      .then((json) => {
        setMedicineObject(json);
      })
      .catch((error) => {
        console.error(error);
      });
      setLoading(true)
    };
    fetchData();
    console.log("Medicine Cart")
  }, []);
  
console.log("QYT : "+qyt)

const [fetchdata, setFetchData] = useState({})
  
const AddToCart = async () => {
  setLoading(false)
  let userToken;
  userToken = null;
  try {
    userToken = await AsyncStorage.getItem('userToken');
  } catch (e) {
    console.log(e);
  }
  console.log(userToken);
  const encodedValue = encodeURIComponent(userToken);

  console.log("SEE" + qyt)

  const result = await
    axios.post(
      'https://mr-medicine-man.herokuapp.com/api/cart?user_id='+encodedValue+'&medicine_id=' + med_id, 
      {
        "quantity": qyt,
        "price": med_price
      },
      {
         headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
         }
      }
      ).then(res => {
        console.log(res.data)
        console.log("Qyt:"+qyt)
        setFetchData(res)
      }).catch(err => {
        console.log(err)
      }) 
      console.log("Medicine Added")
      props.navigation.navigate('Cart Item Screen')
      setLoading(true)
    }

  return (
  
    <View style={styles.container}>
  {loading ? (<View>
    <StatusBar backgroundColor="#009387" barStyle="light-content" />
    <View style={styles.header}>
      <Animatable.Image
        animation="bounceIn"
        duraton="1500"
        source={require('../assets/Banners/Banner6.jpg')}
        style={styles.logo}
        resizeMode="cover"
      />
    </View>
    
    <Animatable.View
      style={[
        styles.footer,
        {
          backgroundColor: colors.background,
        },
      ]}
      animation="fadeInUpBig">
        <ScrollView>
          <View style={{flexDirection:'row'}}>
      <Text
        style={[
          styles.title,
          {color:colors.text,}
        ]}>
        {medicineobject.brandName}
      </Text>

        <Text style={{color: colors.text,fontSize: 30,fontWeight: 'bold',paddingLeft:60}}>₹ {medicineobject.price.toFixed(2)}</Text>
  
        </View>
        <TouchableWithoutFeedback onPress = {handleClose}>
    <View style={{height:200,width:300,backgroundColor:colors.background,marginTop:20}}>
      <Text style={{fontSize:20,color:colors.text,}}>{medicineobject.genericName.toUpperCase()}</Text>
        <View style={{flexDirection:'row',padding:20,backgroundColor:'#F0F0F0',width:'120%',marginTop:10}}>
          <View>
            <Text style={{fontSize:20}}>ExpiryDate : </Text>
            <Text>{medicineobject.expiryDate} </Text>
          </View>
          <View style={{paddingLeft:50}}>
          <Text style={{fontSize:20}}>ManufactureDate : </Text>
          <Text>{medicineobject.manufactureDate}</Text>
          </View>
        </View>
        <Text style={{paddingTop:20,fontSize:20,color:'red'}}>Manufacturer : {medicineobject.manufacturer.toUpperCase()}</Text>
      </View>
      </TouchableWithoutFeedback> 
      {isHover && (
            <View style={{width:320,height:90,zIndex:200,borderRadius:6,backgroundColor:'#009387',marginTop:20}}>
                <View style={{flexDirection:'row',padding:5}}>
                  {qyt > 0 ? (
                    
                     <TouchableOpacity onPress={handleDec}><Icon style={{padding:10}} name='minus' size={55} ></Icon></TouchableOpacity>
                  ): (
                    <TouchableOpacity onPress={handleClose}><Ionicons style={{padding:10}} name='trash' size={55} ></Ionicons></TouchableOpacity>
                  )}
                    <Text style={{paddingLeft:50,paddingRight:30,fontSize:55}}>{qyt}</Text>
                    <TouchableOpacity onPress={handleInc}><Icon style={{padding:10,left:20}} name='plus' size={55}></Icon></TouchableOpacity>
                    
                </View>
            </View> 
        )} 

        {!isHover && (
            <View style={{flexDirection:'row',width:300,marginLeft:30,marginTop:20}}> 
              <TouchableOpacity onPress={handlePress}>
                { qyt > 0 ? (
                  <View style={{backgroundColor:'#009387',width:70,alignItems:'center',borderRadius:35,height:70,marginTop:10}}>
                    <Text style={{fontSize:40,padding:5}}>{qyt}</Text>
                  </View>
                ) : (
                  <View>
                    <Icon style={{}} name='pluscircleo' size={60} color="#009387"/>
                    <Text style={{paddingTop:10,left:17,color:'#009387'}}>QTY</Text>
                  </View>
                )
                }

              </TouchableOpacity>
            
              <TouchableOpacity style={{width:200}}>
                <View style={{marginLeft:120}}>

                  <TouchableOpacity onPress={AddToCart}><MaterialIcons style={{}} name='add-shopping-cart' size={60} color="#009387"></MaterialIcons></TouchableOpacity>
                </View>
                  <Text selectionColor="red" style={{marginTop:10,left:110,color:'#009387'}} >ADD TO CART</Text>
              </TouchableOpacity>          
          </View> 
       )}
       </ScrollView>
    </Animatable.View>
    </View>) : (
      <View>
        <Icon name='loading1' size={50} style={{alignSelf:'center',marginTop:100}}></Icon>
      </View>
    ) }
  </View>
);
};
const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

export default MedicineCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  logo: {
    width: 400,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 20,
    
  },
  signIn: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
