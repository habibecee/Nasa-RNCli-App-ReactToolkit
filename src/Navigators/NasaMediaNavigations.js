import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NasaMedia from '../pages/NasaMedia';
import {colors, fonts} from '../Utils/GeneralStyles';
import NasaMediaDetails from '../pages/NasaMediaDetails';
import NasaMedias from '../pages/NasaMedias';

const Stack = createNativeStackNavigator();

function NasaMediaNavigation({route}) {
  return (
    <Stack.Navigator
      initialRouteName="NasaMedia"
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
      <Stack.Screen name="NasaMedia" component={NasaMedia} />
      <Stack.Screen
        name="NasaMedias"
        component={NasaMedias}
        options={({route}) => ({
          title:
            route.params.typeOf === 'image' ? 'Nasa Images' : 'Nasa Videos',
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
        })}
      />
      <Stack.Screen name="NasaMediaDetails" component={NasaMediaDetails} />
    </Stack.Navigator>
  );
}

export default NasaMediaNavigation;
