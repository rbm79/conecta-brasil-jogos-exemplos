import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [x, setX] = useState(100);
  const [y, setY] = useState(100);

  const moverQuadrado = () => {
    const novoX = Math.random() * (width - 100);
    const novoY = Math.random() * (height - 100);
    setX(novoX);
    setY(novoY);
  };

  return (
    <TouchableWithoutFeedback onPress={moverQuadrado}>
      <View style={{ flex: 1, backgroundColor: '#111' }}>
        <View style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 100,
          height: 100,
          backgroundColor: 'limegreen',
          borderRadius: 12,
        }} />
      </View>
    </TouchableWithoutFeedback>
  );
}