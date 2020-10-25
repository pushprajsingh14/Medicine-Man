import React, { useState } from "react";
import {View, Text, Button, StyleSheet, StatusBar, Alert,TouchableOpacity,} from 'react-native';
import { Headline , Paragraph , TextInput,} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';



const SupportScreen = () => {
  const [isSelected, setSelection] = useState(false);
  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [isSelected3, setSelection3] = useState(false);
  const [isSelected4, setSelection4] = useState(false);
  const [text, setText] = React.useState('');
  const {colors} = useTheme();


  return (
    <View style={[
      styles.container,
      {
        backgroundColor: colors.background,
      },
    ]}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Headline style={styles.header}>We will be HAPPY to help!</Headline>
      <Paragraph style={styles.paragraph}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </Paragraph>
      <View STYLE={styles.userInfoSection}>
          <View style={styles.row}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
              <Text style={{color:colors.text, marginLeft: 20,marginTop:5,}}>
              Lorem Ipsum is simply dummy text of the printing.
              </Text>
          </View>
          <View style={styles.row}>
            <CheckBox
              value={isSelected1}
              onValueChange={setSelection1}
              style={styles.checkbox}
            />
              <Text style={{color: colors.text, marginLeft: 20,marginTop:5,}}>
              Lorem Ipsum has been the industry's standard
              </Text>
          </View>
          <View style={styles.row}>
            <CheckBox
              value={isSelected2}
              onValueChange={setSelection2}
              style={styles.checkbox}
            />
              <Text style={{color: colors.text, marginLeft: 20,marginTop:5,}}>
              Lorem Ipsum has been the industry's standard
              </Text>
          </View>
          <View style={styles.row}>
            <CheckBox
              value={isSelected3}
              onValueChange={setSelection3}
              style={styles.checkbox}
            />
              <Text style={{color: colors.text, marginLeft: 20,marginTop:5,}}>
              Lorem Ipsum has been the industry's standard
              </Text>
          </View>
          <View style={styles.row}>
            <CheckBox
              value={isSelected4}
              onValueChange={setSelection4}
              style={styles.checkbox}
            />
              <Text style={{color: colors.text, marginLeft: 20,marginTop:5,}}>
              Others
              </Text>
          </View>
          <View style={styles.row}>
            <TextInput
              style={{width:'99%',height:80,justifyContent:'center',paddingLeft:25,}}
              label="Description"
              value={text}
              onChangeText={text => setText(text)}
            />
          </View>
      </View>

      <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              Alert.alert('Sorry for the issue.', 'Our Customer Executive will reach out to you soon!', [
                {text: 'Okay'},
              ]);
            }}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                SUBMIT
              </Text>
            </LinearGradient>
          </TouchableOpacity>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
    backgroundColor: '#fff',
  },
  header: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop:30,
  },
  paragraph: {
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingTop:30,
    marginBottom:30,
  },
  checkbox: {
    
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop:50,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  signIn: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:20,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
