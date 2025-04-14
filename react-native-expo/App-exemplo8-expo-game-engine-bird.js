import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const PIPE_WIDTH = 60;
const GAP = 150;
const PIPE_SPEED = 29; // velocidade corrigida 🚀

export default function App() {
  const birdY = useRef(new Animated.Value(height / 2)).current;
  const birdYRef = useRef(height / 2);
  const velocity = useRef(0);
  const GRAVITY_FORCE = 0.6;
  const JUMP_FORCE = -10;

  // posição e altura dos canos
  const pipeX = useRef(new Animated.Value(width)).current;
  const topPipeHeight = useRef(Math.random() * (height - GAP - 200) + 50);

  useEffect(() => {
    // gravidade e movimento do pássaro
    const gameInterval = setInterval(() => {
      velocity.current += GRAVITY_FORCE;
      let nextY = birdYRef.current + velocity.current;

      // limitar dentro da tela
      if (nextY < 0) {
        nextY = 0;
        velocity.current = 0;
      } else if (nextY > height - 50) {
        nextY = height - 50;
        velocity.current = 0;
      }

      birdYRef.current = nextY;
      birdY.setValue(nextY);
    }, 30);

    return () => clearInterval(gameInterval);
  }, []);

  useEffect(() => {
    const movePipes = () => {
      pipeX.setValue(width); // reinicia na lateral direita
      topPipeHeight.current = Math.random() * (height - GAP - 200) + 50;

      Animated.timing(pipeX, {
        toValue: -PIPE_WIDTH,
        duration: (width + PIPE_WIDTH) * (1000 / PIPE_SPEED), // velocidade ajustada
        useNativeDriver: false,
      }).start(() => movePipes());
    };

    movePipes();
  }, []);

  const handlePress = () => {
    velocity.current = JUMP_FORCE;
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {/* Passarinho */}
        <Animated.View style={[styles.bird, { top: birdY }]} />

        {/* Cano de cima */}
        <Animated.View style={[
          styles.pipe,
          {
            left: pipeX,
            height: topPipeHeight.current,
            top: 0,
          },
        ]} />

        {/* Cano de baixo */}
        <Animated.View style={[
          styles.pipe,
          {
            left: pipeX,
            height: height - topPipeHeight.current - GAP,
            bottom: 0,
          },
        ]} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB', // céu azul
  },
  bird: {
    position: 'absolute',
    left: width / 2 - 25,
    width: 50,
    height: 50,
    backgroundColor: 'yellow',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#333',
  },
  pipe: {
    position: 'absolute',
    width: PIPE_WIDTH,
    backgroundColor: 'green',
  },
});
