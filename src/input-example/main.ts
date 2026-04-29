import * as Phaser from 'phaser';
import GameScene from './game-scene';

function main() {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#2d2d2d',
    pixelArt: true, // Importante para que el pixel art no se vea borroso
    scene: [GameScene],
    physics: {
        default: 'arcade', // Por si decides añadir colisiones luego
        arcade: {
            debug: false
        }
    }
  };
  new Phaser.Game(config);
}

main();
