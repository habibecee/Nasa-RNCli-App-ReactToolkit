import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GeneralStyles, colors, fonts} from '../Utils/GeneralStyles';
import Home from '../pages/Home';
import HomeIcon from '../components/HomeIcon';
import UserIcon from '../components/UserIcon';
import Categories from '../pages/Categories';
import Account from '../pages/Account';
import ListIcon from '../components/ListIcon';
import CategoryDetails from '../pages/CategoryDetails';
import EventDetails from '../pages/EventDetails';
import Events from '../pages/Events';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function StackNavigator() {
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
      <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
    </Stack.Navigator>
  );
}

function Navigations() {
  return (
    <NavigationContainer>
      <SafeAreaView style={GeneralStyles.SafeAreaView}>
        <Tab.Navigator
          screenOptions={() => ({
            tabBarActiveTintColor: colors.dark,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: colors.tertiary,
              justifyContent: 'center',
              alignItems: 'center',
              height: 75,
              padding: 10,
            },
            tabBarLabelStyle: {
              fontFamily: fonts.bold,
              fontSize: 18,
            },
          })}
          initialRouteName="Categories">
          <Tab.Screen
            name="Category List"
            component={StackNavigator}
            options={{
              headerShown: false,

              tabBarIcon: () => <ListIcon />,
            }}
          />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,

              tabBarIcon: () => <HomeIcon />,
            }}
          />
          <Tab.Screen
            name="Account"
            component={Account}
            options={{
              headerShown: false,

              tabBarIcon: () => <UserIcon />,
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default Navigations;
