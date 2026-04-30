import * as Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
  // Definimos las propiedades con sus tipos de Phaser
  private counter: number = 0;
  private text!: Phaser.GameObjects.Text;
  private button!: Phaser.GameObjects.Text;
  private isCounterVisible: boolean = true;

  constructor() {
    super('UIScene');
  }

  create() {
    this.counter = 0;

    // 1. Texto contador
    this.text = this.add.text(10, 10, 'Choques: 0', {
      fontSize: '24px',
      color: '#ffffff'
    });

    // 2. Botón ON/OFF
    this.button = this.add.text(10, 50, 'Toggle contador', {
      fontSize: '20px',
      backgroundColor: '#000',
      padding: { x: 10, y: 5 }
    })
    .setInteractive({ useHandCursor: true });

    // Lógica del botón usando el flag de visibilidad
    this.button.on('pointerdown', () => {
      this.isCounterVisible = !this.isCounterVisible;
      this.text.setVisible(this.isCounterVisible);
    });

    // 3. Comunicación entre escenas (Escuchar eventos de GameScene)
    // Buscamos la referencia de la escena de juego
    const gameScene = this.scene.get('GameScene');
    
    if (gameScene) {
      // Escuchamos el evento 'collision' que emite GameScene
      gameScene.events.on('collision', this.increment, this);
    }

    // Limpieza: Si la escena se detiene, dejamos de escuchar para evitar fugas de memoria
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      if (gameScene) {
        gameScene.events.off('collision', this.increment, this);
      }
    });
  }

  private increment() {
    this.counter++;
    this.text.setText(`Choques: ${this.counter}`);
  }
}