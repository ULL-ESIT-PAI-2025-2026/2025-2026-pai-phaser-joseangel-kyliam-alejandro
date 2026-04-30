import * as Phaser from 'phaser';

export default class Physics5 extends Phaser.Scene {
  constructor() { 
    super('Physics5'); 
  }

  create() {
    const player = this.add.rectangle(200, 300, 50, 50, 0x00ff00);
    this.physics.add.existing(player);

    const coin = this.add.rectangle(250, 400, 30, 30, 0xffff00);
    this.physics.add.existing(coin);
    
    // Casteamos la moneda para quitarle la gravedad
    const coinBody = coin.body as Phaser.Physics.Arcade.Body;
    coinBody.setAllowGravity(false); 

    this.physics.add.overlap(player, coin, () => {
      console.log('Moneda recogida');
      coin.destroy(); // La borramos para que se vea el efecto
    });

    // Casteamos al jugador para darle empuje inicial
    const playerBody = player.body as Phaser.Physics.Arcade.Body;
    playerBody.setVelocityX(100);
  }
}