# 3D Interactive Portfolio

A stunning interactive 3D portfolio website inspired by Bruno Simon's groundbreaking design. This project combines creative web development with immersive 3D graphics, gamification, and modern web technologies.

## Features

### Core Experience

**Immersive 3D Environment**: A fully explorable 3D world built with Three.js and React Three Fiber, featuring a dark atmospheric setting with neon accents that create a gaming-like aesthetic.

**Driveable Vehicle**: Control a neon-styled vehicle using keyboard and mouse inputs. The vehicle features realistic physics simulation with smooth camera following, allowing you to explore the portfolio world naturally.

**Physics-Based Movement**: Implemented using Cannon.js physics engine, the vehicle responds realistically to acceleration, friction, and collision detection with the ground plane.

**Interactive Project Showcases**: Four glowing neon-framed project cards scattered throughout the world. Each card features:
- Dynamic hover effects with color transitions
- Floating animations
- Click interactions for detailed exploration
- Emissive lighting that responds to interaction state

### User Interface

**Game-Like UI Overlay**: A professional yet playful interface with neon-themed panels that display:
- Real-time vehicle statistics (speed, distance traveled)
- Control instructions with keyboard mappings
- Achievement tracking system
- Welcome message and guidance

**Responsive Controls Panel**: Collapsible help section showing all available controls with visual hierarchy and clear labeling.

**Achievement System**: Track exploration milestones and unlock achievements as you explore the portfolio world.

## Controls

| Input | Action |
|-------|--------|
| **W** or **↑** | Move forward |
| **A** or **←** | Move left |
| **S** or **↓** | Move backward |
| **D** or **→** | Move right |
| **Mouse** | Look around and control camera |
| **Click** | Interact with project cards |
| **?** | Toggle controls panel |

## Technology Stack

**3D Rendering**
- **Three.js**: Industry-standard WebGL library for 3D graphics
- **React Three Fiber**: React renderer for Three.js, enabling declarative 3D scene composition
- **@react-three/drei**: Useful helpers and utilities for R3F development

**Physics**
- **Cannon.js**: Physics engine for realistic vehicle movement and collision detection

**Styling & UI**
- **Tailwind CSS 4**: Utility-first CSS framework for responsive design
- **shadcn/ui**: High-quality React components built on Radix UI

**Build & Development**
- **Vite**: Next-generation frontend build tool for fast development
- **React 19**: Latest React version with improved performance
- **TypeScript**: Type-safe JavaScript for better development experience

## Design Philosophy

**Neon Cyberpunk Aesthetic**: The portfolio embraces a dark theme with vibrant neon colors (cyan #00d4ff and magenta #ff006e) to create an immersive, modern gaming atmosphere.

**Gamification**: By presenting the portfolio as an interactive game world rather than a traditional website, we create higher engagement and memorable exploration experiences.

**Performance Optimized**: The 3D scene is optimized for smooth 60 FPS performance with efficient rendering, physics calculations, and memory management.

**Accessibility**: Multiple control schemes (keyboard, mouse, future gamepad support) ensure the experience is accessible to diverse users.

## Project Structure

```
client/
  src/
    components/
      Scene3D.tsx          # Main 3D canvas and scene setup
      Vehicle.tsx          # Driveable vehicle with physics
      Ground.tsx           # Ground plane with grid effects
      ProjectShowcase.tsx  # Interactive project cards
      GameUI.tsx           # Overlay UI and HUD
    pages/
      Home.tsx             # Main portfolio page
    App.tsx                # Application root with routing
    index.css              # Global styles and theme
```

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

### Development

The development server runs on `http://localhost:3000` with hot module replacement for instant feedback during development.

## Future Enhancements

**Planned Features**
- Sound effects synchronized with vehicle movement and interactions
- Ambient background music with dynamic layers
- Additional project showcases with detailed information
- Leaderboard system for exploration metrics
- Whisper/message system for visitor interactions
- Advanced achievements and progression system
- Mobile touch controls and responsive design improvements
- GLTF model loading for custom 3D assets
- Particle effects and visual polish

**Performance Optimizations**
- Level of detail (LOD) system for distant objects
- Frustum culling for off-screen object optimization
- Texture atlasing for reduced draw calls
- WebGPU support for future rendering improvements

## Browser Support

This portfolio requires a modern browser with WebGL 2.0 support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 15+

## License

This project is created as a portfolio showcase and is inspired by Bruno Simon's innovative approach to web design.

## Credits

**Inspiration**: Bruno Simon's groundbreaking 3D portfolio (bruno-simon.com)

**Technologies**: Three.js, React Three Fiber, Cannon.js, Tailwind CSS

**Design**: Neon cyberpunk aesthetic with gaming-inspired UI patterns

---

**Explore the world. Discover the projects. Experience the future of portfolio design.**
