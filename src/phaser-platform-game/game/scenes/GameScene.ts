/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Jose Angel Portillo Garcia
 * @author Alejandro Feo Martin
 * @author Kyliam Gabriel Chinea Salcedo
 * @since Apr 29 2026
 * @desc Main gameplay scene managing the platform game logic, physics collisions,
 * level progression, and event system for UI coordination.
 */

import * as Phaser from 'phaser';
import { LEVELS } from '../levels';
import { LevelBuilder } from '../builders/LevelBuilder';
import { gameState } from '../state/GameState';
import eventCenter from '../events/EventCenter';

/**
 * Reference to the music scene for optimal typing and method access.
 */
import MusicScene from  './music_scene'; 

import Player from '../gameobjects/Player';
import LavaFalling from '../gameobjects/LavaFalling';

/**
 * @classdesc Core scene managing gameplay, physics, collisions, and level progression.
 * Handles player lifecycle, object interactions, and scene state management.
 */
export default class GameScene extends Phaser.Scene {
  /**
   * @desc The player character instance controlled by user input.
   */
  private playerCharacter!: Player;
  
  /**
   * @desc Static physics group containing all wall platforms in the current level.
   */
  private wallGroup!: Phaser.Physics.Arcade.StaticGroup;

  /**
   * @desc Static physics group containing all collectible coins in the level.
   */
  private coinGroup!: Phaser.Physics.Arcade.StaticGroup;

  /**
   * @desc Static physics group containing all stationary lava hazards.
   */
  private staticLavaGroup!: Phaser.Physics.Arcade.StaticGroup;

  /**
   * @desc Dynamic physics group containing falling lava spawners and instances.
   */
  private fallingLavaGroup!: Phaser.Physics.Arcade.Group; 

  /**
   * @desc Static physics group containing the level exit/goal indicators.
   */
  private exitGroup!: Phaser.Physics.Arcade.StaticGroup;

  /**
   * @desc Timer event that increments elapsed game time every second.
   */
  private gameTimerEvent?: Phaser.Time.TimerEvent;

  /**
   * @desc Instantiates the GameScene with its unique Phaser key identifier.
   */
  constructor() {
    super('GameScene');
  }

  /**
   * @desc Preloads all game assets including spritesheets and textures
   * required for rendering game objects.
   */
  preload(): void {
    const repositoryBasePath = '/2025-2026-pai-phaser-joseangel-kyliam-alejandro/';
    
    this.load.image('coin-texture', `${repositoryBasePath}assets/img/coin.png`);
    this.load.spritesheet('main-sprites', `${repositoryBasePath}assets/img/sprites.png`, {
      frameWidth: 16,
      frameHeight: 16,
      endFrame: 2
    });
    this.load.spritesheet('player-sprite', `${repositoryBasePath}assets/img/player.png`, {
      frameWidth: 24,
      frameHeight: 30
    });
    
    this.load.on('filecomplete-spritesheet-main-sprites', () => {
      console.log('✅ Spritesheet cargado con éxito usando la ruta base de Vite');
    });
  }

  /**
   * Helper method to access the music scene manager with proper typing.
   * @returns Reference to the MusicScene instance for audio management.
   */
  private get audioManager(): MusicScene {
    return this.scene.get('MusicScene') as MusicScene;
  }

  /**
   * @desc Initializes the game scene by launching concurrent UI and music scenes,
   * building the level layout, setting up collision detection, and starting timers.
   */
  create(): void {
    // Launch the User Interface scene alongside gameplay
    if (!this.scene.isActive('UIScene')) {
      this.scene.launch('UIScene');
    }
    
    // Ensure the background music manager is running
    if (!this.scene.isActive('MusicScene')) {
      this.scene.launch('MusicScene');
    }

    // Build the level from tilemap data
    const currentLevelData = LEVELS[gameState.currentLevelIndex];
    const builtLevelObjects = LevelBuilder.build(this, currentLevelData);

    this.playerCharacter = builtLevelObjects.player;
    this.wallGroup = builtLevelObjects.walls;
    this.coinGroup = builtLevelObjects.coins;
    this.staticLavaGroup = builtLevelObjects.lavaStatic;
    this.fallingLavaGroup = builtLevelObjects.lavaFallingGroup; 
    this.exitGroup = builtLevelObjects.exits;

    // Setup pause functionality
    this.input.keyboard?.on('keydown-P', () => {
      this.scene.pause();
      this.scene.launch('PauseScene');
    });

    // Create game timer that increments every second
    this.gameTimerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        gameState.secondsElapsed++;
        eventCenter.emit('update-timer');
      },
      loop: true
    });

    // Register all collision and overlap callbacks
    this.setupCollisionHandlers();
  }

  /**
   * @desc Main game loop executed every frame, updating player state and animations.
   */
  update(): void {
    if (this.playerCharacter) {
      this.playerCharacter.update();
    }
  }

  /**
   * @desc Registers all collision detection callbacks between game objects.
   * Handles player-wall collisions, coin collection, lava contact, and level completion.
   */
  private setupCollisionHandlers(): void {
    // Prevent player from falling through platforms
    this.physics.add.collider(this.playerCharacter, this.wallGroup);
    
    // Remove falling lava when it hits walls
    this.physics.add.overlap(this.fallingLavaGroup, this.wallGroup, (lavaObject) => {
      const fallingLavaInstance = lavaObject as LavaFalling;
      fallingLavaInstance.deactivate(); 
    });
    
    // Handle coin collection
    this.physics.add.overlap(this.playerCharacter, this.coinGroup, (_, coin) => {
      coin.destroy();
      gameState.addCoin(); 
      this.audioManager.playCoinSound();
    });
    
    // Handle hazard contact (static lava)
    this.physics.add.overlap(this.playerCharacter, this.staticLavaGroup, () => this.handlePlayerDeath());
    
    // Handle hazard contact (falling lava)
    this.physics.add.overlap(this.playerCharacter, this.fallingLavaGroup, () => this.handlePlayerDeath()); 
    
    // Handle level completion
    this.physics.add.overlap(this.playerCharacter, this.exitGroup, () => this.handleLevelCompletion());
  }

  /**
   * @desc Handles player death: plays sound effect, decrements lives, and either
   * restarts the level or resets the entire game if no lives remain.
   */
  private handlePlayerDeath(): void {
    this.audioManager.playDeathSound();
    
    gameState.resetLevel();

    if (gameState.isGameOver()) {
      console.log('Game Over - No vidas restantes');
      this.audioManager.stopBackgroundMusic();
      this.audioManager.playGameOverSound();
      
      gameState.resetGame();
      this.scene.restart();
    } else {
      this.scene.restart();
    }
  }

  /**
   * @desc Handles level completion: plays jingle, advances to next level,
   * or completes the game if all levels are finished.
   */
  private handleLevelCompletion(): void {
    gameState.nextLevel();

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
