# El Pollo Loco – Class Structure

## Inheritance Hierarchy

```
DrawableObject
├── MovableObject
│   ├── Character
│   ├── NormalChicken
│   │   └── SmallChicken
│   ├── Endboss
│   ├── Cloud
│   └── ThrowableObject
├── BackgroundObject
├── StatusBar
└── CollectableObject
    ├── GroundBottle
    └── Coin

Keyboard          (standalone)
Level             (standalone)
World             (standalone)
```

---

## DrawableObject
> Base class for all objects that can be drawn on the canvas.

### Properties
| Name | Type | Default |
|---|---|---|
| `img` | `HTMLImageElement` | – |
| `imageCache` | `Object` | `{}` |
| `height` | `number` | `150` |
| `width` | `number` | `100` |
| `x` | `number` | – |
| `y` | `number` | – |
| `offsetTop` | `number` | – |
| `offsetBottom` | `number` | – |
| `offsetLeft` | `number` | – |
| `offsetRight` | `number` | – |
| `currentImage` | `number` | `0` |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `isColliding(object)` | `object: MovableObject` | `boolean` | Offset-based AABB collision detection |
| `loadImage(path)` | `path: string` | `void` | Loads a single image and sets it as current image |
| `loadImages(arr)` | `arr: string[]` | `void` | Loads multiple images into the imageCache |
| `draw(ctx)` | `ctx: CanvasRenderingContext2D` | `void` | Draws the object onto the canvas |
| `drawFrame(ctx)` | `ctx: CanvasRenderingContext2D` | `void` | Draws a red debug frame (Character, NormalChicken, SmallChicken, Endboss, CollectableObject only) |
| `drawHitBox(ctx)` | `ctx: CanvasRenderingContext2D` | `void` | Draws a blue debug hitbox based on offset values (Character, NormalChicken, SmallChicken, Endboss, CollectableObject only) |
| `playAnimation(images)` | `images: string[]` | `void` | Cycles through the given image array |

---

## MovableObject `extends DrawableObject`
> Extends DrawableObject with movement, physics, animation and collision logic.

### Properties
| Name | Type | Default |
|---|---|---|
| `currentImage` | `number` | `0` |
| `speed` | `number` | `0.2` |
| `otherDirection` | `boolean` | `false` |
| `speedY` | `number` | – |
| `energy` | `number` | `100` |
| `lastHit` | `number` | `0` |
| `imageCache` | `Object` | `{}` |
| `lastKey` | `number` | – |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `moveRight()` | – | `void` | Moves the object right by its speed and resets `otherDirection` |
| `moveLeft()` | – | `void` | Moves the object left by its speed |
| `jump()` | – | `number` | Sets speedY to 25 to initiate a jump |
| `playAnimation(images)` | `images: string[]` | `void` | Cycles through the given image array (overrides DrawableObject) |
| `hit()` | – | `void` | Reduces energy by 5 and records the hit time |
| `isDead()` | – | `boolean` | Returns true if energy equals 0 |
| `isHurt()` | – | `boolean` | Returns true if last hit was less than 1s ago |
| `applyGravity()` | – | `void` | Applies gravity via interval using acceleration |
| `isAboveGround()` | – | `boolean` | Returns true if above ground level (always true for ThrowableObject) |
| `setLastKeyTime()` | – | `void` | Records the current timestamp as the time of the last key press |
| `longIdle()` | – | `boolean` | Returns true if no key press for more than 10 seconds |

---

## Character `extends MovableObject`
> The player-controlled character (Pepe).

### Properties
| Name | Type | Default |
|---|---|---|
| `x` | `number` | `100` |
| `y` | `number` | `74` |
| `height` | `number` | `200` |
| `width` | `number` | `120` |
| `speed` | `number` | `5` |
| `speedY` | `number` | `0` |
| `acceleration` | `number` | `2` |
| `offsetTop` | `number` | `80` |
| `offsetBottom` | `number` | `40` |
| `offsetLeft` | `number` | `20` |
| `offsetRight` | `number` | `20` |
| `collectedBottles` | `number` | `0` |
| `collectedCoins` | `number` | `0` |
| `world` | `World` | – |
| `IDLE_IMAGES` | `string[]` | 10 frames |
| `LONG_IDLE_IMAGES` | `string[]` | 10 frames |
| `WALKING_IMAGES` | `string[]` | 6 frames |
| `JUMPING_IMAGES` | `string[]` | 10 frames |
| `HURT_IMAGES` | `string[]` | 3 frames |
| `DEAD_IMAGES` | `string[]` | 7 frames |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor()` | – | – | Loads all images, starts animation and gravity |
| `animate()` | – | `void` | Handles keyboard input and animation state (dead, hurt, walking, jumping, idle, long idle) |

---

## NormalChicken `extends MovableObject`
> A standard enemy chicken that walks to the left.

### Properties
| Name | Type | Default |
|---|---|---|
| `width` | `number` | `50` |
| `height` | `number` | `50` |
| `y` | `number` | `380` |
| `x` | `number` | random `300–800` |
| `speed` | `number` | random `0.2–0.45` |
| `offsetTop` | `number` | `5` |
| `offsetBottom` | `number` | `5` |
| `offsetLeft` | `number` | `5` |
| `offsetRight` | `number` | `5` |
| `WALKING_IMAGES` | `string[]` | 3 frames |
| `DEAD_IMAGE` | `string[]` | 1 frame |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor()` | – | – | Loads images, sets random position and speed |
| `animate()` | – | `void` | Plays the walking animation in a loop |
| `animation()` | – | `void` | Moves the chicken left in a loop |

