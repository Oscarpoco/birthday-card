import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const colors = ['#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C', '#FF7F50'];

export const IconDetailScreen = ({ route }) => {
  const { editCard = null, image = null, setSelectedCard } = route.params;
  const [wish, setWish] = useState(editCard?.wish || '');
  const [textColor, setTextColor] = useState(editCard?.textColor || colors[0]);
  const [fontSize, setFontSize] = useState(editCard?.fontSize || 16);
  const navigation = useNavigation();
  const defaultLottie = { id: 3, source: require('../assets/birthday-animation.json') }

  const getLottieSource = () => {
    return editCard?.image || image || defaultLottie.source;
  };

  const saveCard = async () => {
    try {
      const savedCards = await AsyncStorage.getItem('birthdayCards');
      let cards = savedCards ? JSON.parse(savedCards) : [];
      
      const newCard = {
        id: editCard?.id || Date.now().toString(),
        image: editCard?.image || image, 
        wish,
        textColor,
        fontSize,
      };

      if (editCard) {
        cards = cards.map(card => card.id === editCard.id ? newCard : card);
      } else {
        cards.push(newCard);
      }

      await AsyncStorage.setItem('birthdayCards', JSON.stringify(cards));
      if(editCard) {
        setSelectedCard(null);
      }
      navigation.navigate('Cards');
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: editCard ? 'Card updated successfully' : 'Card created successfully',
        position: 'bottom'
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error saving card',
        position: 'bottom'
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView
          source={getLottieSource()}
          autoPlay
          loop
          style={styles.lottieView}
        />
      </View>
      <TextInput
        style={[styles.wishInput, { color: textColor, fontSize }]}
        value={wish}
        onChangeText={setWish}
        placeholder="Enter your birthday wish..."
        multiline
      />
      
      <View style={styles.colorPicker}>
        {colors.map(color => (
          <TouchableOpacity
            key={color}
            style={[styles.colorButton, { backgroundColor: color }]}
            onPress={() => setTextColor(color)}
          />
        ))}
      </View>

      <Text>Font Size: {fontSize}px</Text>
      <Slider
        style={styles.slider}
        minimumValue={12}
        maximumValue={20}
        step={1}
        value={fontSize}
        onValueChange={setFontSize}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={()=>{
            saveCard();
        }}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  lottieContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  lottieView: {
    width: 200,
    height: 200,
  },
  wishInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginVertical: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 2,
    minWidth: 120,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#FF69B4',
  },
  cancelButton: {
    backgroundColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default IconDetailScreen;