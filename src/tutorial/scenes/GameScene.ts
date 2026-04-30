import * as Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private speed: number = 3;

  constructor() {
    super('GameScene');
  }

  create() {
    const { height } = this.scale;
    this.player = this.add.rectangle(100, height / 2, 50, 50, 0x00ff00);

    // Lanzamos la UI SIN parar esta escena
    this.scene.launch('UIScene');
  }

  update() {
    this.player.x += this.speed;

    if (this.player.x > 800 || this.player.x < 0) {
      this.speed *= -1;
      // Emitimos evento de colisión al SceneManager
      this.events.emit('collision');
    }
  }
}