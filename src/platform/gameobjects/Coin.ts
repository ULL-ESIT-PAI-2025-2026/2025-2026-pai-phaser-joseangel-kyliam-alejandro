import * as Phaser from 'phaser';

export default class Coin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '');

    scene.add.existing(this);
    // También la hacemos estática para ahorrar cálculos físicos
    scene.physics.add.existing(this, true); 

    this.setDisplaySize(20, 20);
    this.setTint(0xffff00);

    (this.body as Phaser.Physics.Arcade.StaticBody).updateFromGameObject();
  }
}