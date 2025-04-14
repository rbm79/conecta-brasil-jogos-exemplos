import React, { useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const SHIP_WIDTH = 60;
const SHIP_HEIGHT = 80;

export default function App() {
  // Posição da nave
  const shipX = useSharedValue(width / 2 - SHIP_WIDTH / 2);
  const shipY = useSharedValue(0);
  
  // Dois fundos para animação sem gap
  const bg1Y = useSharedValue(0);
  const bg2Y = useSharedValue(-height);

  // Função específica para reiniciar a animação de forma segura
  const resetAndAnimate = () => {
    // Definir valores iniciais precisos
    bg1Y.value = 0;
    bg2Y.value = -height;
    
    // Inicia ambas animações com duração maior para mais suavidade
    bg1Y.value = withTiming(height, {
      duration: 5000,
      easing: Easing.linear
    });
    
    bg2Y.value = withTiming(0, {
      duration: 5000,
      easing: Easing.linear
    });
    
    // Reinicia a animação um pouco antes de terminar para evitar engasgos
    setTimeout(() => {
      resetAndAnimate();
    }, 4950);
  };

  // Iniciar animações ao montar
  useEffect(() => {
    // Animação vertical da nave (voo)
    shipY.value = withRepeat(
      withTiming(-15, { 
        duration: 1000, 
        easing: Easing.inOut(Easing.sin) 
      }),
      -1,  // Loop infinito
      true // Reverter automaticamente
    );
    
    // Inicia animação dos fundos
    resetAndAnimate();
    
    // Limpar timeouts ao desmontar
    return () => {
      // Não é necessário limpar as animações do Reanimated
      // pois elas são automaticamente canceladas
    };
  }, []);

  // Estilos animados
  const shipStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: shipY.value }],
    left: shipX.value,
  }));
  
  const bg1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: bg1Y.value }],
  }));
  
  const bg2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: bg2Y.value }],
  }));

  // Mover nave ao tocar na tela
  const handleTouch = (event) => {
    const touchX = event.nativeEvent.locationX;
    
    if (touchX < width / 2) {
      // Esquerda
      shipX.value = withTiming(
        Math.max(shipX.value - 30, 0), 
        { duration: 100 }
      );
    } else {
      // Direita
      shipX.value = withTiming(
        Math.min(shipX.value + 30, width - SHIP_WIDTH), 
        { duration: 100 }
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <View style={styles.container}>
        <StatusBar hidden />
        
        {/* Fundos que se alternam para criar movimento contínuo */}
        <Animated.Image
          source={require('./assets/space.png')}
          style={[styles.background, bg1Style]}
          resizeMode="repeat"
        />
        
        <Animated.Image
          source={require('./assets/space.png')}
          style={[styles.background, bg2Style]}
          resizeMode="repeat"
        />
        
        {/* Nave */}
        <Animated.Image
          source={require('./assets/ship2.png')}
          style={[styles.ship, shipStyle]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: height,
    opacity: 0.9,
  },
  ship: {
    position: 'absolute',
    bottom: 140,
    width: SHIP_WIDTH,
    height: SHIP_HEIGHT,
    zIndex: 10,
  },
});