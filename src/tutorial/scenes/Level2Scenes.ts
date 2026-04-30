import * as Phaser from 'phaser';

export default class LevelScenes2 extends Phaser.Scene {
  constructor() {
    super('LevelScenes2');
  }

  create() {
    this.scene.launch('UIScene');

    this.add.text(400, 300, 'Juego + UI', {
      fontSize: '32px'
    }).setOrigin(0.5);
  }
}