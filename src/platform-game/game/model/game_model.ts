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
 * @desc Manages the overall game state and level progression.
 */

import { GAME_LEVELS, Level } from "./game_levels";

export type State = 'playing' | 'dead';

/** @classdesc Manages the game state, current level, and level data. */
class GameModel {
  private gameState: State = 'playing';
  private levels: Level[] = GAME_LEVELS;
  private currentLevel: number = 0;

  /** @desc Creates a new GameModel instance. */
  constructor() {}

  /**
   * @desc Returns the current level index.
   * @returns The current level number
   */
  getLevelCount(): number {
    return this.currentLevel;
  }

  /**
   * @desc Returns the level data for the current level.
   * @returns Array of strings representing the current level layout
   */
  getCurrentLevelData(): string[] {
    return this.levels[this.currentLevel].levelData;
  }

  /**
   * @desc Returns the number of coins needed to win the current level.
   * @returns Coins required to complete the current level
   */
  getCurrentLevelCoinsToWin(): number {
    return this.levels[this.currentLevel].coinsToWin;
  }

  /**
   * @desc Returns the current game state.
   * @returns The game state as a string
   */
  getGameState(): string {
    return this.gameState;
  }

  /**
   * @desc Restarts the game from the first level.
   */
  restartGame(): void {
    this.currentLevel = 0;
    this.gameState = 'playing';
  }

}