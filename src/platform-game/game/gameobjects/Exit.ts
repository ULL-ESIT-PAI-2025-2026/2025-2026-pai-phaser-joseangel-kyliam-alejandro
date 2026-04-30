import * as Phaser from 'phaser';

export default class Exit extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '');

    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    this.setDisplaySize(32, 32);
    this.setTint(0x0000ff);

    (this.body as Phaser.Physics.Arcade.StaticBody).updateFromGameObject();
  }
}