import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'


const ShoppingCartIcon = (props) => (
    
    <View style={{marginRight:10 ,marginTop:20,height:60,width:60}}>
                <View style={{paddingHorizontal:10,marginTop:5}}>
                {/* <View style={{
                        position:"absolute",height:20,width:20,
                        borderRadius: 15,bottom:23,left:10,
                        alignItems:'center',justifyContent:'center', 
                        backgroundColor:'#009387',zIndex:2000
                    }}>
                        <Text style={{color:'white',fontWeight:'bold'}}>0</Text>
                    </View> */}
                    <View style={{marginTop:10}}>
                    <Icon name="ios-cart" size={30}  color={'#009387'}/>
                </View>
                </View>
            </View>
)

export default ShoppingCartIcon;