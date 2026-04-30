import * as Phaser from 'phaser';

export default class Lava extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '');

    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    this.setDisplaySize(32, 32);
    this.setTint(0xff0000);

    (this.body as Phaser.Physics.Arcade.StaticBody).updateFromGameObject();
  }
}