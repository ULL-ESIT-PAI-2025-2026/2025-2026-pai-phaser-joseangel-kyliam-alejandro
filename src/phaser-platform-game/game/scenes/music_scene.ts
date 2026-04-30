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
 * @desc Manages all sound effects and background music for the game.
 */

import * as Phaser from 'phaser';

const SOUND_PATH: string = '/2025-2026-pai-phaser-joseangel-kyliam-alejandro/assets/sound/';

/** @classdesc Manages all audio assets and playback for the game. */
export default class MusicScene extends Phaser.Scene {
  private static readonly BACKGROUND_VOLUME: number = 0.3;

  // In order to modify the background sound
  private backgroundMusic?: Phaser.Sound.BaseSound;

  /**
   * @desc Creates a new MusicScene instance.
   */
  constructor() {
    super('MusicScene');
  }

  /**
   * @desc Loads all sound assets into the audio cache.
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
   * @desc Starts playing background music when the scene is created.
   */
  create(): void {
    this.playBackgroundMusic();
  }

  /**
   * @desc Starts or resumes the background music track.
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
   * @desc Plays the fireworks sound effect.
   */
  playFireworksSound(): void {
    this.sound.play('fireworks');
  }

  /**
   * @desc Plays the game over sound effect.
   */
  playGameOverSound(): void {
    this.sound.play('gameOver');
  }

  /**
   * @desc Plays the jump sound effect.
   */
  playJumpSound(): void {
    this.sound.play('jump');
  }

  /**
   * @desc Plays the death sound effect.
   */
  playDeathSound(): void {
    this.sound.play('death');
  }

  /**
   * @desc Plays the stage clear jingle.
   */
  playStageClearSound(): void {
    this.sound.play('stageClear');
  }

  /**
   * @desc Plays the world clear jingle.
   */
  playWorldClearSound(): void {
    this.sound.play('worldClear');
  }

  /**
   * @desc Pauses the background music.
   */
  pauseBackgroundMusic(): void {
    this.backgroundMusic?.pause();
  }

  /**
   * @desc Resumes the background music from pause.
   */
  resumeBackgroundMusic(): void {
    this.backgroundMusic?.resume();
  }

  /**
   * @desc Stops the background music entirely.
   */
  stopBackgroundMusic(): void {
    this.backgroundMusic?.stop();
  }

  /**
   * @desc Mutes all sound output.
   */
  muteSounds(): void {
    this.sound.mute = true;
  }

  /**
   * @desc Unmutes all sound output.
   */
  unmuteSounds(): void {
    this.sound.mute = false;
  }

  /**
   * @desc Toggles the mute state of all sounds.
   */
  toggleMute(): void {
    this.sound.mute = !this.sound.mute;
  }

  /**
   * @desc Creates the looping background music audio object.
   */
  private createBackgroundMusic(): void {
    this.backgroundMusic = this.sound.add('background', {
      loop: true,
      volume: MusicScene.BACKGROUND_VOLUME,
    });
  } 
}