---

## SmallChicken `extends NormalChicken`
> A smaller variant of the chicken enemy.

### Properties
| Name | Type | Default |
|---|---|---|
| `WALKING_IMAGES` | `string[]` | 3 frames (small chicken) |
| `DEAD_IMAGE` | `string[]` | 1 frame (small chicken) |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor()` | – | – | Loads small chicken images, sets random position |

---

## Endboss `extends MovableObject`
> The final boss enemy.

### Properties
| Name | Type | Default |
|---|---|---|
| `x` | `number` | `2000` |
| `y` | `number` | `50` |
| `height` | `number` | `400` |
| `width` | `number` | `300` |
| `speed` | `number` | `0.15` |
| `offsetTop` | `number` | `70` |
| `offsetBottom` | `number` | `50` |
| `offsetLeft` | `number` | `20` |
| `offsetRight` | `number` | `20` |
| `ENDBOSS_WALK_IMAGES` | `string[]` | 4 frames |
| `ENDBOSS_ALERT_IMAGES` | `string[]` | 8 frames |
| `ENDBOSS_ATTACK_IMAGES` | `string[]` | 8 frames |
| `ENDBOSS_HURT_IMAGES` | `string[]` | 3 frames |
| `ENDBOSS_DEAD_IMAGES` | `string[]` | 3 frames |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor()` | – | – | Loads all animation images and starts the animation loop |
| `animate()` | – | `void` | Selects animation based on state (dead, hurt or alert) |

---

## Cloud `extends MovableObject`
> A decorative cloud that moves to the left.

### Properties
| Name | Type | Default |
|---|---|---|
| `x` | `number` | `20 + random * 2160` |
| `y` | `number` | `20` |
| `width` | `number` | `300` |
| `height` | `number` | `200` |
| `CLOUD_IMAGES` | `string[]` | 2 images |
| `randomCloud` | `string` | random selection from `CLOUD_IMAGES` |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor()` | – | – | Loads a random cloud image and starts movement |
| `animation()` | – | `void` | Moves the cloud left in a loop |

---

## ThrowableObject `extends MovableObject`
> A throwable salsa bottle launched by the character.

### Properties
| Name | Type | Default |
|---|---|---|
| `acceleration` | `number` | `3` |
| `x` | `number` | passed in constructor |
| `y` | `number` | passed in constructor |
| `width` | `number` | `50` |
| `height` | `number` | `50` |
| `isSplashing` | `boolean` | `false` |
| `splashDone` | `boolean` | `false` |
| `otherDirection` | `boolean` | passed in constructor |
| `offsetTop` | `number` | `0` |
| `offsetBottom` | `number` | `0` |
| `offsetLeft` | `number` | `0` |
| `offsetRight` | `number` | `0` |
| `THROW_IMAGES` | `string[]` | 4 frames |
| `BOTTLE_SPLASH_IMAGES` | `string[]` | 6 frames |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor(x, y, otherDirection)` | `x: number, y: number, otherDirection: boolean` | – | Sets position, loads images, sets direction and immediately throws the bottle |
| `throw()` | – | `void` | Sets speedY to 30, applies gravity, moves left or right based on `otherDirection` and plays rotation animation in a loop |
| `bottleSplash()` | – | `void` | Triggers the splash animation when the bottle hits an enemy; sets `splashDone` after completion |

---

## BackgroundObject `extends DrawableObject`
> A static background layer object.

### Properties
| Name | Type | Default |
|---|---|---|
| `width` | `number` | `720` |
| `height` | `number` | `480` |
| `x` | `number` | passed in constructor |
| `y` | `number` | `480 - height` |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor(imagePath, x)` | `imagePath: string, x: number` | – | Loads the image and sets position |

---

## CollectableObject `extends DrawableObject`
> Base class for all collectable items (bottles and coins).

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor()` | – | – | Calls parent constructor |

---

## GroundBottle `extends CollectableObject`
> A collectable salsa bottle lying on the ground.

