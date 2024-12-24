import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { CardsScreen } from './screens/GalleryScreen';
import {CreateScreen} from './screens/CreateCardScreen';
import { SplashScreen } from './screens/SplashScreen';
import { IconDetailScreen } from './screens/IconDetailsScreen';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Platform, Pressable } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Cards"
      screenOptions={{
        tabBarActiveTintColor: '#FF69B4',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarButton: (props) => <Pressable {...props} style={props.style} />,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '900',
          marginBottom: Platform.OS === 'ios' ? 0 : 8,
          letterSpacing: 1
        },
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          height: Platform.OS === 'ios' ? 85 : 70,
          backgroundColor: '#F8F9FA',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
          paddingTop: 5,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
        },
      }}
    >
      <Tab.Screen
        name="Cards"
        component={CardsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="birthday-cake"
              size={26}
              color={color}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }]
              }}
            />
          ),
          headerShown: true,
          title: 'Gallery'
        }}
      />



      <Tab.Screen
        name="Create"
        component={IconDetailScreen}
        initialParams={{
          image: require('./assets/birthday-animation.json'),
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.middleIcon}>
              <Ionicons
                name="add"
                size={32}
                color="#FFF"
                style={{
                  transform: [{ scale: focused ? 1.1 : 1 }]
                }}
              />
            </View>
          ),
          headerShown: true,
          title: 'Create',
          tabBarLabel: '',
        }}
      />

      <Tab.Screen
        name="Template"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="cards"
              size={26}
              color={color}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }]
              }}
            />
          ),
          headerShown: true,
          title: 'Templates'
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
        <Stack.Screen name="IconDetail" component={IconDetailScreen}
          options={{
            headerShown: true,
            title: 'Create',
          }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

  container: 
  {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  tabBar: 
  {
    position: 'relative',
    height: 80,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },

  middleIcon: 
  {
    position: 'absolute',
    top: -20,
    alignSelf: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#FF69B4',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF69B4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1,
  }
});

export default App;