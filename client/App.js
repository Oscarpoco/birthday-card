import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { CardsScreen } from './screens/GalleryScreen';
import {CreateScreen} from './screens/CreateCardScreen';
import { SplashScreen } from './screens/SplashScreen';
import { IconDetailScreen } from './screens/IconDetailsScreen';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Cards"
      screenOptions={{
        tabBarActiveTintColor: '#FF69B4',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
        headerShown: false,
          tabBarStyle: {
            height: 70,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
            backgroundColor: '#F0F0F0',
          },
          
      }}
    >
      <Tab.Screen
        name="Cards"
        component={CardsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="birthday-cake" size={28} color={color}/>
          ),
          headerShown: true,
          title: 'Gallery'
        }}
      />


      <Tab.Screen
        name="Template"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cards" size={28} color={color} />
          ),
           headerShown: true,
           title: 'Templates'
        }}
      />

      <Tab.Screen
        name="Create"
        component={IconDetailScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cards" size={28} color={color} />
          ),
           headerShown: true,
           title: 'Create'
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainApp" component={TabNavigator} />
        <Stack.Screen name="Templates" component={CreateScreen} />
        <Stack.Screen name="IconDetail" component={IconDetailScreen} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;