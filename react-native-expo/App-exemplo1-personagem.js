import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/personagem.png')}
        style={styles.imagem}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagem: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
