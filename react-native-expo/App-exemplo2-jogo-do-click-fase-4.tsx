import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const GAME_AREA_HEIGHT = height * 0.75;
const TARGET_SIZE = 100;

const App = () => {
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('🎮 Toque para começar!');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [ranking, setRanking] = useState<number[]>([]);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);



  const getRandomPositionInGameArea = () => {
    const top = Math.random() * (GAME_AREA_HEIGHT - TARGET_SIZE - 40) + 20;
    const left = Math.random() * (width - TARGET_SIZE - 40) + 20;
    return { top, left };
  };

  const updateRanking = (time: number) => {
    let newRanking = [...ranking, time];
    newRanking.sort((a, b) => a - b);
    newRanking = newRanking.slice(0, 5);
    setRanking(newRanking);
  };

  const startGame = () => {
    setStarted(true);
    setReady(false);
    setReactionTime(null);
    setMessage('⏳ Espere o botão aparecer...');
    setAttempts((prev) => prev + 1);

    const delay = Math.random() * 3000 + 2000;

    timeoutRef.current = setTimeout(() => {
      setReady(true);
      setPosition(getRandomPositionInGameArea());
      setMessage('💚 Toque no botão!');
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
      setReady(false);
      updateRanking(time);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

  };

const handleEarlyTouch = () => {
  if (!started) {
    startGame();
  } else if (!ready) {
    // Cancela o botão atrasado
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    let msg = '🚫 Você clicou cedo demais!';
    let updated = [...ranking];

    if (ranking.length > 0) {
      updated.shift(); // remove o melhor tempo
      setRanking(updated);
      msg += '\n❌ Melhor tempo removido!';
    }

    setMessage(`${msg}\n🔁 Tente novamente.`);
    setStarted(false);
  }
};




  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* HUD dividida em 2 colunas */}
      <View style={styles.hud}>
        <View style={styles.hudLeft}>
          <Text style={styles.attempts}>Tentativas: {attempts}</Text>

          <View style={styles.messageContainer}>
            <Text style={styles.message}>{message}</Text>
            {reactionTime !== null && (
              <Text style={styles.reactionTime}>⏱️ {reactionTime} ms</Text>
            )}
          </View>
        </View>

        <View style={styles.hudRight}>
          {ranking.length > 0 && (
            <View style={styles.rankingBox}>
              <Text style={styles.rankingTitle}>🏆 Top 5</Text>
              {ranking.map((tempo, index) => (
                <Text style={styles.rankingItem} key={index}>
                  {index + 1}. {tempo} ms
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Área de jogo com imagem de fundo */}
      <TouchableOpacity
        style={styles.gameArea}
        activeOpacity={1}
        onPress={handleEarlyTouch}
      >
        <ImageBackground
          source={require('./assets/background.png')}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        >
          {ready && (
            <TouchableOpacity
              style={[styles.target, { top: position.top, left: position.left }]}
              onPress={handleTouch}
              activeOpacity={0.8}
            >
              <Image
                source={require('./assets/target.png')}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  hud: {
    height: 260,
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hudLeft: {
    flex: 1,
    minWidth: 220,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  hudRight: {
    width: 140,
    alignItems: 'flex-start',
  },
  attempts: {
    backgroundColor: 'rgba(0, 191, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderColor: '#00BFFF',
    borderWidth: 1,
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    color: '#EEE',
    fontSize: 20,
    textAlign: 'left',
    paddingRight: 20,
  },
  reactionTime: {
    fontSize: 26,
    color: '#00FFF5',
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 4,
  },
  rankingBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 8,
    borderRadius: 10,
  },
  rankingTitle: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  rankingItem: {
    color: '#EEE',
    fontSize: 14,
  },
  gameArea: {
    height: GAME_AREA_HEIGHT,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  target: {
    position: 'absolute',
    width: TARGET_SIZE,
    height: TARGET_SIZE,
    borderRadius: TARGET_SIZE / 2,
    overflow: 'hidden',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 8,
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default App;
