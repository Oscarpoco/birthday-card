import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

// Define card animations array with their sources
export const birthdayCards = [
  { id: 1, source: require('../assets/card1.json') },
  { id: 2, source: require('../assets/card2.json') },
  { id: 3, source: require('../assets/birthday-animation.json') },
  { id: 4, source: require('../assets/card4.json') }
];

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

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // 2 cards per row with 20px padding on sides and between

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  cardButton: {
    width: cardWidth,
    height: cardWidth,
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    marginBottom: 20,
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
  lottieAnimation: {
    width: '100%',
    height: '100%',
  },
});

export default CreateScreen;