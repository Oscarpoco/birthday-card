import { SafeAreaView, TextInput, View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Platform } from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export default function RootLayout() {
  const [mainView, setMainView] = useState("splash");
  const [cardText, setCardText] = useState("");
  const [image, setImage] = useState(null);
  const [savedCards, setSavedCards] = useState([]);
  const [imageScale, setImageScale] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);

  // Load saved cards from AsyncStorage on initial render
  useEffect(() => {
    loadSavedCards();
  }, []);

  // Save cards to AsyncStorage whenever savedCards changes
  useEffect(() => {
    saveSavedCards();
  }, [savedCards]);

  const loadSavedCards = async () => {
    try {
      const savedCardsJSON = await AsyncStorage.getItem("@birthday_cards");
      if (savedCardsJSON) {
        setSavedCards(JSON.parse(savedCardsJSON));
      }
    } catch (error) {
      console.error("Error loading saved cards:", error);
    }
  };

  const saveSavedCards = async () => {
    try {
      await AsyncStorage.setItem("@birthday_cards", JSON.stringify(savedCards));
    } catch (error) {
      console.error("Error saving cards:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      setImageScale(1);
      setImageRotation(0);
    }
  };
  

  const saveCard = () => {
    if (cardText || image) {
      setSavedCards([
        ...savedCards,
        { 
          text: cardText, 
          image,
          imageScale,
          imageRotation,
          timestamp: new Date().toISOString(),
        }
      ]);
      setCardText("");
      setImage(null);
      setImageScale(1);
      setImageRotation(0);
    }
  };

  const shareCard = (card) => {
    // Implement share functionality here
    console.log("Share card:", card);
  };

  const downloadCard = (card) => {
    // Implement download functionality here
    console.log("Download card:", card);
  };


  // SPLASH SCREEN
  const renderSplashScreen = () => (
    <View style={styles.splashContainer}>
      <Image 
          source={require('../assets/images/splashBackground.png')}
          style={styles.splashIcon}
      />
      <Text style={styles.splashTitle}>Birthday Card Maker</Text>
      <Text style={styles.splashSubtitle}>Be creative with your designs</Text>
      <Pressable 
        style={({pressed}) => [
          styles.splashButton,
          pressed && styles.buttonPressed
        ]}
        onPress={() => setMainView("addBirthday")}
      >
        <Text style={styles.splashButtonText}>Get Started</Text>
      </Pressable>
    </View>
  );
  // ENDS SPLASH SCREEN


  // ADD BIRTHDAY CARD SCREEN
  const renderAddBirthdayScreen = () => (
    <ScrollView style={styles.addBirthdayContainer}>
      <View style={styles.cardCreationContainer}>

        <View>
          <Text style={styles.sectionTitle}>Create Your Birthday Card</Text>
          
          <TextInput
            placeholder="Enter your birthday message... max 150 characters"
            value={cardText}
            onChangeText={setCardText}
            style={styles.textInput}
            multiline
            numberOfLines={4}
            maxLength={150}
          />
        </View>

        <View style={styles.imageSection}>
          <Pressable 
            style={({pressed}) => [
              styles.imagePickerButton,
              pressed && styles.buttonPressed
            ]}
            onPress={pickImage}
          >
            <MaterialIcons name="add-photo-alternate" size={24} color="white" />
            <Text style={styles.buttonText}>Choose Image</Text>
          </Pressable>
            
          {image && (
            <View style={styles.imagePreviewContainer}>
              <Image 
                source={{ uri: image }} 
                style={[
                  styles.imagePreview,
                  {
                    transform: [
                      { scale: imageScale },
                      { rotate: `${imageRotation}deg` }
                    ]
                  }
                ]} 
              />

              <Text>{cardText}</Text>
              
              <View style={styles.imageControlsContainer}>
                <Pressable 
                  style={styles.imageControl}
                  onPress={() => setImageScale(imageScale + 0.1)}
                >
                  <MaterialIcons name="zoom-in" size={24} color="#333" />
                </Pressable>
                <Pressable 
                  style={styles.imageControl}
                  onPress={() => setImageScale(Math.max(0.1, imageScale - 0.1))}
                >
                  <MaterialIcons name="zoom-out" size={24} color="#333" />
                </Pressable>
                <Pressable 
                  style={styles.imageControl}
                  onPress={() => setImageRotation((imageRotation + 90) % 360)}
                >
                  <MaterialIcons name="rotate-right" size={24} color="#333" />
                </Pressable>
              </View>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Pressable 
            style={({pressed}) => [
              styles.actionButton,
              pressed && styles.buttonPressed
            ]}
            onPress={saveCard}
          >
            <MaterialIcons name="save" size={24} color="white" />
            <Text style={styles.buttonText}>Save Card</Text>
          </Pressable>

          <Pressable 
            style={({pressed}) => [
              styles.actionButton,
              styles.secondaryButton,
              pressed && styles.buttonPressed
            ]}
            onPress={() => setMainView("savedCards")}
          >
            <MaterialIcons name="collections" size={24} color="white" />
            <Text style={styles.buttonText}>View Gallery</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
  // ENDS ADD SCREEN HERE


  // SAVED SCREEN HERE
  const renderSavedCardsScreen = () => (
    <ScrollView style={styles.savedCardsContainer}>
      <Text style={styles.sectionTitle}>Your Birthday Cards</Text>
      
      {savedCards.map((card, index) => (
        <View key={index} style={styles.savedCard}>
          <Text style={styles.cardText}>{card.text}</Text>
          {card.image && (
            <Image 
              source={{ uri: card.image }} 
              style={[
                styles.savedCardImage,
                {
                  transform: [
                    { scale: card.imageScale || 1 },
                    { rotate: `${card.imageRotation || 0}deg` }
                  ]
                }
              ]} 
            />
          )}
          
          <View style={styles.cardActions}>
            <Pressable 
              style={styles.cardAction}
              onPress={() => shareCard(card)}
            >
              <MaterialIcons name="share" size={24} color="#666" />
              <Text style={styles.cardActionText}>Share</Text>
            </Pressable>
            
            <Pressable 
              style={styles.cardAction}
              onPress={() => downloadCard(card)}
            >
              <MaterialIcons name="file-download" size={24} color="#666" />
              <Text style={styles.cardActionText}>Save</Text>
            </Pressable>
          </View>
        </View>
      ))}

      <Pressable 
        style={({pressed}) => [
          styles.backButton,
          pressed && styles.buttonPressed
        ]}
        onPress={() => setMainView("splash")}
      >
        <MaterialIcons name="arrow-back" size={24} color="white" />
        <Text style={styles.buttonText}>Back to Home</Text>
      </Pressable>
    </ScrollView>
  );
  // ENDS SAVED SCREEN HERE


  return (

      <SafeAreaView style={styles.container}>
        {mainView === "splash" && renderSplashScreen()}
        {mainView === "addBirthday" && renderAddBirthdayScreen()}
        {mainView === "savedCards" && renderSavedCardsScreen()}
        <StatusBar backgroundColor="#ff4081" barStyle="light-content" />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 0
  },
  splashIcon: {
    width: "100%",
    height: "100%",
    position: 'absolute',
    top: 0,
    left: 0,
  },
  splashTitle: {
    fontSize: 30,
    marginBottom: 20,
    marginLeft: 25,
    color: '#717171',
    fontWeight: 'bold',
    letterSpacing: 2, 
    textShadowColor: '#717171',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  splashSubtitle: {
    fontSize: 20,
    color: '#F5F5F5',
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 0,
    width: '100%',
    backgroundColor: '#666666',
    paddingVertical: 10,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  splashButton: {
    backgroundColor: '#717171',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
  },
  splashButtonText: {
    fontWeight: '900',
    color: '#F5F5F5'
  },
  addBirthdayContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingVertical: 20
  },
  cardCreationContainer: {
    padding: 20,
    justifyContent: 'space-between',
    flex: 1
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    minHeight: 450,
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
    width: '100%', 
    justifyContent: 'center'
  },
  imagePreviewContainer: {
    alignItems: 'center',
    width: '100%',
    height: 200,
  },
  imagePreview: {
    width: width * 0.8,
    height: width * 0.8 * 0.75,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  imageControl: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF69B4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  secondaryButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  savedCardsContainer: {
    flex: 1,
    padding: 20,
    paddingVertical: 40
  },
  savedCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  savedCardImage: {
    width: '100%',
    height: width * 0.6,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  cardActionText: {
    color: '#666',
    marginLeft: 5,
    fontSize: 14,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#666',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 80,
  },
});