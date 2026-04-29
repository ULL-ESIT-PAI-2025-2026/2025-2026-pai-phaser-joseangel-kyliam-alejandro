import * as Phaser from 'phaser';

const SOUND_PATH: string = 'assets/sound/';

export class MusicScene extends Phaser.Scene {
  private static readonly BACKGROUND_VOLUME: number = 0.3;

  private backgroundMusic?: Phaser.Sound.BaseSound;

  constructor() {
    super('MusicScene');
  }

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

  create(): void {
    this.playBackgroundMusic();
  }

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

  playCoinSound(): void {
    this.sound.play('coin');
  }

  playFireworksSound(): void {
    this.sound.play('fireworks');
  }

  playGameOverSound(): void {
    this.sound.play('gameOver');
  }

  playJumpSound(): void {
    this.sound.play('jump');
  }

  playDeathSound(): void {
    this.sound.play('death');
  }

  playStageClearSound(): void {
    this.sound.play('stageClear');
  }

  playWorldClearSound(): void {
    this.sound.play('worldClear');
  }

  pauseBackgroundMusic(): void {
    this.backgroundMusic?.pause();
  }

  resumeBackgroundMusic(): void {
    this.backgroundMusic?.resume();
  }

  stopBackgroundMusic(): void {
    this.backgroundMusic?.stop();
  }

  muteSounds(): void {
    this.sound.mute = true;
  }

  unmuteSounds(): void {
    this.sound.mute = false;
  }

  toggleMute(): void {
    this.sound.mute = !this.sound.mute;
  }

  private createBackgroundMusic(): void {
    this.backgroundMusic = this.sound.add('background', {
      loop: true,
      volume: MusicScene.BACKGROUND_VOLUME,
    });
  } 
}