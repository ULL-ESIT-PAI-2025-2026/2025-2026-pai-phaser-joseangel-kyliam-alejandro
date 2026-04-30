import * as Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDisplaySize(28, 28);
    this.setTint(0x00ff00);
    
    // Le decimos a las físicas que el jugador rebote/choque con los bordes del mundo
    this.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard!.createCursorKeys();
  }

  update() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    if (this.cursors.left?.isDown) {
      this.setVelocityX(-160);
    } else if (this.cursors.right?.isDown) {
      this.setVelocityX(160);
    } else {
      this.setVelocityX(0);
    }

    if (this.cursors.up?.isDown && body.blocked.down) {
      this.setVelocityY(-300);
    }
  }
}