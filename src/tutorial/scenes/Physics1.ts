import * as Phaser from 'phaser';

export default class Physics1 extends Phaser.Scene {
  constructor() { 
    super('Physics1'); 
  }

  create() {
    // 1. Creamos el gráfico
    const player = this.add.rectangle(400, 100, 50, 50, 0x00ff00);
    
    // 2. Le inyectamos físicas (Gravedad por defecto)
    this.physics.add.existing(player);
  }
}