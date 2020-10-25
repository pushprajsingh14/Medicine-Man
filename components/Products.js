import React, { useState }  from "react";
import {View, Text, Button,StyleSheet,Image,ScrollView, Alert,TouchableHighlight} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {MedicalStore1} from '../constants/Data';

import Icon from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Products = (props) => {   

    const [isHover, setisHover] = useState(false);
    const [qyt, setqyt] = useState(1);
    
    const handlePress = () => {
      setisHover(true);
    }

    const handleInc = () => {
      console.log(qyt);
      setqyt(qyt + 1);
    }

    const handleClose = () => {
      setisHover(false);
    }

    const SingleCardSreen = ()=> {
      navigation.navigate('List of Pharmacies')
    }

    const ItemView = (item,key) => {
        return(
                 
                    <View style={styles.card}>
                        <View style={styles.cardImgWrapper}>
                            <Image
                                source={require('../assets/Banners/Banner3.jpg')}
                                resizeMode="cover"
                                style={styles.cardImg}
                            />
                        </View>
                        <View style={{flex: 2,padding:10,borderColor: '#ccc',borderWidth: 1,borderLeftWidth: 0,borderBottomRightRadius: 8,borderTopRightRadius: 8,backgroundColor: '#fff'}}>
                             <Text style={styles.cardTitle}>{item.id}. {item.brand_name}</Text>
                              <Text style={styles.cardDetails}>Generic Name: {item.generic_name} </Text>
                               {/* {isHover && (
                                  <View style={{left:100,top:35,width:110,zIndex:99,borderRadius:6,height:30,backgroundColor:'#C0C0C0'}}>
                                      <View style={{flexDirection:'row',padding:5}}>
                                          <TouchableOpacity onPress={handleClose}><Ionicons name='trash' size={20}></Ionicons></TouchableOpacity>
                                          <Text style={{paddingLeft:20,paddingRight:20}}>{qyt}</Text>
                                          <TouchableOpacity onPress={handleInc}><Icon name='plus' size={20}></Icon></TouchableOpacity>
                                      </View>
                                  </View>
                                )} 
                             <View style={{flexDirection:'row',marginLeft:140,marginTop:10}}>
                                {!isHover && (
                                  <TouchableOpacity onPress={handlePress}>
                                      <Icon style={{}} name='pluscircleo' size={30}/>
                                  </TouchableOpacity>
                                )}
                                <TouchableOpacity>
                                    <MaterialIcons style={{marginLeft:25}} name='add-shopping-cart' size={25}></MaterialIcons>
                                </TouchableOpacity>
                             </View> */}
                        </View>
                    </View>
                  
            
        )
    }
    

    return(
        <ScrollView style={StyleSheet.container}>
          <TouchableHighlight onPress={() => props.navigation.navigate('Details of Medicine')}>
            <View style={styles.cardsWrapper}>
      
                {MedicalStore1.map(ItemView)}
              
            </View>
            </TouchableHighlight>
         </ScrollView>
        )
  }


export default Products;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardsWrapper: {
        marginTop: 5,
        width: '90%',
        alignSelf: 'center',
      },
      card: {
        height: 120,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
      },
      cardImgWrapper: {
        flex: 1,
      },
      cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
      },
      cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
      },
      cardTitle: {
        fontWeight: 'bold',
      },
      cardDetails: {
        fontSize: 12,
        color: '#444',
        
      },
})