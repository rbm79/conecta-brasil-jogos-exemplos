import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

export default function App() {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handlePress = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const win = checkWinner(newBoard);
    if (win) setWinner(win);
    else if (!newBoard.includes(null)) setWinner('Empate');
  };

  const checkWinner = (b) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontais
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticais
      [0, 4, 8], [2, 4, 6]             // diagonais
    ];
    for (let [a, b1, c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    return null;
  };

  const resetGame = () => {
    setBoard(emptyBoard);
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>
      <View style={styles.board}>
        {board.map((cell, idx) => (
          <TouchableOpacity key={idx} style={styles.cell} onPress={() => handlePress(idx)}>
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.status}>
        {winner ? (winner === 'Empate' ? 'Empate!' : `Vencedor: ${winner}`) : `Turno de: ${xIsNext ? 'X' : 'O'}`}
      </Text>
      <Button title="Reiniciar" onPress={resetGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, marginBottom: 20 },
  board: { width: 300, height: 300, flexDirection: 'row', flexWrap: 'wrap' },
  cell: {
    width: 100, height: 100, borderWidth: 1,
    justifyContent: 'center', alignItems: 'center',
  },
  cellText: { fontSize: 48 },
  status: { fontSize: 24, margin: 20 },
});
