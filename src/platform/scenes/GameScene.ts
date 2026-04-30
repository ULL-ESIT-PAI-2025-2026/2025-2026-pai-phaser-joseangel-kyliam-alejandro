import * as Phaser from 'phaser';
import { LEVELS } from '../levels';
import { LevelBuilder } from '../builders/LevelBuilder';
import { gameState } from '../state/GameState';
import eventCenter from '../events/EventCenter';

import Player from '../gameobjects/Player';
import LavaFalling from '../gameobjects/LavaFalling';

export default class GameScene extends Phaser.Scene {
  player!: Player;
  
  // Grupos de físicas devueltos por el LevelBuilder
  walls!: Phaser.Physics.Arcade.StaticGroup;
  coins!: Phaser.Physics.Arcade.StaticGroup;
  lavaStatic!: Phaser.Physics.Arcade.StaticGroup;
  lavaFallingGroup!: Phaser.Physics.Arcade.Group; 
  exits!: Phaser.Physics.Arcade.StaticGroup;

  // Temporizador interno de la escena
  private gameTimer?: Phaser.Time.TimerEvent;

  constructor() {
    super('GameScene');
  }

  create() {
    // 1. Lanzamos la Interfaz de Usuario en paralelo si no está activa
    if (!this.scene.isActive('UIScene')) {
      this.scene.launch('UIScene');
    }

    // 2. Construcción del nivel
    const levelData = LEVELS[gameState.currentLevelIndex];
    const levelObjects = LevelBuilder.build(this, levelData);

    // Asignamos las referencias
    this.player = levelObjects.player;
    this.walls = levelObjects.walls;
    this.coins = levelObjects.coins;
    this.lavaStatic = levelObjects.lavaStatic;
    this.lavaFallingGroup = levelObjects.lavaFallingGroup; 
    this.exits = levelObjects.exits;

    // 3. Sistema de Pausa
    this.input.keyboard?.on('keydown-P', () => {
      this.scene.pause(); // Congela físicas, updates y timers de esta escena
      this.scene.launch('PauseScene'); // Lanza el menú de pausa por encima
    });

    // 4. Temporizador de la partida (se pausa automáticamente con this.scene.pause())
    this.gameTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        gameState.secondsElapsed++;
        eventCenter.emit('update-timer');
      },
      loop: true
    });

    // 5. Activamos las reglas físicas del mundo
    this.createCollisions();
  }

  update() {
    // Delegamos la lógica de movimiento al propio jugador
    if (this.player) {
      this.player.update();
    }
  }

  createCollisions() {
    // Colisiones sólidas (con separación física)
    this.physics.add.collider(this.player, this.walls);

    // La lava cayendo toca el suelo y desaparece en ese mismo frame (Overlap en vez de Collider)
    this.physics.add.overlap(this.lavaFallingGroup, this.walls, (lavaObj) => {
      const lava = lavaObj as LavaFalling;
      lava.deactivate(); 
    });

    // Overlaps con objetos recolectables
    this.physics.add.overlap(this.player, this.coins, (_, coin) => {
      coin.destroy();
      gameState.addCoin(); 
    });

    // Overlaps con peligros (Lava estática y la que cae)
    this.physics.add.overlap(this.player, this.lavaStatic, () => this.handleDeath());
    this.physics.add.overlap(this.player, this.lavaFallingGroup, () => this.handleDeath()); 

    // Overlap con la salida
    this.physics.add.overlap(this.player, this.exits, () => this.handleLevelComplete());
  }

  handleDeath() {
    gameState.resetLevel();

    if (gameState.isGameOver()) {
      console.log('Game Over');
      gameState.resetGame();
      this.scene.restart();
    } else {
      this.scene.restart(); // Reinicia la escena actual, manteniendo las vidas/puntos
    }
  }

  handleLevelComplete() {
    gameState.nextLevel();

    if (gameState.currentLevelIndex < LEVELS.length) {
      this.scene.restart(); // Carga el siguiente nivel
    } else {
      console.log('¡Juego completado!');
      gameState.resetGame();
      this.scene.restart(); // Vuelve al inicio
    }
  }
}