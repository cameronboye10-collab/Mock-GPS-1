import React from 'react'
import './ControlPanel.css'

const ControlPanel = ({ mode, setMode }) => {
  return (
    <div className="control-panel">
      <h1 className="title">MOCK GPS</h1>
      
      <div className="mode-selector">
        <button
          className={`mode-btn ${mode === 'teleport' ? 'active' : ''}`}
          onClick={() => setMode('teleport')}
        >
          <span className="mode-icon">📍</span>
          Teleport
        </button>
        <button
          className={`mode-btn ${mode === 'joystick' ? 'active' : ''}`}
          onClick={() => setMode('joystick')}
        >
          <span className="mode-icon">🕹️</span>
          Joystick
        </button>
      </div>

      <div className="mode-description">
        {mode === 'teleport' ? (
          <p>Enter exact latitude and longitude coordinates to teleport your GPS location instantly.</p>
        ) : (
          <p>Use unlimited speed control with text input to move your GPS location smoothly. No speed limits!</p>
        )}
      </div>
    </div>
  )
}

export default ControlPanel