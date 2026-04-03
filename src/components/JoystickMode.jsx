import React, { useState, useRef } from 'react'
import './JoystickMode.css'

const JoystickMode = ({ currentLocation, onLocationChange }) => {
  const [speedLat, setSpeedLat] = useState('0')
  const [speedLng, setSpeedLng] = useState('0')
  const [isMoving, setIsMoving] = useState(false)
  const animationRef = useRef(null)
  const locationRef = useRef({
    lat: currentLocation.lat,
    lng: currentLocation.lng
  })

  // Convert speed from degrees per second to actual movement
  const moveLocation = (lat, lng, speedLat, speedLng, deltaTime) => {
    const newLat = lat + (parseFloat(speedLat) || 0) * (deltaTime / 1000)
    const newLng = lng + (parseFloat(speedLng) || 0) * (deltaTime / 1000)

    // Keep within bounds
    const boundedLat = Math.max(-90, Math.min(90, newLat))
    const boundedLng = ((newLng + 180) % 360) - 180

    return { lat: boundedLat, lng: boundedLng }
  }

  const animate = (lastTime = Date.now()) => {
    const currentTime = Date.now()
    const deltaTime = currentTime - lastTime

    const newLocation = moveLocation(
      locationRef.current.lat,
      locationRef.current.lng,
      speedLat,
      speedLng,
      deltaTime
    )

    locationRef.current = newLocation
    onLocationChange(newLocation)

    animationRef.current = requestAnimationFrame(() => animate(currentTime))
  }

  const handleStartMovement = () => {
    const lat = parseFloat(speedLat)
    const lng = parseFloat(speedLng)

    if ((isNaN(lat) || lat === 0) && (isNaN(lng) || lng === 0)) {
      return
    }

    setIsMoving(true)
    locationRef.current = { ...currentLocation }
    animationRef.current = requestAnimationFrame(animate)
  }

  const handleStopMovement = () => {
    setIsMoving(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isMoving) {
      handleStartMovement()
    }
  }

  const handleQuickDirection = (direction) => {
    const speed = parseFloat(speedLat) || parseFloat(speedLng) || 0.001
    
    switch (direction) {
      case 'north':
        setSpeedLat(speed.toString())
        setSpeedLng('0')
        break
      case 'south':
        setSpeedLat((-speed).toString())
        setSpeedLng('0')
        break
      case 'east':
        setSpeedLat('0')
        setSpeedLng(speed.toString())
        break
      case 'west':
        setSpeedLat('0')
        setSpeedLng((-speed).toString())
        break
      default:
        break
    }
  }

  return (
    <div className="joystick-mode">
      <div className="speed-inputs">
        <div className="input-group">
          <label>Latitude Speed (°/sec)</label>
          <input
            type="text"
            value={speedLat}
            onChange={(e) => setSpeedLat(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="0.0001 to 10"
            className="speed-input"
            disabled={isMoving}
          />
          <small className="hint">Positive = North, Negative = South</small>
        </div>

        <div className="input-group">
          <label>Longitude Speed (°/sec)</label>
          <input
            type="text"
            value={speedLng}
            onChange={(e) => setSpeedLng(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="0.0001 to 10"
            className="speed-input"
            disabled={isMoving}
          />
          <small className="hint">Positive = East, Negative = West</small>
        </div>
      </div>

      <div className="movement-controls">
        {!isMoving ? (
          <button className="control-btn start-btn" onClick={handleStartMovement}>
            ▶ START MOVEMENT
          </button>
        ) : (
          <button className="control-btn stop-btn" onClick={handleStopMovement}>
            ⏹ STOP MOVEMENT
          </button>
        )}
      </div>

      <div className="direction-pad">
        <h4>Quick Direction</h4>
        <div className="dpad-grid">
          <button
            className="dpad-btn"
            onClick={() => handleQuickDirection('north')}
            disabled={isMoving}
          >
            ↑ North
          </button>
          <button
            className="dpad-btn"
            onClick={() => handleQuickDirection('south')}
            disabled={isMoving}
          >
            ↓ South
          </button>
          <button
            className="dpad-btn"
            onClick={() => handleQuickDirection('west')}
            disabled={isMoving}
          >
            ← West
          </button>
          <button
            className="dpad-btn"
            onClick={() => handleQuickDirection('east')}
            disabled={isMoving}
          >
            → East
          </button>
        </div>
      </div>

      <div className="movement-status">
        <div className="status-indicator">
          <div className={`status-light ${isMoving ? 'active' : ''}`}></div>
          <span>{isMoving ? 'MOVING' : 'IDLE'}</span>
        </div>
      </div>

      <div className="speed-examples">
        <h4>Speed Examples</h4>
        <ul className="examples-list">
          <li><strong>0.0001</strong> - Very slow (~11m/s)</li>
          <li><strong>0.001</strong> - Slow walk (~111m/s)</li>
          <li><strong>0.01</strong> - Car speed (~1.1km/s)</li>
          <li><strong>0.1</strong> - Airplane speed (~11km/s)</li>
          <li><strong>1.0</strong> - Ultra fast (~111km/s)</li>
        </ul>
      </div>
    </div>
  )
}

export default JoystickMode