import * as Phaser from 'phaser';

export default class Physics3 extends Phaser.Scene {
  constructor() { 
    super('Physics3'); 
  }

  create() {
    const ground = this.add.rectangle(400, 550, 800, 50, 0x555555);
    this.physics.add.existing(ground, true);

    const player = this.add.rectangle(400, 100, 50, 50, 0x00ff00);
    this.physics.add.existing(player);

    // Casteamos a Arcade.Body porque es un Rectangle inyectado
    const body = player.body as Phaser.Physics.Arcade.Body;
    body.setBounce(0.8, 0.8);

    this.physics.add.collider(player, ground);
  }
}