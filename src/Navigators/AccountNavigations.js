import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from '../pages/Account';
import LogIn from '../pages/LogIn';
import SignIn from '../pages/SignIn';
import {colors, fonts} from '../Utils/GeneralStyles';

const Stack = createNativeStackNavigator();

function AccountNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: fonts.bold,
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: colors.tertiary,
        },
        headerTintColor: colors.textDark,
        headerBackTitleStyle: {
          fontFamily: fonts.bold,
          color: colors.textDark,
          size: 20,
        },
      }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

export default AccountNavigation;
