import React, { useState } from 'react'
import './TeleportMode.css'

const TeleportMode = ({ currentLocation, onLocationChange }) => {
  const [latitude, setLatitude] = useState(currentLocation.lat.toString())
  const [longitude, setLongitude] = useState(currentLocation.lng.toString())
  const [error, setError] = useState('')

  const handleTeleport = () => {
    setError('')
    
    const lat = parseFloat(latitude)
    const lng = parseFloat(longitude)

    // Validate coordinates
    if (isNaN(lat) || isNaN(lng)) {
      setError('Invalid coordinates. Please enter valid numbers.')
      return
    }

    if (lat < -90 || lat > 90) {
      setError('Latitude must be between -90 and 90')
      return
    }

    if (lng < -180 || lng > 180) {
      setError('Longitude must be between -180 and 180')
      return
    }

    onLocationChange({ lat, lng })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTeleport()
    }
  }

  const teleportToPreset = (lat, lng, name) => {
    setLatitude(lat.toString())
    setLongitude(lng.toString())
    onLocationChange({ lat, lng })
    setError('')
  }

  return (
    <div className="teleport-mode">
      <div className="input-group">
        <label>Latitude</label>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter latitude (-90 to 90)"
          className="coord-input"
        />
      </div>

      <div className="input-group">
        <label>Longitude</label>
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter longitude (-180 to 180)"
          className="coord-input"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button className="teleport-btn" onClick={handleTeleport}>
        ⚡ TELEPORT
      </button>

      <div className="presets">
        <h4>Quick Teleport</h4>
        <div className="preset-buttons">
          <button onClick={() => teleportToPreset(40.7128, -74.0060, 'NYC')} className="preset-btn">
            🗽 New York
          </button>
          <button onClick={() => teleportToPreset(51.5074, -0.1278, 'London')} className="preset-btn">
            🇬🇧 London
          </button>
          <button onClick={() => teleportToPreset(48.8566, 2.3522, 'Paris')} className="preset-btn">
            🗼 Paris
          </button>
          <button onClick={() => teleportToPreset(35.6762, 139.6503, 'Tokyo')} className="preset-btn">
            🗾 Tokyo
          </button>
          <button onClick={() => teleportToPreset(-33.8688, 151.2093, 'Sydney')} className="preset-btn">
            🦘 Sydney
          </button>
          <button onClick={() => teleportToPreset(37.7749, -122.4194, 'SF')} className="preset-btn">
            🌉 San Francisco
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeleportMode