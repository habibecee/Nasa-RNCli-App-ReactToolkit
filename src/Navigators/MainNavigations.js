import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GeneralStyles, colors, fonts} from '../Utils/GeneralStyles';
import Home from '../pages/Home';
import HomeIcon from '../components/HomeIcon';
import UserIcon from '../components/UserIcon';
import ListIcon from '../components/ListIcon';
import AccountNavigation from './AccountNavigations';
import CategoryNavigation from './CategoryNavigations';
import MediaIcon from '../components/MediaIcon';
import NasaMediaNavigation from './NasaMediaNavigations';

const Tab = createBottomTabNavigator();

function MainNavigations() {
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
              paddingVertical: 10,
              paddingHorizontal: 20,
            },
            tabBarLabelStyle: {
              fontFamily: fonts.bold,
              fontSize: 18,
            },
          })}
          initialRouteName="Home">
          <Tab.Screen
            name="Categories"
            component={CategoryNavigation}
            options={{
              headerShown: false,
              tabBarIcon: () => <ListIcon />,
            }}
          />
          <Tab.Screen
            name="NASA"
            component={NasaMediaNavigation}
            options={{
              headerShown: false,
              tabBarIcon: () => <MediaIcon />,
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
            name="My Account"
            component={AccountNavigation}
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

export default MainNavigations;
