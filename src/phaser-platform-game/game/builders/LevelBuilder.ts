/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Jose Angel Portillo Garcia
 * @author Alejandro Feo Martin
 * @author Kyliam Gabriel Chinea Salcedo
 * @since Apr 29 2026
 * @desc Factory for constructing game levels from tilemap string data.
 */

import * as Phaser from 'phaser';
import Player from '../gameobjects/Player';
import Wall from '../gameobjects/Wall';
import Coin from '../gameobjects/Coin';
import Lava from '../gameobjects/Lava';
import Exit from '../gameobjects/Exit';
import LavaFalling from '../gameobjects/LavaFalling';

/**
 * @classdesc Factory class for building game levels from tilemap data.
 * Parses string-based level layouts and instantiates the appropriate game objects.
 */
export class LevelBuilder {
  /**
   * @desc Constructs a complete level from tilemap string data.
   * Each character represents a different game object type.
   * 
   * @param scene - The Phaser scene where level objects are created.
   * @param levelData - Array of strings representing the level tilemap.
   * @returns An object containing all built level components (player, groups, etc).
   * 
   * @example
   * levelData = [
   *   '#####',
   *   '#@o!#',
   *   '#E V#',
   *   '#####'
   * ]
   * // '@' = Player, '#' = Wall, 'o' = Coin, '!' = Lava, etc.
   */
  static build(scene: Phaser.Scene, levelData: string[]) {
    // Create physics groups for each object type
    const wallGroup = scene.physics.add.staticGroup();
    const coinGroup = scene.physics.add.staticGroup();
    const staticLavaGroup = scene.physics.add.staticGroup(); 
    const exitGroup = scene.physics.add.staticGroup();
    const fallingLavaGroup = scene.physics.add.group(); 

    let playerCharacter!: Player;

    // Parse each character in the level data
    levelData.forEach((rowString, rowIndex) => {
      [...rowString].forEach((tileCharacter, columnIndex) => {
        // Calculate pixel position (each tile is 32x32)
        const pixelX = columnIndex * 32 + 16;
        const pixelY = rowIndex * 32 + 16;

        // Instantiate appropriate game object based on character
        if (tileCharacter === '@') {
          playerCharacter = new Player(scene, pixelX, pixelY);
        } else if (tileCharacter === '#') {
          wallGroup.add(new Wall(scene, pixelX, pixelY));
        } else if (tileCharacter === 'o') {
          coinGroup.add(new Coin(scene, pixelX, pixelY));
        } else if (tileCharacter === '!') {
          staticLavaGroup.add(new Lava(scene, pixelX, pixelY));
        } else if (tileCharacter === 'E') {
          exitGroup.add(new Exit(scene, pixelX, pixelY));
        } else if (tileCharacter === 'V') {
          fallingLavaGroup.add(new LavaFalling(scene, pixelX, pixelY));
        }
      });
    });

    // Calculate level boundaries
    const mapWidthInPixels = levelData[0].length * 32;
    const mapHeightInPixels = levelData.length * 32;

    // Set physics world boundaries
    scene.physics.world.setBounds(0, 0, mapWidthInPixels, mapHeightInPixels);
    
    // Configure camera to follow player
    if (playerCharacter) {
      scene.cameras.main.setBounds(0, 0, mapWidthInPixels, mapHeightInPixels);
      scene.cameras.main.startFollow(playerCharacter, true, 0.08, 0.08);
    }

    // Return all constructed level components
    return { 
      player: playerCharacter, 
      walls: wallGroup, 
      coins: coinGroup, 
      lavaStatic: staticLavaGroup, 
      lavaFallingGroup: fallingLavaGroup, 
      exits: exitGroup
    };
  }
}