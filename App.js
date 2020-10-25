import React, {useEffect,useState} from 'react';
import {View, ActivityIndicator, Alert} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';


import {DrawerContent} from './screens/DrawerContent';


import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import YourOrder from './screens/YourOrder';

import {AuthContext} from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  
  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,

          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,

          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,

          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (userName, password) => {
        var data = 'apple';
        
        const regis = await fetch(
          'https://mr-medicine-man.herokuapp.com/api/user/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userEmail: userName,
              userPassword: password,
            }),
          },
        )
          .then((response) => response.text())
          .then((response) => {
            console.log(response);
            data = response;
            
            
          })
          .catch((err) => console.log(err));
         
         if (data != 'Email/Password is incorrect' && data != 'apple' && data < 1000) {
          try {
            await AsyncStorage.setItem('userToken', data);
          } catch (e) {
            console.log(e);
          }
          dispatch({type: 'LOGIN', token: data});
        } else {
          console.log(data);
          Alert.alert('Sorry!', 'Please enter correct email/password.', [
            {text: 'Okay'},
          ]);
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: async (fullName, username, password, mobile) => {
        // alert('pressed');
        var data1 = 'apple';
        var flag = 0;
        const regis = await fetch(
          'https://mr-medicine-man.herokuapp.com/api/user',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userName: fullName,
              userEmail: username,
              userPassword: password,
              userPhoneNo: mobile,
            }),
          },
        )
          .then((response) => response.text())
          .then((response) => {
            console.log(response);
            data1 = response;
            flag = 1;
            Alert.alert(
              'Congratulations!',
              'You just joined an Amazing Team.',
              [{text: 'Okay'}],
            );
          })
          .catch((err) => console.log(err));

        try {
          await AsyncStorage.setItem('userToken', data1);
        } catch (e) {
          console.log(e);
        }
        if(flag)
          dispatch({type: 'REGISTER', token: data1});
      },

      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
       
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#009387" />
      </View>
    );
  }
  return (
  
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null ? (
            <Drawer.Navigator
              drawerContent={(props) => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
              <Drawer.Screen name="SupportScreen" component={SupportScreen} />
              <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
              <Drawer.Screen name="YourOrder" component={YourOrder} />
            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  
  );
};

export default App;
