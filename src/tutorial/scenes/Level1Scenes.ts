import * as Phaser from 'phaser';

export default class LevelScenes1 extends Phaser.Scene {
  constructor() {
    super('LevelScenes1');
  }

  create() {
    this.add.text(400, 300, 'Click para cambiar', {
      fontSize: '32px'
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      this.scene.start('StartScene');
    });
  }
}