import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const SHIP_WIDTH = 60;
const SHIP_HEIGHT = 80;

const App = () => {
  const [shipX, setShipX] = useState(width / 2 - SHIP_WIDTH / 2);
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleTouch = (event: any) => {
    const touchX = event.nativeEvent.locationX;
    if (touchX < width / 2) {
      setShipX((prev) => Math.max(prev - 40, 0));
    } else {
      setShipX((prev) => Math.min(prev + 40, width - SHIP_WIDTH));
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollY, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <View style={styles.container}>
        <StatusBar hidden />

        {/* Fundo que se move */}
        <Animated.Image
          source={require('./assets/river.png')}
          style={[
            styles.background,
            { transform: [{ translateY: translateY }] },
          ]}
          resizeMode="repeat"
        />

        {/* Nave */}
        <Image
          source={require('./assets/ship.png')}
          style={[styles.ship, { left: shipX }]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: height * 2, // pra permitir rolagem suave
    top: -height,
    opacity: 0.9,
  },
  ship: {
    position: 'absolute',
    bottom: 140,
    width: SHIP_WIDTH,
    height: SHIP_HEIGHT,
  },
});

export default App;
