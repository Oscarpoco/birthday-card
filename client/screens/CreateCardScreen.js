import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

// CARD ANIMATIONS
export const birthdayCards = [
  { id: 1, source: require('../assets/card1.json') },
  { id: 2, source: require('../assets/card2.json') },
  { id: 3, source: require('../assets/birthday-animation.json') },
  { id: 4, source: require('../assets/card4.json') },
  { id: 5, source: require('../assets/card5.json') },
  { id: 6, source: require('../assets/card6.json') },
  { id: 7, source: require('../assets/card7.json') },
  { id: 8, source: require('../assets/card8.json') }
];
// ENDS

export const CreateScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardsGrid}>
        {birthdayCards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.cardButton}
            onPress={() => navigation.navigate('IconDetail', { image: card.source })}
          >
            <LottieView
              source={card.source}
              autoPlay
              loop
              style={styles.lottieAnimation}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// DIMENSIONS
const { width } = Dimensions.get('window');
const cardWidth = (width - 70) / 2; 
// ENDS

const styles = StyleSheet.create({

  container: 
  {
    flex: 1,
    backgroundColor: '#fff',
  },

  cardsGrid: 
  {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },

  cardButton: 
  {
    width: cardWidth,
    height: cardWidth,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  lottieAnimation: 
  {
    width: '100%',
    height: '100%',
  },
});

export default CreateScreen;