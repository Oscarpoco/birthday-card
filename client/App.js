import React from 'react';

// NAVIGATIONS
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import { CardsScreen } from './screens/GalleryScreen';
import {CreateScreen} from './screens/CreateCardScreen';
import { SplashScreen } from './screens/SplashScreen';
import { IconDetailScreen } from './screens/IconDetailsScreen';

// EXTRA IMPORTS
import Toast from 'react-native-toast-message';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Platform, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';


// NAVIGATION
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Cards"
      screenOptions={{
        tabBarActiveTintColor: '#FF69B4',
        tabBarInactiveTintColor: '#9BA3A3',
        tabBarButton: (props) => <Pressable {...props} style={props.style} />,
        tabBarShowLabel: true,
        tabBarLabelStyle: 
        {
          fontSize: 13,
          fontWeight: '900',
          marginBottom: Platform.OS === 'ios' ? 0 : 8,
          letterSpacing: 1
        },

        headerShown: false,
        tabBarStyle: 
        {
          position: 'absolute',
          height: Platform.OS === 'ios' ? 85 : 70,
          backgroundColor: '#F8F9FA',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: 
          {
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

      {/* CARDS NAVIGATION */}
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
          title: 'Gallery',
          headerTitleStyle: {
            color: 'rgba(0, 0, 0, .5)', 
            fontSize: 18,
            fontWeight: 'bold',
            letterSpacing: 1.5
          },
        }}
      />
      {/* ENDS */}


      {/* CREATE SCREEN */}
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
                size={45}
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
          headerTitleStyle: {
            color: 'rgba(0, 0, 0, .5)', 
            fontSize: 18,
            fontWeight: 'bold',
            letterSpacing: 1.5
          },
        }}
      />
      {/* ENDS */}

      {/* TEMPLATES */}
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
          title: 'Templates',
          headerTitleStyle: {
            color: 'rgba(0, 0, 0, .5)', 
            fontSize: 18,
            fontWeight: 'bold',
            letterSpacing: 1.5
          },
        }}
      />
      {/* ENDS */}

    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>

        {/* SPLASH SCREEN */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        {/* ENDS */}

        {/* MAIN SCREEN */}
        <Stack.Screen name="MainApp" component={TabNavigator} />
        {/* ENDS */}

        {/* TEMPLATES */}
        <Stack.Screen name="Templates" component={CreateScreen}
          options={{
            headerShown: true,
            headerStyle: {
            },
            headerTitleStyle: {
              color: 'rgba(0, 0, 0, .5)', 
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 1,
            },
          }}
        />
        {/* ENDS */}



        {/* DETAILS SCREEN FOR CREATING THE CARD */}
        <Stack.Screen name="IconDetail" component={IconDetailScreen}
          options={{
            headerShown: true,
            title: 'Create',
          }}
        />
        {/* ENDS */}

      </Stack.Navigator>

      {/* STATUS BAR */}
      <StatusBar barStyle="dark-content" backgroundColor='#FFF' />
      {/* ENDS */}

      {/* TOAST */}
      <Toast />
      {/* ENDS */}

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
    top: -50,
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderWidth: 5,
    backgroundColor: '#1BA3A3',
    borderColor: '#FFf',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  }
});

export default App;