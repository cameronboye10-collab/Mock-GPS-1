import React, { useState, useEffect } from 'react'
import './App.css'
import MapComponent from './components/MapComponent'
import ControlPanel from './components/ControlPanel'
import JoystickMode from './components/JoystickMode'
import TeleportMode from './components/TeleportMode'

function App() {
  const [mode, setMode] = useState('teleport')
  const [currentLocation, setCurrentLocation] = useState({
    lat: 40.7128,
    lng: -74.0060,
    label: 'New York, USA'
  })
  const [spoofedLocation, setSpoofedLocation] = useState({
    lat: 40.7128,
    lng: -74.0060
  })

  useEffect(() => {
    // Request actual user location on load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCurrentLocation({
            lat: latitude,
            lng: longitude,
            label: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          })
          setSpoofedLocation({
            lat: latitude,
            lng: longitude
          })
        },
        (error) => {
          console.log('Using default location:', error)
        }
      )
    }
  }, [])

  const handleLocationChange = (newLocation) => {
    setSpoofedLocation(newLocation)
    setCurrentLocation({
      ...newLocation,
      label: `${newLocation.lat.toFixed(4)}, ${newLocation.lng.toFixed(4)}`
    })
  }

  return (
    <div className="app-container">
      <div className="map-container">
        <MapComponent location={spoofedLocation} />
      </div>
      
      <div className="control-container">
        <ControlPanel mode={mode} setMode={setMode} />
        
        <div className="mode-specific-control">
          {mode === 'teleport' ? (
            <TeleportMode 
              currentLocation={spoofedLocation}
              onLocationChange={handleLocationChange}
            />
          ) : (
            <JoystickMode 
              currentLocation={spoofedLocation}
              onLocationChange={handleLocationChange}
            />
          )}
        </div>

        <div className="location-display">
          <div className="location-info">
            <h3>Current Spoofed Location</h3>
            <p className="coords">
              Latitude: {spoofedLocation.lat.toFixed(6)}
            </p>
            <p className="coords">
              Longitude: {spoofedLocation.lng.toFixed(6)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App