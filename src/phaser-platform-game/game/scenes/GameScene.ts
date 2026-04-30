import * as Phaser from 'phaser';
import { LEVELS } from '../levels';
import { LevelBuilder } from '../builders/LevelBuilder';
import { gameState } from '../state/GameState';
import eventCenter from '../events/EventCenter';

// NUEVO: Importamos la clase MusicScene para poder tiparla
import MusicScene from  './music_scene'; 

import Player from '../gameobjects/Player';
import LavaFalling from '../gameobjects/LavaFalling';

export default class GameScene extends Phaser.Scene {
  player!: Player;
  
  walls!: Phaser.Physics.Arcade.StaticGroup;
  coins!: Phaser.Physics.Arcade.StaticGroup;
  lavaStatic!: Phaser.Physics.Arcade.StaticGroup;
  lavaFallingGroup!: Phaser.Physics.Arcade.Group; 
  exits!: Phaser.Physics.Arcade.StaticGroup;

  private gameTimer?: Phaser.Time.TimerEvent;

  constructor() {
    super('GameScene');
  }

  preload() {
    const repoBase = '/2025-2026-pai-phaser-joseangel-kyliam-alejandro/';
    this.load.image('coin-texture', `${repoBase}assets/img/coin.png`);
    this.load.spritesheet('main-sprites', `${repoBase}assets/img/sprites.png`, {
      frameWidth: 16,
      frameHeight: 16,
      endFrame: 2
    });
    this.load.spritesheet('player-sprite', `${repoBase}assets/img/player.png`, {
      frameWidth: 24,
      frameHeight: 30
    });
    this.load.on('filecomplete-spritesheet-main-sprites', () => {
      console.log('✅ Spritesheet cargado con éxito usando la ruta base de Vite');
    });
  }

  // NUEVO: Helper para obtener el director de orquesta fácilmente y tipado
  private get audioManager(): MusicScene {
    return this.scene.get('MusicScene') as MusicScene;
  }

  create() {
    // 1. Lanzamos la Interfaz de Usuario y la Música en paralelo
    if (!this.scene.isActive('UIScene')) {
      this.scene.launch('UIScene');
    }
    
    // NUEVO: Nos aseguramos de que el director de orquesta esté trabajando
    if (!this.scene.isActive('MusicScene')) {
      this.scene.launch('MusicScene');
    }

    // 2. Construcción del nivel
    const levelData = LEVELS[gameState.currentLevelIndex];
    const levelObjects = LevelBuilder.build(this, levelData);

    this.player = levelObjects.player;
    this.walls = levelObjects.walls;
    this.coins = levelObjects.coins;
    this.lavaStatic = levelObjects.lavaStatic;
    this.lavaFallingGroup = levelObjects.lavaFallingGroup; 
    this.exits = levelObjects.exits;

    // 3. Sistema de Pausa
    this.input.keyboard?.on('keydown-P', () => {
      this.scene.pause();
      this.scene.launch('PauseScene');
    });

    // 4. Temporizador de la partida
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
    if (this.player) {
      this.player.update();
    }
  }

  createCollisions() {
    this.physics.add.collider(this.player, this.walls);
    
    this.physics.add.overlap(this.lavaFallingGroup, this.walls, (lavaObj) => {
      const lava = lavaObj as LavaFalling;
      lava.deactivate(); 
    });
    
    this.physics.add.overlap(this.player, this.coins, (_, coin) => {
      coin.destroy();
      gameState.addCoin(); 
      // NUEVO: Reproducimos el sonido al tocar la moneda
      this.audioManager.playCoinSound();
    });
    
    this.physics.add.overlap(this.player, this.lavaStatic, () => this.handleDeath());
    this.physics.add.overlap(this.player, this.lavaFallingGroup, () => this.handleDeath()); 
    this.physics.add.overlap(this.player, this.exits, () => this.handleLevelComplete());
  }

  handleDeath() {
    // NUEVO: Reproducimos el sonido de muerte
    this.audioManager.playDeathSound();
    
    gameState.resetLevel();

    if (gameState.isGameOver()) {
      console.log('Game Over');
      // NUEVO: Sonido de Game Over si se acaban las vidas
      this.audioManager.stopBackgroundMusic();
      this.audioManager.playGameOverSound();
      
      gameState.resetGame();
      this.scene.restart();
    } else {
      this.scene.restart();
    }
  }

  handleLevelComplete() {
    gameState.nextLevel();

    // NUEVO: Detenemos la música de fondo y tocamos la fanfarria
    this.audioManager.stopBackgroundMusic();

    if (gameState.currentLevelIndex < LEVELS.length) {
      this.audioManager.playStageClearSound();
      this.scene.restart(); 
    } else {
      console.log('¡Juego completado!');
      this.audioManager.playWorldClearSound();
      gameState.resetGame();
      this.scene.restart(); 
    }
  }
}