# Mock GPS - Location Spoofing Application

A powerful GPS location spoofing application with satellite map integration and two control modes for unlimited location manipulation.

## 🎯 Features

### Core Features
- **🛰️ Satellite Map Display**: High-resolution satellite imagery with city labels
- **📍 Real-time Location Display**: Shows current spoofed GPS coordinates
- **🎮 Two Control Modes**: Teleport and Joystick modes
- **🔄 Live Map Updates**: Map continuously updates as location changes

### Teleport Mode
- Enter exact latitude and longitude coordinates
- Instant teleportation to any location on Earth
- Input validation for geographic bounds
- Quick preset buttons for popular cities:
  - 🗽 New York
  - 🇬🇧 London
  - 🗼 Paris
  - 🗾 Tokyo
  - 🦘 Sydney
  - 🌉 San Francisco

### Joystick Mode
- **Unlimited Speed Control**: No speed limits or restrictions
- **Text Input Speeds**: Enter any numerical value for precise control
- **Degrees Per Second**: Speed measured in °/sec (latitude and longitude)
- **Smooth Movement**: Real-time movement with continuous location updates
- **Quick Direction Buttons**: North, South, East, West controls
- **Movement Status Indicator**: Visual feedback on movement state

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/cameronboye10-collab/Mock-GPS-1.git
cd Mock-GPS-1
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 📦 Project Structure

```
Mock-GPS-1/
├── src/
│   ├── components/
│   │   ├── MapComponent.jsx       # Leaflet map with satellite tiles
│   │   ├── MapComponent.css
│   │   ├── ControlPanel.jsx       # Mode selector and description
│   │   ├── ControlPanel.css
│   │   ├── TeleportMode.jsx       # Instant teleport controls
│   │   ├── TeleportMode.css
│   │   ├── JoystickMode.jsx       # Unlimited speed joystick
│   │   └── JoystickMode.css
│   ├── App.jsx                    # Main application component
│   ├── App.css
│   └── main.jsx                   # React entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🎮 Usage

### Teleport Mode
1. Click the **Teleport** button in the control panel
2. Enter latitude (-90 to 90) and longitude (-180 to 180)
3. Press Enter or click **TELEPORT** button
4. Use preset buttons for quick access to popular cities

### Joystick Mode
1. Click the **Joystick** button in the control panel
2. Enter speed values in degrees per second:
   - **Latitude Speed**: Positive = North, Negative = South
   - **Longitude Speed**: Positive = East, Negative = West
3. Click **START MOVEMENT** or press Enter
4. Click **STOP MOVEMENT** to halt movement
5. Use quick direction buttons to set direction and speed

## 📊 Speed Reference

| Speed Value | Movement Speed | Use Case |
|------------|----------------|----------|
| 0.0001 | ~11 m/s | Slow walk |
| 0.001 | ~111 m/s | Running speed |
| 0.01 | ~1.1 km/s | Car speed |
| 0.1 | ~11 km/s | Airplane speed |
| 1.0 | ~111 km/s | Ultra speed |

## 🛠️ Technologies Used

- **React 18** - UI Framework
- **Vite** - Build tool and dev server
- **Leaflet** - Mapping library
- **Esri ArcGIS** - Satellite imagery tiles

## 🎨 Design Features

- **Cyberpunk Theme**: Green/cyan neon aesthetic
- **Dark Mode**: Easy on the eyes for extended use
- **Responsive Layout**: Adapts to different screen sizes
- **Real-time Feedback**: Instant visual updates
- **Intuitive Controls**: Clear labeling and descriptions

## ⚠️ Disclaimer

This tool is for educational and authorized testing purposes only. Spoofing location data on applications or services without authorization may be illegal and violate terms of service. Always use responsibly and with proper authorization.

## 📝 License

This project is provided as-is for educational purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

## 📞 Support

For issues or questions, please open a GitHub issue in the repository.