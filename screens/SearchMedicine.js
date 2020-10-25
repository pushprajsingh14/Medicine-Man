import React,{useState,useEffect} from 'react';
import {View, Text, Button,StyleSheet,Image,ScrollView, Alert,TouchableHighlight} from 'react-native';
//import {MedicalStore1} from '../constants/Data'



import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { servicesVersion } from 'typescript';
import { color } from 'react-native-reanimated';


const SearchMedicine = (props) => {

  const[Medicines, setMedicines] = useState([]);

// console.warn(props.route.params)
let medicine = props.route.params

// console.log(typeof(search))
  const [loading,setLoading] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        'https://stack-our-stock-inv.herokuapp.com/api/app/medicines/?name='+ medicine,
      ).then((response) => response.json())
      .then((json) => {
        setMedicines(json);
      })
      .catch((error) => {
        console.error(error);
      });
      setLoading(true)
    };
    fetchData();
    console.log("Medicnes by name")
  }, []);



    const ItemView = (item,key) => {
        return(
              
                 <TouchableOpacity key={item.id} onPress={() => {
                        const data = {
                          "id" : item.id,
                        }
                        props.navigation.navigate('Details of Medicine', {data})
                    }
                 }>                  
                    <View style={styles.card}>
                        <View style={styles.cardImgWrapper}>

                            <Image
                                source={require('../assets/Banners/Banner3.jpg')}
                                resizeMode="cover"
                                style={styles.cardImg}
                            />
                        </View>
                        <View style={{flex: 2,padding:10,borderColor: '#ccc',borderWidth: 1,borderLeftWidth: 0,borderBottomRightRadius: 8,borderTopRightRadius: 8,backgroundColor: '#fff'}}>
                             <Text style={styles.cardTitle}>{item.brandName.toUpperCase()}</Text>
                             <Text style={{color:'gray',fontStyle:'italic'}}>(Mfr: {item.manufacturer})</Text>
                              <Text style={styles.cardDetails}>Generic Name: {item.genericName} </Text>
                              <MaterialIcons name="navigate-next" color="#009387" size={20} style={{paddingLeft:200}}/>
                        </View>
                    </View>
            </TouchableOpacity>
                            
        ) 
    }

    return(
        <ScrollView style={StyleSheet.container}>
        {loading ? ( 
          <View style={styles.cardsWrapper}>
                 { Medicines.map(ItemView)}
            </View>
              ) : (
                <Icon name='loading1' size={50} style={{alignSelf:'center',marginTop:100}}></Icon>
              )
        }
            
          
        
       </ScrollView>
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
      fontSize:17,
      color:'#009387'
    },
    cardDetails: {
      paddingTop:5,
      fontSize: 15,
      color: 'black'
    },
})

export default SearchMedicine;

