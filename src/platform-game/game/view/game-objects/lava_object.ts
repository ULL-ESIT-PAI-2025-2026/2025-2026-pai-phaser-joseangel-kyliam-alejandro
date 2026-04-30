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
 * @desc Lava Object that contains physics
 */

import * as Phaser from 'phaser';


/**
 * Class representing lava hazards with constant movement logic.
 */
export class Lava extends Phaser.Physics.Arcade.Image {

  public static readonly EVENT_PLAYER_TOUCHED = 'player-touched';

  public static readonly EVENT_GROUND_TOUCHED = 'ground-touched';

  /** @private @const {number} Default falling speed in pixels per second. */
  private readonly FALL_SPEED = 150;

  /** @private @const {number} Initial coordinates for reset logic. */
  private readonly startX: number;
  private readonly startY: number;

  /**
   * @param scene The Phaser scene this object belongs to.
   * @param x The horizontal position.
   * @param y The vertical position.
   * @param texture The texture key.
   * @param frame Optional texture frame.
   * @param isFalling Whether the lava should move downwards.
   */
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string | number = 0,
    isFalling: boolean = false,
  ) {
    super(scene, x, y, texture, frame);

    this.startX = x;
    this.startY = y;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init(isFalling);
  }

  /**
   * Configures physics and movement.
   * @param isFalling If true, the lava moves at a constant speed.
   * @private
   */
  private init(isFalling: boolean): void {
    this.setOrigin(0, 0);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    body.setImmovable(!isFalling);

    if (isFalling) {
      body.setVelocityY(this.FALL_SPEED);
    }
  }

  /**
   * Resets the lava to its spawn point and restarts constant movement.
   */
  public resetPosition(): void {
    const body = this.body as Phaser.Physics.Arcade.Body;
    
    this.setPosition(this.startX, this.startY);
    
    // Only restart velocity if it was a falling type.
    if (!body.immovable) {
      body.setVelocityY(this.FALL_SPEED);
    }
  }

  /**
   * Dispatches the player interaction event.
   */
  public onPlayerOverlap(): void {
    this.emit(Lava.EVENT_PLAYER_TOUCHED);
  }

  /**
   * Dispatches the ground contact event and triggers reset.
   */
  public onGroundOverlap(): void {
    this.emit(Lava.EVENT_GROUND_TOUCHED);
    this.resetPosition();
  }
}