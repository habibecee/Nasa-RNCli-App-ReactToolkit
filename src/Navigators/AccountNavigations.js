import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from '../pages/Account';
import LogIn from '../pages/LogIn';
import SignIn from '../pages/SignIn';

const Stack = createNativeStackNavigator();

function AccountNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

export default AccountNavigation;
