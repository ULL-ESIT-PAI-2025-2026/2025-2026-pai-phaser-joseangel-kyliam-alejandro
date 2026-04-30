import * as Phaser from 'phaser';
import Player from '../gameobjects/Player';
import Wall from '../gameobjects/Wall';
import Coin from '../gameobjects/Coin';
import Lava from '../gameobjects/Lava';
import Exit from '../gameobjects/Exit';
import LavaFalling from '../gameobjects/LavaFalling'; // <--- Añadido

export class LevelBuilder {
  static build(scene: Phaser.Scene, levelData: string[]) {
    
    const walls = scene.physics.add.staticGroup();
    const coins = scene.physics.add.staticGroup();
    const lavaStatic = scene.physics.add.staticGroup(); 
    const exits = scene.physics.add.staticGroup();
    
    // NUEVO: Grupo DINÁMICO para la lava que cae
    const lavaFallingGroup = scene.physics.add.group(); 

    let player!: Player;

    levelData.forEach((row, y) => {
      [...row].forEach((char, x) => {
        const px = x * 32 + 16;
        const py = y * 32 + 16;

        if (char === '@') player = new Player(scene, px, py);
        else if (char === '#') walls.add(new Wall(scene, px, py));
        else if (char === 'o') coins.add(new Coin(scene, px, py));
        else if (char === '!') lavaStatic.add(new Lava(scene, px, py));
        else if (char === 'E') exits.add(new Exit(scene, px, py));
        else if (char === 'V') lavaFallingGroup.add(new LavaFalling(scene, px, py)); // <--- Añadido
      });
    });

    const mapWidth = levelData[0].length * 32;
    const mapHeight = levelData.length * 32;

    scene.physics.world.setBounds(0, 0, mapWidth, mapHeight);
    
    if (player) {
      scene.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
      scene.cameras.main.startFollow(player, true, 0.08, 0.08);
    }

    // Asegúrate de devolver todos los grupos a la escena
    return { player, walls, coins, lavaStatic, lavaFallingGroup, exits };
  }
}