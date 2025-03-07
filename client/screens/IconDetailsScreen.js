import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';

// EXTRA IMPORTS
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
// ENDS

// TEXT COLORS
const colors = ['#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C', '#FF7F50'];
// ENDS

export const IconDetailScreen = ({ route, navigation }) => {

    // LOCAL STATE
    const { editCard = null, image = null, setSelectedCard } = route.params;
    const [wish, setWish] = useState(editCard?.wish || '');
    const [isDirty, setIsDirty] = useState(false);
    const [textColor, setTextColor] = useState(editCard?.textColor || colors[0]);
    const [fontSize, setFontSize] = useState(editCard?.fontSize || 16);
    //   ENDS

   // LOTTIE ANIMATION FROM THE TEMPLATE OR FROM DEFAULT
    const getLottieSource = () => {
        return editCard?.image || image;
    };
    //   ENDS

    // HANDLE FONT SIZE CHANGES
    const decreaseFontSize = () => {
        if (fontSize > 12) {
            setFontSize(prevSize => Math.max(12, prevSize - 1));
            setIsDirty(true);
        }
    };

    const increaseFontSize = () => {
        if (fontSize < 20) {
            setFontSize(prevSize => Math.min(20, prevSize + 1));
            setIsDirty(true);
        }
    };
    //   ENDS

    // HANDLE SAVE CARD TO LOCAL STORAGE
    const saveCard = async () => {
        try {
            // GET ALL EXISTING CARDS BEFORE SAVE THE NEW CARD
            const savedCards = await AsyncStorage.getItem('birthdayCards');
            let cards = savedCards ? JSON.parse(savedCards) : [];

            //   PREPARE NEW CARD OR EDITED CARD
            const newCard = {
                id: editCard?.id || Date.now().toString(),
                image: editCard?.image || image,
                wish,
                textColor,
                fontSize,
                date: Date.now(),
            };

            //   IF EDITING CARD, UPDATE THE CARD
            if (editCard) {
                cards = cards.map(card => card.id === editCard.id ? newCard : card);
            // ELSE , ADD THE NEW CARD
            } else {
                cards.push(newCard);
            }

            //   SAVE ALL THE CARDS BACK TO LOCAL STORAGE
            await AsyncStorage.setItem('birthdayCards', JSON.stringify(cards));

            //   SET BACK SELECTED CARD TO NULL
            if (editCard) {
                setSelectedCard(null);
            }

            //   NAVIGATE TO HOME
            try {
                // Check if we're using stack navigation
                const isStackNavigation = navigation.canGoBack();
                
                if (isStackNavigation) {
                    navigation.goBack();
                } else {
                    navigation.navigate('MainApp');
                }
            } catch (error) {
                navigation.navigate('MainApp');
            }

            // setWish('');
            
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
    //   ENDS

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
                onChangeText={(text) => {
                    setWish(text);
                    setIsDirty(true);
                }}
                placeholder="Enter your birthday wish..."
                multiline
            />

            <View style={styles.colorPicker}>
                {colors.map(color => (
                    <TouchableOpacity
                        key={color}
                        style={[styles.colorButton, { backgroundColor: color }]}
                        onPress={() => {
                            setTextColor(color);
                            setIsDirty(true);
                        }}
                    />
                ))}
            </View>

            {/* Custom Font Size Control with Buttons */}
            <View style={styles.fontSizeContainer}>
                <Text style={styles.fontSizeLabel}>Font Size: {fontSize}px</Text>
                <View style={styles.fontSizeControls}>
                    <TouchableOpacity 
                        style={[styles.fontSizeButton, fontSize <= 12 && styles.disabledButton]} 
                        onPress={decreaseFontSize}
                        disabled={fontSize <= 12}
                    >
                        <Text style={styles.fontSizeButtonText}>-</Text>
                    </TouchableOpacity>
                    
                    {/* Font Size Progress Bar */}
                    <View style={styles.fontSizeProgressContainer}>
                        <View 
                            style={[
                                styles.fontSizeProgress, 
                                { width: `${((fontSize - 12) / 8) * 100}%` }
                            ]} 
                        />
                    </View>
                    
                    <TouchableOpacity 
                        style={[styles.fontSizeButton, fontSize >= 20 && styles.disabledButton]} 
                        onPress={increaseFontSize}
                        disabled={fontSize >= 20}
                    >
                        <Text style={styles.fontSizeButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={() => {
                        saveCard();
                    }}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => {
                        if (isDirty) {
                            Alert.alert(
                                "Unsaved Changes",
                                "You have unsaved changes. Are you sure you want to go back?",
                                [
                                    { text: "Cancel", style: "cancel" },
                                    { text: "OK", onPress: () => navigation.goBack() }
                                ]
                            );
                        } else {
                            navigation.goBack();
                        }
                    }}
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
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    lottieContainer: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    lottieView: {
        width: 200,
        height: 200,
    },
    wishInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
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
    // New font size control styles
    fontSizeContainer: {
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    fontSizeLabel: {
        marginBottom: 10,
        fontWeight: '600',
        letterSpacing: 1,
        fontSize: 16,
    },
    fontSizeControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fontSizeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FF69B4',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    fontSizeButtonText: {
        fontSize: 35,
        fontWeight: 600,
        color: 'white',
        textAlign: 'center',
        lineHeight: 50
    },
    disabledButton: {
        backgroundColor: '#f8bcd8',
        elevation: 1,
    },
    fontSizeProgressContainer: {
        flex: 1,
        height: 10,
        backgroundColor: '#eee',
        marginHorizontal: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    fontSizeProgress: {
        height: '100%',
        backgroundColor: '#FF69B4',
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 10,
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
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1.5
    },
});

export default IconDetailScreen;