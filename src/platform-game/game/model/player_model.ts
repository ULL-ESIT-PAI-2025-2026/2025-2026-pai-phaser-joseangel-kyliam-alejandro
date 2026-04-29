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
 * @desc Manages the player's lives and coins.
 */

/** @classdesc Tracks player lives, coins, and death state. */
class PlayerModel {
  private livesLeft: number = 0;
  private coins: number = 0;

  /** @desc Creates a new PlayerModel instance. */
  constructor() {}

  /**
   * @desc Returns the current number of coins collected.
   * @returns The coin count
   */
  getCoins(): number {
    return this.coins;
  }

  /**
   * @desc Returns the number of lives remaining.
   * @returns Lives left
   */
  getlLivesLeft(): number {
    return this.livesLeft;
  }

  /**
   * @desc Checks whether the player has no lives left.
   * @returns True if the player is dead, false otherwise
   */
  checkIfDead(): boolean {
    return this.livesLeft === 0;
  }

  /**
   * @desc Sets the player as dead and resets coins to zero.
   */
  hasDead(): void {
    this.livesLeft = 0;
    this.coins = 0;
  }
}