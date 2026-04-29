## Audio

### 1. this.sound

`sound` is Phaser’s global audio manager.

```ts
this.sound.play('coin');
```

### 2. Loading sounds

```ts
preload(): void {
  this.load.audio('jump', 'assets/sound/smb_jump-small.wav');
}
```
Then we can play them later using their key.

```ts
this.sound.play('jump');
```

### 3. Sound effects

Short sound effects can be played directly with `this.sound.play()`.

```ts
playCoinSound(): void {
  this.sound.play('coin');
}
```

### 4. Sound configuration

mute → [true | false]  
volume → [0 - 1]  
rate → [multiplier]  
detune → [-1200 to 1200 cents]  
seek → [seconds] // starts immediately at this position  
loop → [true | false]  
delay → [seconds] // starts after this delay from the beginning  
source → [spatial audio config] // position, distance and follow settings for spatial sound  

Global configuration:

```ts
this.sound.volume = 0.5; // Sets the global volume to 50%.
this.sound.mute = true; // Mutes the whole game
```

Specific configuration:

```ts
this.sound.play(key, { rate: 0.5 }); // Plays this sound at half speed.
```

### 5. Background music

You should keep a reference to it.

```ts
private backgroundMusic?: Phaser.Sound.BaseSound;
```
```ts
this.backgroundMusic = this.sound.add('background', {
  loop: true,
  volume: 0.3,
});
```
Use `add()` when you need to create a sound object and control it later.

### 8. 

```ts
this.backgroundMusic?.isPlaying // Play music without duplicating it
this.backgroundMusic?.pause();
this.backgroundMusic?.resume();
this.backgroundMusic?.stop(); // The next `play()` starts from the beginning.
```

### 9. Best practices

Use `play()` for short sound effects and `add()` for persistent sounds like background music.

```ts
this.sound.play('jump');

this.backgroundMusic = this.sound.add('background', {
  loop: true,
  volume: 0.3,
});
```

For more info, visit https://docs.phaser.io/phaser/concepts/audio