// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveCard = async (card) => {
  try {
    const existingCards = await AsyncStorage.getItem('@birthday_cards');
    const cards = existingCards ? JSON.parse(existingCards) : [];
    cards.push(card);
    await AsyncStorage.setItem('@birthday_cards', JSON.stringify(cards));
  } catch (error) {
    console.error('Error saving card:', error);
  }
};

export const getCards = async () => {
  try {
    const cards = await AsyncStorage.getItem('@birthday_cards');
    return cards ? JSON.parse(cards) : [];
  } catch (error) {
    console.error('Error loading cards:', error);
    return [];
  }
};

export const deleteCard = async (index) => {
  try {
    const cards = await getCards();
    cards.splice(index, 1);
    await AsyncStorage.setItem('@birthday_cards', JSON.stringify(cards));
    return cards;
  } catch (error) {
    console.error('Error deleting card:', error);
    return null;
  }
};