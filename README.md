# 🐔 El Pollo Loco

A fun 2D jump-and-run game built with vanilla JavaScript and HTML5 Canvas. Help Pepe defeat the crazy chicken boss by collecting salsa bottles and throwing them at enemies!

![El Pollo Loco](img/9_intro_outro_screens/start/startscreen_1.png)

## 🎮 Gameplay

- **Objective:** Defeat the endboss (a giant chicken) by throwing salsa bottles at it
- **Collect:** Salsa bottles and coins scattered throughout the level
- **Avoid:** Chickens that will hurt you on contact
- **Jump:** On enemies to defeat them

## 🕹️ Controls

### Keyboard
| Key | Action |
|-----|--------|
| `A` | Move Left |
| `D` | Move Right |
| `Space` | Jump |
| `F` | Throw Bottle |

### Mobile
Touch controls are available on mobile devices with on-screen buttons for movement, jumping, and throwing.

## 🚀 Getting Started

### Play Online
Simply open `index.html` in your browser – no build process required!

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/el_pollo_loco.git

# Navigate to project directory
cd el_pollo_loco

# Open in browser
open index.html
# or use a local server like Live Server in VS Code
```

## 🏗️ Project Structure

```
el_pollo_loco/
├── index.html          # Main HTML file
├── style.css           # Styles
├── js/
│   ├── game.js         # Game initialization & input handling
│   └── audio.js        # Sound management
├── models/             # Game object classes
│   ├── world.class.js          # Main game controller
│   ├── character.class.js      # Player character (Pepe)
│   ├── endboss.class.js        # Final boss enemy
│   ├── movableObject.class.js  # Base class for moving objects
│   ├── drawableObject.class.js # Base class for drawable objects
│   └── ...                     # Other game objects
├── levels/
│   └── level1.js       # Level configuration
├── assets/
│   └── audio/          # Sound effects & music
├── img/                # Sprites & images
└── font/               # Custom fonts
```

## ✨ Features

- 🎨 Smooth sprite animations
- 🔊 Sound effects and background music (with mute toggle)
- 📱 Responsive design with mobile touch controls
- 🖥️ Fullscreen mode support
- 💾 Sound preference saved in localStorage
- 🎯 Collision detection with hitbox offsets
- ⏱️ Centralized interval management for clean game state handling

## 🛠️ Technologies

- **HTML5 Canvas** – Game rendering
- **Vanilla JavaScript (ES6+)** – Game logic with ES modules
- **CSS3** – UI styling and animations
- **No external game frameworks** – Built from scratch!

## 📖 Documentation

Class structure and API documentation can be found in [Structure.md](Structure.md).

To generate JSDoc documentation:
```bash
npm run docs
```

## 📸 Screenshots

| Start Screen | Gameplay | Boss Fight |
|--------------|----------|------------|
| ![Start](img/9_intro_outro_screens/start/startscreen_1.png) | *In-game* | *Endboss* |

## 🎵 Audio Credits

Background music and sound effects are included in the `assets/audio/` folder.

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Jan Brauner**

---

*This project was created as part of the Developer Akademie curriculum.*
