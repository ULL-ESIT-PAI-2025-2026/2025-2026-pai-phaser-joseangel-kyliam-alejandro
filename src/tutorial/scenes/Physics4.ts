import * as Phaser from 'phaser';

export default class Physics4 extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() { 
    super('Physics4'); 
  }

  create() {
    const ground = this.add.rectangle(400, 550, 800, 50, 0x555555);
    this.physics.add.existing(ground, true);

    this.player = this.add.rectangle(400, 100, 50, 50, 0x00ff00);
    this.physics.add.existing(this.player);

    this.physics.add.collider(this.player, ground);

    // Verificación de seguridad para el teclado
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  }

  update() {
    if (!this.cursors) return;

    // Casteamos para poder acceder a la velocidad
    const body = this.player.body as Phaser.Physics.Arcade.Body;

    if (this.cursors.left.isDown) {
      body.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      body.setVelocityX(200);
    } else {
      body.setVelocityX(0);
    }

    if (this.cursors.up.isDown && body.touching.down) {
      body.setVelocityY(-300);
    }
  }
}