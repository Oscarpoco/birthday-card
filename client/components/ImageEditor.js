// components/ImageEditor.js
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ImageEditor({ image, onRemove }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.control} onPress={onRemove}>
          <Ionicons name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
  },
  control: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});