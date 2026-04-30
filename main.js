import Phaser from 'phaser';
import GameModel from './src/model/GameModel';
import GameController from './src/controller/GameController';
import MainScene from './src/view/MainScene';

const model = new GameModel();
const controller = new GameController(model);

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 600 } }
    },
    scene: [MainScene]
};

const game = new Phaser.Game(config);

// Pasamos las instancias a la escena
game.scene.start('MainScene', { model, controller });