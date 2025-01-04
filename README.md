# Birthday Cards App

A React Native mobile application for creating, customizing, and managing digital birthday cards with animated designs.

## Features

- Splash screen with birthday animation
- Create personalized birthday cards with animated designs
- Customize text color and font size
- Edit and delete existing cards
- Local storage for saving cards
- Bottom tab navigation for easy access
- Modern and clean user interface

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- React Native CLI
- EXPO GO

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Oscarpoco/birthday-card.git
cd birthday-cards
cd client
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install required packages:
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler react-native-reanimated
npm install @react-native-async-storage/async-storage
npm install react-native-toast-message
npm install lottie-react-native
npm install @react-native-community/slider
```

## Project Structure

```
birthday-cards-app/
├── src/
│   ├── screens/
│   │   ├── SplashScreen.js
│   │   ├── CardsScreen.js
│   │   ├── CreateScreen.js
│   │   └── IconDetailScreen.js
│   ├── components/
│   │   └── styles.js
│   └── assets/
│       ├── card1.json
│       ├── card2.json
│       ├── card3.json
│       └── card4.json
├── App.js
└── package.json
```

## Running the App

### Expo Go:
```bash
npx expo start
```


## Usage

1. **Creating a Card**:
   - Navigate to the Create tab
   - Select an animation design
   - Add your birthday message
   - Customize text color and size
   - Save the card

2. **Viewing Cards**:
   - All saved cards appear on the Cards screen
   - Tap a card to view details

3. **Editing/Deleting Cards**:
   - Open a card from the Cards screen
   - Use the modal options to edit or delete

## Troubleshooting

If you encounter any issues:

1. Clear the Metro bundler cache:
```bash
npx react-native start --reset-cache
```

2. Clean and rebuild the project:
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under mLab CodeTribe academy

## Acknowledgments

- Lottie for providing the animation framework
- React Navigation team for the navigation system
- The React Native community for support and resources

## Contact

Your Name - [okpoco15@gmail.com](mailto:okpoco15@gmail.com)
Project Link: [https://github.com/yourusername/birthday-cards-app](https://github.com/oscarpoco/birthday-card]

## Version History

* 0.1
    * Initial Release
    * Basic card creation and management features
