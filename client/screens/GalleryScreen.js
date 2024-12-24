import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';

// EXTRA IMPORTS
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAB } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';

// DIMENSIONS
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.92;
// ENDS

export const CardsScreen = ({ navigation }) => {

// LOCAL STATE
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
//   ENDS

// FETCH CARDS FROM STORAGE
    useEffect(() => {
        const loadCards = async () => {
            try {
                const savedCards = await AsyncStorage.getItem('birthdayCards');
                if (savedCards) {
                    setCards(JSON.parse(savedCards));
                }
            } catch (error) {
                console.error('Error loading cards:', error);
            }
        };
        loadCards();
    }, [navigation]);

    const loadCards = async () => {
        try {
            const savedCards = await AsyncStorage.getItem('birthdayCards');
            if (savedCards) {
                setCards(JSON.parse(savedCards));
            }
        } catch (error) {
            console.error('Error loading cards:', error);
        }
    };
// ENDS

  

// DELETE CARD FROM STORAGE
  const deleteCard = async (id) => {
    try {
      const updatedCards = cards.filter(card => card.id !== id);
      await AsyncStorage.setItem('birthdayCards', JSON.stringify(updatedCards));
      setCards(updatedCards);
      Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Card Deleted Successfully',
              position: 'bottom'
            });
      setModalVisible(false);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };
//   ENDS

// RENDER CARDS
  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setSelectedCard(item);
        setModalVisible(true);
      }}
    >
      <View style={styles.lottieContainer}>
        <LottieView
          source={item.image || require('../assets/birthday-animation.json')}
          autoPlay
          loop
          style={{ flex: 1 }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.wishText}>{item.wish}</Text>
        <Text style={styles.dateText}>Created on {new Date(item.date).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );

//   EMPTY LIST
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
        <View style={{ backgroundColor: '#f0f2f5', padding: 10 }}>
            <LottieView
            source={require('../assets/card2.json')}
            autoPlay
            loop
            style={{ height: 200, width: 100}}
            resizeMode="cover"
            />
        </View>
    
      <Text style={styles.emptyText}>No birthday cards yet</Text>
      <Text style={styles.emptyText}>Create your first birthday card!</Text>
    </View>
  );
//   ENDS

  return (
    <View style={styles.container}>
      {cards.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={cards}
          renderItem={renderCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.cardContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modalDivider} />
              <Text style={styles.modalTitle}>Card Options</Text>
            </View>

            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Create', { editCard: selectedCard, setSelectedCard });
              }}
            >
              <Text style={styles.buttonText}>Edit Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => deleteCard(selectedCard?.id)}
            >
              <Text style={styles.buttonText}>Delete Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('Templates')}
      />
    </View>
  );
};

const styles = StyleSheet.create({

    container: 
    {
      flex: 1,
      backgroundColor: '#f0f2f5',
    },

    cardContainer: 
    {
      paddingTop: 20,
      paddingBottom: 70,
      paddingHorizontal: 10,
      alignItems: 'center',
    },

    card: 
    {
      width: CARD_WIDTH,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
      overflow: 'hidden',
    },
    
    lottieContainer: 
    {
      height: 200,
      backgroundColor: '#f8f9fa',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
    },

    cardContent: 
    {
      padding: 16,
    },

    wishText: 
    {
      fontSize: 16,
      color: '#2c3e50',
      lineHeight: 24,
      marginBottom: 8,
    },

    dateText: 
    {
      fontSize: 14,
      color: '#7f8c8d',
    },

    emptyContainer: 
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginBottom: 100
    },

    emptyText: 
    {
      fontSize: 18,
      color: '#95a5a6',
      textAlign: 'center',
      marginTop: 15,
      letterSpacing: 1
    },

    // MODAL STYLE
    modalBackground: 
    {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },

    modalContainer: 
    {
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      padding: 20,
      minHeight: 200,
    },

    modalHeader: 
    {
      alignItems: 'center',
      marginBottom: 20,
    },

    modalTitle: 
    {
      fontSize: 20,
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: 5,
    },

    modalDivider: 
    {
      width: 40,
      height: 4,
      backgroundColor: '#e0e0e0',
      borderRadius: 2,
      marginBottom: 20,
    },

    actionButton: 
    {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 12,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },

    editButton: 
    {
      backgroundColor: '#3498db',
    },

    deleteButton: 
    {
      backgroundColor: '#e74c3c',
    },

    cancelButton: 
    {
      backgroundColor: '#95a5a6',
    },

    buttonText: 
    {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '500',
      marginLeft: 10,
    },

    // FAB STYLING

    fab: 
    {
      position: 'absolute',
      right: 15,
      bottom: 90,
      backgroundColor: '#1BA3A3',
      borderRadius: 10
    },
  });