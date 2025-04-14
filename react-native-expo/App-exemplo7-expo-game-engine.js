import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

const Ball = props => {
  const radius = 30;
  const x = props.body.position.x - radius;
  const y = props.body.position.y - radius;

  return (
    <View style={[styles.ball, { left: x, top: y }]} />
  );
};

export default function App() {
  const engine = useRef(Matter.Engine.create({ enableSleeping: false })).current;
  const world = engine.world;

  const ball = Matter.Bodies.circle(200, 50, 30, { restitution: 0.9 });
  const floor = Matter.Bodies.rectangle(200, 500, 400, 50, { isStatic: true });

  Matter.World.add(world, [ball, floor]);

  return (
    <GameEngine
      systems={[(entities, { time }) => {
        let engine = entities.physics.engine;
        Matter.Engine.update(engine, time.delta);
        return entities;
      }]}
      entities={{
        physics: { engine, world },
        ball: { body: ball, renderer: <Ball /> },
      }}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222' },
  ball: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'tomato',
    position: 'absolute',
  },
});
