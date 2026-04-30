import eventCenter from '../events/EventCenter';

class GameState {
  public lives: number = 3;
  public currentLevelIndex: number = 0;
  public coins: number = 0;
  public secondsElapsed: number = 0; // Nuevo

  resetLevel() {
    this.lives--;
    eventCenter.emit('update-lives', this.lives);
  }

  resetGame() {
    this.lives = 3;
    this.currentLevelIndex = 0;
    this.coins = 0;
    this.secondsElapsed = 0;
    eventCenter.emit('update-lives', this.lives);
    eventCenter.emit('update-coins', this.coins);
    eventCenter.emit('update-timer', this.secondsElapsed);
  }
  nextLevel() {
    this.currentLevelIndex++;
  }

  isGameOver(): boolean {
    return this.lives <= 0;
  }
  addCoin() {
    this.coins++;
    eventCenter.emit('update-coins', this.coins);
  }

  // Utilidad para convertir segundos a formato mm:ss
  getFormattedTime() {
    const mins = Math.floor(this.secondsElapsed / 60);
    const secs = this.secondsElapsed % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}

export const gameState = new GameState();