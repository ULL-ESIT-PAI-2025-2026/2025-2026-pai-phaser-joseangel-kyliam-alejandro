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
 * @desc Manages all audio assets and playback including background music and sound effects.
 */

import * as Phaser from 'phaser';

/**
 * @desc Base path for all sound asset files in the repository.
 */
const SOUND_PATH: string = '/2025-2026-pai-phaser-joseangel-kyliam-alejandro/assets/sound/';

/**
 * @classdesc Audio manager scene that handles preloading, playback control,
 * and muting of background music and sound effects throughout the game.
 */
export default class MusicScene extends Phaser.Scene {
  /**
   * @desc Volume level for background music (0.0 to 1.0 scale).
   */
  private static readonly BACKGROUND_VOLUME: number = 0.3;

  /**
   * @desc Reference to the looping background music audio object.
   */
  private backgroundMusic?: Phaser.Sound.BaseSound;

  /**
   * @desc Instantiates the MusicScene with its unique Phaser key identifier.
   */
  constructor() {
    super('MusicScene');
  }

  /**
   * @desc Loads all sound assets into the audio cache from the file system.
   */
  preload(): void {
    this.load.audio('background', SOUND_PATH + '201-overworld-bgm.mp3');
    this.load.audio('coin', SOUND_PATH + 'smb_coin.wav');
    this.load.audio('fireworks', SOUND_PATH + 'smb_fireworks.wav');
    this.load.audio('gameOver', SOUND_PATH + 'smb_gameover.wav');
    this.load.audio('jump', SOUND_PATH + 'smb_jump-small.wav');
    this.load.audio('death', SOUND_PATH + 'smb_mariodie.wav');
    this.load.audio('stageClear', SOUND_PATH + 'smb_stage_clear.wav');
    this.load.audio('worldClear', SOUND_PATH + 'smb_world_clear.wav');
  }

  /**
   * @desc Initializes the audio manager and starts background music playback.
   */
  create(): void {
    this.playBackgroundMusic();
  }

  /**
   * @desc Plays background music if not already playing, or resumes if paused.
   */
  playBackgroundMusic(): void {
    if (!this.backgroundMusic) {
      this.createBackgroundMusic();
    }

    if (this.backgroundMusic?.isPlaying) {
      return;
    }

    if (this.backgroundMusic?.isPaused) {
      this.backgroundMusic.resume();
      return;
    }

    this.backgroundMusic?.play();
  }

  /**
   * @desc Plays the coin collection sound effect.
   */
  playCoinSound(): void {
    this.sound.play('coin');
  }

  /**
   * @desc Plays the fireworks celebration sound effect.
   */
  playFireworksSound(): void {
    this.sound.play('fireworks');
  }

  /**
   * @desc Plays the game over defeat sound effect.
   */
  playGameOverSound(): void {
    this.sound.play('gameOver');
  }

  /**
   * @desc Plays the jump action sound effect.
   */
  playJumpSound(): void {
    this.sound.play('jump');
  }

  /**
   * @desc Plays the player death sound effect.
   */
  playDeathSound(): void {
    this.sound.play('death');
  }

  /**
   * @desc Plays the stage/level completion jingle.
   */
  playStageClearSound(): void {
    this.sound.play('stageClear');
  }

  /**
   * @desc Plays the world/game completion victory jingle.
   */
  playWorldClearSound(): void {
    this.sound.play('worldClear');
  }

  /**
   * @desc Pauses background music playback without stopping it.
   */
  pauseBackgroundMusic(): void {
    this.backgroundMusic?.pause();
  }

  /**
   * @desc Resumes background music from paused state.
   */
  resumeBackgroundMusic(): void {
    this.backgroundMusic?.resume();
  }

  /**
   * @desc Completely stops background music playback.
   */
  stopBackgroundMusic(): void {
    this.backgroundMusic?.stop();
  }

  /**
   * @desc Mutes all sound and music output globally.
   */
  muteSounds(): void {
    this.sound.mute = true;
  }

  /**
   * @desc Unmutes all sound and music output globally.
   */
  unmuteSounds(): void {
    this.sound.mute = false;
  }

  /**
   * @desc Toggles the global mute state of all audio.
   */
  toggleMute(): void {
    this.sound.mute = !this.sound.mute;
  }

  /**
   * @desc Creates and configures the background music audio object for looping playback.
   */
  private createBackgroundMusic(): void {
    this.backgroundMusic = this.sound.add('background', {
      loop: true,
      volume: MusicScene.BACKGROUND_VOLUME,
    });
  } 
}