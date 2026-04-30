import * as Phaser from 'phaser';

export default class Physics2 extends Phaser.Scene {
  constructor() { 
    super('Physics2'); 
  }

  create() {
    const ground = this.add.rectangle(400, 550, 800, 50, 0x555555);
    // El 'true' significa que es un cuerpo ESTÁTICO
    this.physics.add.existing(ground, true);

    const player = this.add.rectangle(400, 100, 50, 50, 0x00ff00);
    this.physics.add.existing(player);

    this.physics.add.collider(player, ground);
  }
}