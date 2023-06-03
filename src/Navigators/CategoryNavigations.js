import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Categories from '../pages/Categories';
import CategoryDetails from '../pages/CategoryDetails';
import Events from '../pages/Events';
import EventDetails from '../pages/EventDetails';
import {colors, fonts} from '../Utils/GeneralStyles';

const Stack = createNativeStackNavigator();

function CategoryNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
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
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen
        name="CategoryDetails"
        component={CategoryDetails}
        options={({route}) => {
          return {
            title: route?.params?.title,
          };
        }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetails}
        options={({route}) => {
          return {
            title: route?.params?.title,
          };
        }}
      />
      <Stack.Screen name="Events" component={Events} />
    </Stack.Navigator>
  );
}

export default CategoryNavigation;
