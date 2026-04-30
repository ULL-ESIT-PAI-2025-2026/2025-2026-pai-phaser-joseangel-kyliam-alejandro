import * as Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, imageKey: string, frame?: number) {
    super(scene, x, y, imageKey, frame);
    scene.add.existing(this);
  }
}