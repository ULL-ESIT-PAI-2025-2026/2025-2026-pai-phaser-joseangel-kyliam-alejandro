import * as Phaser from 'phaser';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene');
  }

  create() {
    this.add.text(400, 50, 'MENÚ PRINCIPAL', {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // --- SECCIÓN ESCENAS ---
    this.add.text(400, 120, '--- ESCENAS ---', {
      fontSize: '24px',
      color: '#ffff00'
    }).setOrigin(0.5);

    this.createButton(170, '1. Cambio de escena', 'LevelScenes1');
    this.createButton(210, '2. Escenas simultáneas', 'GameScene');

    // --- SECCIÓN FÍSICAS ---
    this.add.text(400, 280, '--- FÍSICAS ---', {
      fontSize: '24px',
      color: '#00ffff'
    }).setOrigin(0.5);

    this.createButton(330, '3. Gravedad', 'Physics1');
    this.createButton(370, '4. Collider', 'Physics2');
    this.createButton(410, '5. Rebote', 'Physics3');
    this.createButton(450, '6. Input', 'Physics4');
    this.createButton(490, '7. Overlap', 'Physics5');
  }

  // Método privado y tipado
  private createButton(y: number, text: string, scene: string) {
    const btn = this.add.text(400, y, text, {
      fontSize: '20px',
      backgroundColor: '#000',
      padding: { x: 10, y: 5 }
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true });

    btn.on('pointerdown', () => {
      this.scene.start(scene);
    });
  }
}