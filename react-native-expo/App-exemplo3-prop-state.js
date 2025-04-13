import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

// Componente Filho (Props)
const Personagem = (props) => {
  return (
    <View style={styles.personagem}>
      <Text>Nome: {props.nome}</Text>
      <Text>Pontos: {props.pontos}</Text>
    </View>
  );
};

// Componente de Estado Simples
const Contador = () => {
  const [pontos, setPontos] = useState(0);

  return (
    <View style={styles.contador}>
      <Text style={styles.info}>Pontuação: {pontos}</Text>
      <Button title="Ganhar 10 pontos" onPress={() => setPontos(pontos + 10)} />
    </View>
  );
};

// Botão Clicável (Props + interatividade)
const BotaoClicavel = (props) => {
  return (
    <TouchableOpacity style={styles.botao} onPress={props.aoClicar}>
      <Text style={styles.textoBotao}>{props.texto}</Text>
    </TouchableOpacity>
  );
};

// Jogo de Cliques (Estado + Props)
const JogoDeCliques = () => {
  const [pontos, setPontos] = useState(0);
  const [tempo, setTempo] = useState(10);
  const [jogoAtivo, setJogoAtivo] = useState(false);

  const iniciarJogo = () => {
    setPontos(0);
    setTempo(10);
    setJogoAtivo(true);

    const temporizador = setInterval(() => {
      setTempo((tempoAtual) => {
        if (tempoAtual <= 1) {
          clearInterval(temporizador);
          setJogoAtivo(false);
          return 0;
        }
        return tempoAtual - 1;
      });
    }, 1000);
  };

  const adicionarPonto = () => {
    if (jogoAtivo) {
      setPontos((p) => p + 1);
    }
  };

  return (
    <View style={styles.jogo}>
      <Text style={styles.titulo}>Jogo de Cliques</Text>
      <Text style={styles.info}>Tempo: {tempo}s</Text>
      <Text style={styles.info}>Pontos: {pontos}</Text>

      {jogoAtivo ? (
        <BotaoClicavel texto="CLIQUE RÁPIDO!" aoClicar={adicionarPonto} />
      ) : (
        <BotaoClicavel texto="Iniciar Jogo" aoClicar={iniciarJogo} />
      )}

      {!jogoAtivo && pontos > 0 && (
        <Text style={styles.resultado}>
          Você fez {pontos} cliques em 10 segundos!
        </Text>
      )}
    </View>
  );
};

// App principal
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Exemplo com Props, State e Componentes</Text>

      {/* Props */}
      <Text style={styles.secao}>Props:</Text>
      <Personagem nome="Herói" pontos={100} />
      <Personagem nome="Inimigo" pontos={50} />

      {/* State */}
      <Text style={styles.secao}>State:</Text>
      <Contador />

      {/* Jogo */}
      <Text style={styles.secao}>Jogo:</Text>
      <JogoDeCliques />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  secao: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  personagem: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  contador: {
    marginVertical: 10,
  },
  jogo: {
    marginTop: 20,
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  botao: {
    backgroundColor: '#4287f5',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  textoBotao: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});
