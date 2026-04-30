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
 * @desc Represents falling lava spawners that periodically drop lava hazards.
 */

import * as Phaser from 'phaser';

/**
 * @classdesc A dynamic falling lava sprite that spawns at intervals and falls
 * during gameplay. Deactivates on wall collision and respawns periodically.
 */
export default class LavaFalling extends Phaser.Physics.Arcade.Sprite {
  /**
   * @desc Initial horizontal spawn position used for respawning.
   */
  private initialSpawnX: number;

  /**
   * @desc Initial vertical spawn position used for respawning.
   */
  private initialSpawnY: number;

  /**
   * @desc Timer event controlling the respawn cycle of falling lava.
   */
  private respawnTimerEvent?: Phaser.Time.TimerEvent;
  
  /**
   * @desc Delay in milliseconds between consecutive lava drops.
   */
  private readonly FALL_SPAWN_INTERVAL = 3000;

  /**
   * @desc Downward velocity applied to falling lava.
   */
  private readonly FALL_VELOCITY = 200;

  /**
   * @desc Constructor initializes a falling lava spawner at the given position.
   * @param scene - The Phaser scene containing this lava spawner.
   * @param x - Horizontal spawn position.
   * @param y - Vertical spawn position.
   */
  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Initialize sprite using frame 1 from the main spritesheet
    super(scene, x, y, 'main-sprites', 1); 

    this.initialSpawnX = x;
    this.initialSpawnY = y;

    // Register sprite as a display object
    scene.add.existing(this);
    // Enable dynamic physics body (affected by gravity and collision)
    scene.physics.add.existing(this, false); 

    // Set visual dimensions
    this.setDisplaySize(20, 32); 
    // Color lava orange for distinction from static lava
    this.setTint(0xff6600); 

    // Start the falling lava cycle
    this.startFallingCycle();
  }

  /**
   * @desc Initializes the falling cycle and creates the respawn timer.
   */
  private startFallingCycle(): void {
    // Spawn the initial lava drop immediately
    this.spawnLavaDroplet();

    // Create timer event for periodic spawning
    this.respawnTimerEvent = this.scene.time.addEvent({
      delay: this.FALL_SPAWN_INTERVAL,
      callback: this.spawnLavaDroplet,
      callbackScope: this,
      loop: true
    });
  }

  /**
   * @desc Spawns a new lava droplet at the initial position with downward velocity.
   */
  private spawnLavaDroplet(): void {
    // Check if scene still exists to avoid errors on restart
    if (!this.scene || !this.scene.sys) return;

    // Make the sprite visible and active
    this.setActive(true);
    this.setVisible(true);
    
    // Reactivate physics body for simulation
    const physicsBody = this.body as Phaser.Physics.Arcade.Body;
    physicsBody.setEnable(true);
    
    // Reset position to spawn point
    this.setPosition(this.initialSpawnX, this.initialSpawnY);
    physicsBody.reset(this.initialSpawnX, this.initialSpawnY);
    // Apply downward velocity
    physicsBody.setVelocityY(this.FALL_VELOCITY);
  }

  /**
   * @desc Deactivates the lava droplet when it hits an obstacle,
   * disabling physics simulation until next respawn.
   */
  public deactivate(): void {
    // Hide sprite visually
    this.setActive(false);
    this.setVisible(false);
    
    // Disable physics simulation
    const physicsBody = this.body as Phaser.Physics.Arcade.Body;
    physicsBody.stop(); 
    physicsBody.setEnable(false);
  }

  /**
   * @desc Cleanup method to remove timer event when the sprite is destroyed.
   * @param fromScene - Whether destruction is triggered from scene cleanup.
   */
  destroy(fromScene?: boolean): void {
    // Clean up timer to prevent memory leaks
    if (this.respawnTimerEvent) {
      this.respawnTimerEvent.destroy();
    }
    super.destroy(fromScene);
  }
}