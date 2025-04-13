import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function App() {
  // Estado inicial do contador (começa em 0)
  const [contador, setContador] = useState(0);

  // Função para aumentar o contador
  const aumentar = () => setContador(contador + 1);

  // Função para diminuir o contador
  const diminuir = () => setContador(contador - 1);

  // Função para zerar o contador
  const zerar = () => setContador(0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎯 Contador de Cliques</Text>

      {/* Exibe o valor atual do contador */}
      <Text style={styles.contador}>{contador}</Text>

      {/* Botões para interagir com o estado */}
      <View style={styles.botoes}>
        <Button title="➕ Aumentar" onPress={aumentar} color="#4CAF50" />
        <Button title="➖ Diminuir" onPress={diminuir} color="#F44336" />
        <Button title="🔄 Zerar" onPress={zerar} color="#2196F3" />
      </View>
    </View>
  );
}

// Estilos da interface
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',     // Centraliza horizontalmente
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  contador: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#555',
  },
  botoes: {
    width: '80%',
    gap: 15, // espaçamento entre os botões (funciona em versões mais novas do React Native)
  },
});
