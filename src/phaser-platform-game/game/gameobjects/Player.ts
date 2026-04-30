import * as Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // 1. Inicializamos con la clave del spritesheet
    super(scene, x, y, 'player-sprite');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDisplaySize(32, 48);
    this.setCollideWorldBounds(true);
    this.cursors = scene.input.keyboard!.createCursorKeys();

    // 2. Crear animaciones (solo si no existen ya)
    this.createAnimations(scene);
  }

  private createAnimations(scene: Phaser.Scene) {
    if (!scene.anims.exists('run')) {
      scene.anims.create({
        key: 'run',
        // Usamos los 10 frames de la imagen (del 0 al 9)
        frames: scene.anims.generateFrameNumbers('player-sprite', { start: 0, end: 9 }),
        frameRate: 12,
        repeat: -1
      });
    }

    if (!scene.anims.exists('idle')) {
      scene.anims.create({
        key: 'idle',
        // Usamos el frame 9 (o el 0) como pose estática
        frames: [{ key: 'player-sprite', frame: 8 }],
        frameRate: 20
      });
    }

    if (!scene.anims.exists('jump')) {
      scene.anims.create({
        key: 'jump',
        // Usamos el frame 9 (o el 0) como pose estática
        frames: [{ key: 'player-sprite', frame: 9 }],
        frameRate: 20
      });
    }
  }

  update() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    // 2. LÓGICA DE MOVIMIENTO HORIZONTAL
    if (this.cursors.left?.isDown) {
      this.setVelocityX(-160);
      this.setFlipX(true);
    } else if (this.cursors.right?.isDown) {
      this.setVelocityX(160);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    // 3. GESTIÓN DE ANIMACIONES CON PRIORIDAD
    if (!body.blocked.down) {
      // Si está en el aire, manda la animación de salto
      this.anims.play('jump', true);
    } else {
      // Si está en el suelo, decidimos entre correr o idle
      if (body.velocity.x !== 0) {
        this.anims.play('run', true);
      } else {
        this.anims.play('idle', true);
      }
    }

    // 4. LÓGICA DE SALTO (Física)
    if (this.cursors.up?.isDown && body.blocked.down) {
      this.setVelocityY(-330);
    }
  }
}