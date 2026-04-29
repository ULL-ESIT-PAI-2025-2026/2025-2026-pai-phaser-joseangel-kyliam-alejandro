## Cameras

### 1. Access the main camera

```ts
const mainCamera = this.cameras.main;
```

### 2. Move a camera

```ts
mainCamera.setScroll(x, y);
mainCamera.centerOn(x, y);

mainCamera.scrollX = x;
mainCamera.scrollY = y;
```

### 3. Follow an object

```ts
mainCamera.startFollow(player);
mainCamera.stopFollow();
```

With interpolation:

```ts
mainCamera.startFollow(player, shouldPixelsBeRoundedToAvoidAliasing, smoothnessX, smoothnessY);
```

### 4. Zoom

```ts
mainCamera.setZoom(2);
mainCamera.zoom = 0.5;
```

### 5. Set bounds

```ts
mainCamera.setBounds(x, y, width, height);
```

### 6. Background & effects

```ts
mainCamera.setBackgroundColor('black');

mainCamera.fadeIn(duration);
mainCamera.fadeOut(duration);
mainCamera.shake(duration, intensity);
```

### 7. Typical setup

```ts
mainCamera.setBounds(0, 0, worldWidth, worldHeight);
mainCamera.startFollow(player, true, 0.08, 0.08);
```
