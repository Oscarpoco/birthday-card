import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from '../components/styles';


export const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 3000);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <LottieView
        source={require('../assets/birthday-animation.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
      <Text style={styles.splashText}>Birthday Cards</Text>
    </View> 
  );
}; 

