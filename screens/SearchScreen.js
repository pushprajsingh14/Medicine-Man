import React, { useState , useEffect} from 'react';

import {View, Text, Button,StyleSheet,Image,ScrollView, Alert,TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/AntDesign'
const SearchScreen = (props) => {

    const[listPharmacies, setListPharmacies] = useState([])
    const [loading,setLoading] = useState(false)
    const [EmptyData,setEmptyData] = useState(false);
    
    let id = props.route.params
    console.log( "Location" + id);
    
    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch(
          'https://stack-our-stock-inv.herokuapp.com/api/app/pharmas?pincode='+ id,
        ).then((response) => response.json())
        .then((json) => {
          setListPharmacies(json);
          if(Array.isArray(json) && json.length) {
              setEmptyData(true)
          }
          console.log(json);
        })
        .catch((error) => {
          console.error(error);
        });
        setLoading(true)
      };
      fetchData();
      console.log("Pharamcies")
    }, []);

  
    const ItemView = (item) => {
        return(
            <TouchableOpacity key={item.pharmaId} onPress= {() => {
                        props.navigation.navigate('PharmacyDetails',[item.pharmaId])
                }
            }>
                    <View style={styles.card}>
                        <View style={styles.cardImgWrapper}>
                            <Image
                                source={require('../assets/Banners/Banner7.jpg')}
                                resizeMode="stretch"
                                style={styles.cardImg}
                            />
                        </View>
                        <View style={styles.cardInfo}>
                            <Text style={styles.cardTitle}>{item.pharmaName}</Text>
                            <Text style={styles.cardDetails}>Supplier Name : {item.firstName} {item.lastName}</Text>
                              <Text style={styles.cardDetails}>Pincode : {item.pincode}</Text>
                        </View>    
                    </View>
            </TouchableOpacity>
        )
    }
    
    return(
        <ScrollView style={StyleSheet.container}>
            {/* <View style={{width:100,height:50,backgroundColor:'white',flexDirection:'row',padding:5,alignItems:"center",marginLeft:70}}>
                    <Icon name="ios-search" style={{fontSize:24, marginTop:10}}/>
                    <TextInput onSubmitEditing={() => {props.navigation.navigate('Medicines List',medicine)}} onChangeText={(value) => setMedicine(value)} returnKeyType='done' placeholder="Search Medicines" style={{marginTop:10,width:230,height:50,borderColor:'gray',marginLeft:10}}/>
            </View> */}
        {loading ? (EmptyData ? ( 
            <View style={styles.cardsWrapper}>
                 {listPharmacies.map(ItemView)} 
            </View>
        ):(
          <View>
            <Text style={{textAlign:'center',fontSize:18,color:'#05375a',fontWeight:'bold',marginTop:100}}>No Pharamicies Found for the selected city</Text>
          </View>
        )) : (
            <Icon name='loading1' size={50} style={{alignSelf:'center',marginTop:100}}></Icon>
        )
        }
         </ScrollView>
        )
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    cardsWrapper: {
        marginTop: 5,
        width: '90%',
        alignSelf: 'center',
        marginTop:50
      },
      card: {
        height: 100,
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
        paddingLeft:10,
        paddingTop:5,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
      },
      cardTitle: {
        fontWeight: 'bold',
        fontSize:19
      },
      cardDetails: {
        fontSize: 15,
        color: 'gray',
        fontWeight: 'bold',
      },
})

export default SearchScreen;