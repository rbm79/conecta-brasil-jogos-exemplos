import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const TARGET_SIZE = 100;

const App = () => {
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('🎮 Toque para começar!');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [position, setPosition] = useState({ top: height / 2 - 50, left: width / 2 - 50 });

  const getRandomPosition = () => {
    const top = Math.random() * (height - TARGET_SIZE - 100) + 50;
    const left = Math.random() * (width - TARGET_SIZE - 40) + 20;
    return { top, left };
  };

  const startGame = () => {
    setStarted(true);
    setReady(false);
    setReactionTime(null);
    setMessage('⏳ Espere o botão aparecer...');

    const delay = Math.random() * 3000 + 2000;

    setTimeout(() => {
      setReady(true);
      setPosition(getRandomPosition());
      setMessage('💚 Toque o botão!');
      setStartTime(Date.now());
    }, delay);
  };

  const handleTouch = () => {
    if (ready) {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      setMessage(`⚡ Seu tempo: ${time} ms\n🔁 Toque para jogar novamente.`);
      setStarted(false);
    }
  };

  const handleEarlyTouch = () => {
    if (!started) {
      startGame();
    } else if (!ready) {
      setMessage('🚫 Você clicou cedo demais!\n🔁 Tente novamente.');
      setStarted(false);
    }
  };

  const backgroundColor = !started ? '#222831' : ready ? '#1e7d1e' : '#b00020';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar hidden />
      <TouchableOpacity style={styles.fullscreenTouchable} activeOpacity={1} onPress={handleEarlyTouch}>
        <Text style={styles.message}>{message}</Text>

        {ready && (
          <TouchableOpacity
            style={[styles.target, { top: position.top, left: position.left }]}
            onPress={handleTouch}
          >
            <Text style={styles.targetText}>TOQUE</Text>
          </TouchableOpacity>
        )}

        {reactionTime !== null && (
          <Text style={styles.reactionTime}>⏱️ {reactionTime} ms</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullscreenTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: '#EEE',
    fontSize: 22,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  reactionTime: {
    fontSize: 30,
    color: '#00FFF5',
    marginTop: 20,
    fontWeight: 'bold',
  },
  target: {
    position: 'absolute',
    width: TARGET_SIZE,
    height: TARGET_SIZE,
    backgroundColor: '#00BCD4',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  targetText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
