import * as Phaser from 'phaser';

export default class LavaFalling extends Phaser.Physics.Arcade.Sprite {
  private startX: number;
  private startY: number;
  private respawnTimer?: Phaser.Time.TimerEvent;
  
  // Configuración de tiempos y físicas
  private readonly CAIDA_INTERVALO = 3000; // Cada 3 segundos
  private readonly VELOCIDAD_CAIDA = 200;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, ''); 

    this.startX = x;
    this.startY = y;

    scene.add.existing(this);
    scene.physics.add.existing(this, false); 

    this.setDisplaySize(20, 32); 
    this.setTint(0xff6600); 

    // Iniciamos el bucle de tiempo
    this.startFallingCycle();
  }

  private startFallingCycle() {
    // Primero lanzamos una gota inmediatamente
    this.spawn();

    // Creamos el evento que se repite para siempre (loop: true)
    this.respawnTimer = this.scene.time.addEvent({
      delay: this.CAIDA_INTERVALO,
      callback: this.spawn,
      callbackScope: this,
      loop: true
    });
  }

  private spawn() {
    // Si la escena ya no existe (por un restart), salimos para evitar errores
    if (!this.scene || !this.scene.sys) return;

    // 1. Volvemos a hacer visible y activo el objeto
    this.setActive(true);
    this.setVisible(true);
    
    // 2. IMPORTANTE: Reactivamos el cuerpo físico y lo movemos al inicio
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setEnable(true); // <--- ESTA ES LA CLAVE: El motor físico vuelve a hacerle caso
    
    // 3. Reseteamos posición y aplicamos velocidad
    this.setPosition(this.startX, this.startY);
    body.reset(this.startX, this.startY);
    body.setVelocityY(this.VELOCIDAD_CAIDA);
  }

  public deactivate() {
    // 1. Ocultamos visualmente
    this.setActive(false);
    this.setVisible(false);
    
    // 2. Desactivamos el cuerpo físico para que no detecte colisiones mientras espera
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.stop(); 
    body.setEnable(false); // <--- Lo "dormimos"
  }

  // Si destruimos el objeto, quitamos el timer para que no gaste memoria
  destroy(fromScene?: boolean) {
    if (this.respawnTimer) {
      this.respawnTimer.destroy();
    }
    super.destroy(fromScene);
  }
}