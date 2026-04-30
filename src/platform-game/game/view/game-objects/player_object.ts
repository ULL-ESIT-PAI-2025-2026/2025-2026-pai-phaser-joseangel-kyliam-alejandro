import * as Phaser from 'phaser';


/**
 * Class representing the player.
 * Manages physical movement and position resetting.
 */
export class Player extends Phaser.Physics.Arcade.Sprite {
  private readonly MOVE_SPEED = 200;
  private readonly JUMP_FORCE = 400;
  private readonly startX: number;
  private readonly startY: number;

  /**
   * @param scene The Phaser scene this player belongs to.
   * @param x Horizontal spawn position.
   * @param y Vertical spawn position.
   * @param texture The texture key.
   * @param frame Optional texture frame.
   */
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string | number = 0,
  ) {
    super(scene, x, y, texture, frame);
    this.startX = x;
    this.startY = y;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.initPhysics();
  }

  /**
   * Configures physics body properties.
   * @private
   */
  private initPhysics(): void {
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    body.setSize(this.width * 0.7, this.height * 0.9);
  }

  /**
   * Resets the player to the starting position and clears velocities.
   * @public
   */
  public reset(): void {
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0, 0);
    body.setAcceleration(0, 0);
    this.setPosition(this.startX, this.startY);
    this.clearTint();
    this.setAlpha(1);
  }

  /**
   * Handles player death by resetting position.
   * Can be extended to include death animations or sound triggers.
   * @public
   */
  public die(): void {
    this.emit('died');
    this.reset();
  }

  /**
   * Basic movement methods to be called by an external controller.
   */
  public moveLeft(): void {
    this.setVelocityX(-this.MOVE_SPEED);
    this.setFlipX(true);
  }

  public moveRight(): void {
    this.setVelocityX(this.MOVE_SPEED);
    this.setFlipX(false);
  }

  public stopMovement(): void {
    this.setVelocityX(0);
  }

  public jump(): void {
    const body = this.body as Phaser.Physics.Arcade.Body;
    if (body.blocked.down || body.touching.down) {
      this.setVelocityY(-this.JUMP_FORCE);
    }
  }
}
