import * as Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import UIScene from './scenes/UIScene';
import PauseScene from './scenes/PauseScene';

export function StartGame(containerId: string) {

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,

    width: 800,
    height: 600,

    parent: containerId,

    backgroundColor: '#66CDAA',

    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 300 },
        debug: true
      }
    },

    scene: [GameScene, UIScene, PauseScene]
  };

  new Phaser.Game(config);
}