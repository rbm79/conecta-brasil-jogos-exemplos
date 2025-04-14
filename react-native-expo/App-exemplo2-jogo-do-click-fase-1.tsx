import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const App = () => {
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('Toque para começar');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);

  const startGame = () => {
    setStarted(true);
    setReady(false);
    setReactionTime(null);
    setMessage('Espere ficar verde...');

    const delay = Math.random() * 3000 + 2000; // entre 2s e 5s

    setTimeout(() => {
      setReady(true);
      setMessage('Toque agora!');
      setStartTime(Date.now());
    }, delay);
  };

  const handlePress = () => {
    if (!started) {
      startGame();
    } else if (ready) {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      setMessage(`Seu tempo: ${time}ms. Toque para jogar de novo.`);
      setStarted(false);
    } else {
      setMessage('Você clicou cedo demais! 😅 Toque para tentar de novo.');
      setStarted(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: !started ? '#222' : ready ? 'green' : 'red' }]}
      onPress={handlePress}
      activeOpacity={1}
    >
      <StatusBar hidden />
      <Text style={styles.text}>{message}</Text>
      {reactionTime !== null && (
        <Text style={styles.score}>⏱️ {reactionTime} ms</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  score: {
    color: '#fff',
    fontSize: 32,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default App;
