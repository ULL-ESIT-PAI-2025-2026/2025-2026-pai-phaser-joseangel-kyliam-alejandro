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
 * @desc Manages and tracks global game state including lives, level progression,
 * coin collection, and elapsed game time.
 */

import eventCenter from '../events/EventCenter';

/**
 * @classdesc Game state manager tracking player lives, current level, collected coins,
 * and elapsed time. Emits events for state changes to update the UI.
 */
class GameState {
  /**
   * @desc The number of remaining player lives.
   */
  public lives: number = 3;

  /**
   * @desc The index of the currently active level.
   */
  public currentLevelIndex: number = 0;

  /**
   * @desc The total number of coins collected in the current level.
   */
  public coins: number = 0;

  /**
   * @desc The total seconds elapsed in the current game session.
   */
  public secondsElapsed: number = 0;

  /**
   * @desc Decrements remaining lives and emits a state change event.
   */
  resetLevel(): void {
    this.lives--;
    eventCenter.emit('update-lives', this.lives);
  }

  /**
   * @desc Resets all game state to initial values for a new game session.
   */
  resetGame(): void {
    this.lives = 3;
    this.currentLevelIndex = 0;
    this.coins = 0;
    this.secondsElapsed = 0;
    eventCenter.emit('update-lives', this.lives);
    eventCenter.emit('update-coins', this.coins);
    eventCenter.emit('update-timer', this.secondsElapsed);
  }

  /**
   * @desc Advances to the next level in the game sequence.
   */
  nextLevel(): void {
    this.currentLevelIndex++;
  }

  /**
   * @desc Determines if the player has exhausted all lives.
   * @returns True if no lives remain, false otherwise.
   */
  isGameOver(): boolean {
    return this.lives <= 0;
  }

  /**
   * @desc Increments coin count and emits a state change event.
   */
  addCoin(): void {
    this.coins++;
    eventCenter.emit('update-coins', this.coins);
  }

  /**
   * @desc Converts elapsed seconds to formatted time string in MM:SS format.
   * @returns A formatted time string (e.g., "01:23").
   */
  getFormattedTime(): string {
    const minutes = Math.floor(this.secondsElapsed / 60);
    const seconds = this.secondsElapsed % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

/**
 * @desc Singleton instance of GameState used throughout the application.
 */
export const gameState = new GameState();