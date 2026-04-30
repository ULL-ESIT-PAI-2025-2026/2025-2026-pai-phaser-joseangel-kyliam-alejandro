import * as Phaser from 'phaser';

// Importación del Menú
import StartScene from './scenes/StartScene';

// Importación de Escenas de Lógica
import LevelScenes1 from './scenes/Level1Scenes';
import LevelScenes2 from './scenes/Level2Scenes';
import GameScene from './scenes/GameScene';
import UIScene from './scenes/UIScene';

// Importación de Escenas de Físicas
import Physics1 from './scenes/Physics1';
import Physics2 from './scenes/Physics2';
import Physics3 from './scenes/Physics3';
import Physics4 from './scenes/Physics4';
import Physics5 from './scenes/Physics5';

// Tipamos la configuración estrictamente con Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#222',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300, x: 0 },
      debug: true // Fundamental para que tu audiencia vea las cajas moradas de colisión (AABB)
    }
  },
  // El orden de las escenas aquí importa para saber cuál arranca primero.
  // La primera del array (StartScene) será la que Phaser lance al iniciar.
  scene: [
    StartScene,
    LevelScenes1,
    LevelScenes2,
    GameScene,
    Physics1,
    Physics2,
    Physics3,
    Physics4,
    Physics5,
    UIScene
  ]
};

// Arrancamos la instancia del juego
new Phaser.Game(config);