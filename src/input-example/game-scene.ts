import * as Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    private player!: Phaser.GameObjects.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super('GameScene');
    }

    preload(): void {
        // En lugar de spritesheet, la cargamos como una imagen normal primero
        // para asegurar que Phaser la reconozca sin errores de dimensiones
        this.load.image('playerStrip', '../../assets/img/player.png');
    }

    create(): void {
    // 1. Obtenemos la imagen base
    const baseTexture = this.textures.get('playerStrip');
    
    // Si por alguna razón no existe, salimos para evitar el crash
    if (!baseTexture) {
        console.error("No se pudo cargar la imagen playerStrip");
        return;
    }

    // 2. Creamos la textura dinámica
    const texture = this.textures.addImage('playerKey', baseTexture.getSourceImage() as HTMLImageElement);
    
    // Validamos que 'texture' no sea null antes de usarla
    if (texture) {
        const frameWidth = 33;
        const frameHeight = 40;

        for (let i = 0; i < 10; i++) {
            // Añadimos cada cuadro: nombre, índice de fuente, x, y, ancho, alto
            texture.add(i, 0, i * frameWidth, 0, frameWidth, frameHeight);
        }
    }

    // 3. Crear el sprite usando la nueva textura 'playerKey'
    this.player = this.add.sprite(400, 300, 'playerKey', 0).setScale(2);

    // 4. Definir la animación
    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('playerKey', { start: 0, end: 10 }),
        frameRate: 12,
        repeat: -1
    });

    if (this.input.keyboard) {
        this.cursors = this.input.keyboard.createCursorKeys();
    }
}

    update(): void {
        if (!this.cursors || !this.player) return;

        const speed = 4;
        let isMoving = false;

        if (this.cursors.left.isDown) {
            this.player.x -= speed;
            this.player.flipX = true;
            isMoving = true;
        } else if (this.cursors.right.isDown) {
            this.player.x += speed;
            this.player.flipX = false;
            isMoving = true;
        }

        if (this.cursors.up.isDown) {
            this.player.y -= speed;
            isMoving = true;
        } else if (this.cursors.down.isDown) {
            this.player.y += speed;
            isMoving = true;
        }

        if (isMoving) {
            this.player.play('run', true);
        } else {
            this.player.stop();
            this.player.setFrame(0);
        }
    }
}