### Properties
| Name | Type | Default |
|---|---|---|
| `y` | `number` | `370` |
| `x` | `number` | `300 + random * 2000` |
| `width` | `number` | `60` |
| `height` | `number` | `60` |
| `offsetTop` | `number` | `10` |
| `offsetBottom` | `number` | `10` |
| `offsetLeft` | `number` | `15` |
| `offsetRight` | `number` | `15` |
| `BOTTLES_GROUND_IMAGES` | `string[]` | 2 images |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor()` | – | – | Loads bottle images, sets random x-position, starts animation |
| `animate()` | – | `void` | Cycles through bottle ground images in a loop |

---

## Coin `extends CollectableObject`
> A collectable coin.

### Properties
| Name | Type | Default |
|---|---|---|
| `y` | `number` | `300` |
| `x` | `number` | `300 + random * 2160` |
| `width` | `number` | `100` |
| `height` | `number` | `100` |
| `offsetTop` | `number` | `35` |
| `offsetBottom` | `number` | `35` |
| `offsetLeft` | `number` | `35` |
| `offsetRight` | `number` | `35` |
| `COIN_IMAGES` | `string[]` | 2 images |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor()` | – | – | Loads coin images, sets random x-position, starts animation |
| `animate()` | – | `void` | Cycles through coin images in a loop |

---

## StatusBar `extends DrawableObject`
> Displays a percentage-based status bar (health, coin, bottles).

### Properties
| Name | Type | Default |
|---|---|---|
| `x` | `number` | `20` |
| `y` | `number` | `0` |
| `width` | `number` | `200` |
| `height` | `number` | `60` |
| `percentage` | `number` | `100` |
| `collected` | `number` | `0` |
| `type` | `string` | – |
| `STATUSBAR_COIN_IMAGES` | `string[]` | 6 images |
| `STATUSBAR_HEART_IMAGES` | `string[]` | 6 images |
| `STATUSBAR_BOTTLE_IMAGES` | `string[]` | 6 images |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor(type)` | `type: string` | – | Loads all bar images for the given type and sets initial display |
| `setStatusbar(type)` | `type: string` | `void` | Initializes the status bar image based on type (HEART, COIN, BOTTLE) |
| `setPercentage(percentage)` | `percentage: number` | `void` | Updates percentage and displayed image |
| `setCollected(collected)` | `collected: number` | `void` | Updates collected count and displayed image |
| `resolveImageIndex(percentage)` | `percentage: number` | `number` | Returns image index (0–5) for the given percentage |

---

## Keyboard
> Tracks the state of relevant keyboard keys.

### Properties
| Name | Type | Default |
|---|---|---|
| `LEFT` | `boolean` | `false` |
| `RIGHT` | `boolean` | `false` |
| `UP` | `boolean` | `false` |
| `THROW` | `boolean` | `false` |

---

## Level
> Holds all data for a single game level.

### Properties
| Name | Type | Description |
|---|---|---|
| `enemies` | `MovableObject[]` | All enemy objects |
| `clouds` | `Cloud[]` | All cloud objects |
| `backgroundObjects` | `BackgroundObject[]` | All background layers |
| `collectables` | `CollectableObject[]` | Collectable bottles and coins |
| `level_end_x` | `number` | X-position of level end (`720 * 3`) |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor(enemies, clouds, backgroundObjects, collectables)` | arrays | – | Assigns all level data |

---

## World
> The main game controller. Manages rendering, game loop, and interactions.

### Properties
| Name | Type | Description |
|---|---|---|
| `character` | `Character` | The player character |
| `endboss` | `Endboss` | The final boss enemy |
| `statusBar` | `Object` | Object holding StatusBar instances keyed by type (`BOTTLE`, `COIN`, `HEART`) |
| `bottles` | `ThrowableObject[]` | Active thrown bottles |
| `collectables` | `CollectableObject[]` | (unused, collectables are in level) |
| `level` | `Level` | The current level |
| `canvas` | `HTMLCanvasElement` | The game canvas |
| `ctx` | `CanvasRenderingContext2D` | The canvas 2D context |
| `keyboard` | `Keyboard` | The keyboard input handler |
| `camera_x` | `number` | Horizontal camera offset |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor(canvas, keyboard)` | `canvas: HTMLCanvasElement, keyboard: Keyboard` | – | Initializes status bars, drawing, world reference and game loop |
| `setWorld()` | – | `void` | Passes world reference to the character |
| `run()` | – | `void` | Starts the main game loop (collisions and throw checks) |
| `checkThrowObject()` | – | `void` | Creates a bottle if THROW key is pressed and character has collected bottles |
| `checkCollisions()` | – | `void` | Checks character vs. enemies, bottle vs. enemies/endboss, and character vs. collectables (GroundBottle, Coin) |
| `draw()` | – | `void` | Redraws all objects every frame via `requestAnimationFrame` |
| `addObjectsToCanvas(objects)` | `objects: DrawableObject[]` | `void` | Draws an array of objects |
| `addToCanvas(object)` | `object: DrawableObject` | `void` | Draws one object with optional mirroring, debug frame and hitbox |
| `mirrorImage(object)` | `object: DrawableObject` | `void` | Applies horizontal canvas mirror transform |
