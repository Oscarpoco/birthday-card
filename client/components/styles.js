import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // ... (styles for all components)
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    splashContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    animation: {
      width: 200,
      height: 200,
    },
    splashText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: '#FF69B4',
    },
    card: {
      padding: 20,
      margin: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    iconsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 10,
    },
    iconButton: {
      width: '30%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      margin: 5,
      borderRadius: 10,
    },
    iconText: {
      fontSize: 30,
    },

    lottieView: {
      width: 200,
      height: 200,
    },

  });