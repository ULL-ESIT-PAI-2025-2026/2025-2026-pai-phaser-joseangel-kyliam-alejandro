import * as Phaser from 'phaser';

export default class Wall extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'main-sprites', 0);

    scene.add.existing(this);
    // El 'true' indica que es un cuerpo ESTÁTICO (no le afecta la gravedad ni se mueve)
    scene.physics.add.existing(this, true); 

    this.setDisplaySize(32, 32);
    this.setTint(0x666666);

    // Fundamental: Sincronizar el tamaño visual con el tamaño físico tras el setDisplaySize
    (this.body as Phaser.Physics.Arcade.StaticBody).updateFromGameObject();
  }
}