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
└── BackgroundObject
└── StatusBar

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

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `loadImage(path)` | `path: string` | `void` | Loads a single image and sets it as current image |
| `loadImages(arr)` | `arr: string[]` | `void` | Loads multiple images into the imageCache |
| `draw(ctx)` | `ctx: CanvasRenderingContext2D` | `void` | Draws the object onto the canvas |
| `drawFrame(ctx)` | `ctx: CanvasRenderingContext2D` | `void` | Draws a red debug frame (Character, NormalChicken, SmallChicken only) |

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

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `moveRight()` | – | `void` | Moves the object right by its speed |
| `moveLeft()` | – | `void` | Moves the object left by its speed |
| `jump()` | – | `number` | Sets speedY to 30 to initiate a jump |
| `playAnimation(images)` | `images: string[]` | `void` | Cycles through the given image array |
| `isColliding(object)` | `object: DrawableObject` | `boolean` | AABB collision detection |
| `hit()` | – | `void` | Reduces energy by 5 and records the hit time |
| `isDead()` | – | `boolean` | Returns true if energy equals 0 |
| `isHurt()` | – | `boolean` | Returns true if last hit was less than 1s ago |
| `applyGravity()` | – | `void` | Applies gravity via interval using acceleration |
| `isAboveGround()` | – | `boolean` | Returns true if above ground level (always true for ThrowableObject) |

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
| `world` | `World` | – |
| `WALKING_IMAGES` | `string[]` | 6 frames |
| `JUMPING_IMAGES` | `string[]` | 9 frames |
| `HURT_IMAGES` | `string[]` | 3 frames |
| `DEAD_IMAGES` | `string[]` | 7 frames |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor()` | – | – | Loads all images, starts animation and gravity |
| `animate()` | – | `void` | Handles keyboard input and animation state |

---

## NormalChicken `extends MovableObject`
> A standard enemy chicken that walks to the left.

### Properties
| Name | Type | Default |
|---|---|---|
| `width` | `number` | `50` |
| `height` | `number` | `50` |
| `y` | `number` | `380` |
| `x` | `number` | random `200–700` |
| `speed` | `number` | random `0.2–0.45` |
| `WALKING_IMAGES` | `string[]` | 3 frames |

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
| `ENDBOSS_IMAGES` | `string[]` | 8 alert frames |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor()` | – | – | Loads alert images and starts the animation |
| `animate()` | – | `void` | Plays the alert animation in a loop |

---

## Cloud `extends MovableObject`
> A decorative cloud that moves to the left.

### Properties
| Name | Type | Default |
|---|---|---|
| `x` | `number` | random `20–740` |
| `y` | `number` | `20` |
| `width` | `number` | `300` |
| `height` | `number` | `200` |

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

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor(x, y)` | `x: number, y: number` | – | Sets position and immediately throws the bottle |
| `throw()` | – | `void` | Sets speedY, applies gravity, moves right in a loop |

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

## StatusBar `extends DrawableObject`
> Displays a percentage-based status bar (health, coin, bottle).

### Properties
| Name | Type | Default |
|---|---|---|
| `x` | `number` | `20` |
| `y` | `number` | `0` |
| `width` | `number` | `200` |
| `height` | `number` | `60` |
| `percentage` | `number` | `100` |
| `STATUSBAR_COIN_IMAGES` | `string[]` | 6 images |
| `STATUSBAR_HEART_IMAGES` | `string[]` | 6 images |
| `STATUSBAR_BOTTLE_IMAGES` | `string[]` | 6 images |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor(type?)` | `type?: string` | – | Loads all bar images and sets percentage to 100 |
| `setPercentage(percentage)` | `percentage: number` | `void` | Updates percentage and displayed image |
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
| `collectables` | `Object[]` | Collectable items |
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
| `statusBarHealth` | `StatusBar` | Health status bar |
| `statusBarCoin` | `StatusBar` | Coin status bar |
| `statusBarBottle` | `StatusBar` | Bottle status bar |
| `bottle` | `ThrowableObject[]` | Active thrown bottles |
| `level` | `Level` | The current level |
| `canvas` | `HTMLCanvasElement` | The game canvas |
| `ctx` | `CanvasRenderingContext2D` | The canvas 2D context |
| `keyboard` | `Keyboard` | The keyboard input handler |
| `camera_x` | `number` | Horizontal camera offset |

### Methods
| Method | Parameters | Returns | Description |
|---|---|---|---|
| `constructor(canvas, keyboard)` | `canvas: HTMLCanvasElement, keyboard: Keyboard` | – | Initializes and starts the game |
| `setWorld()` | – | `void` | Passes world reference to the character |
| `run()` | – | `void` | Starts the main game loop |
| `checkThrowObject()` | – | `void` | Creates a bottle if THROW key is pressed |
| `checkCollisions()` | – | `void` | Checks enemy collisions and updates health bar |
| `draw()` | – | `void` | Redraws all objects every frame |
| `addObjectsToCanvas(objects)` | `objects: DrawableObject[]` | `void` | Draws an array of objects |
| `addToCanvas(object)` | `object: DrawableObject` | `void` | Draws one object with optional mirroring |
| `mirrorImage(object)` | `object: DrawableObject` | `void` | Applies horizontal canvas mirror transform |

