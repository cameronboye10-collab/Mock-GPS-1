import React from 'react'
import L from 'leaflet'
import './MapComponent.css'

const MapComponent = ({ location }) => {
  const mapRef = React.useRef(null)
  const mapInstanceRef = React.useRef(null)
  const markerRef = React.useRef(null)

  React.useEffect(() => {
    if (!mapRef.current) return

    // Initialize map
    const map = L.map(mapRef.current).setView(
      [location.lat, location.lng],
      13
    )

    // Add satellite tile layer with city labels
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '© Esri',
        maxZoom: 18,
      }
    ).addTo(map)

    // Add city label overlay
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '© Esri',
        opacity: 0.7,
      }
    ).addTo(map)

    // Custom icon for current location
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="marker-pulse">
        <div class="marker-dot"></div>
        <div class="marker-ring"></div>
      </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    })

    // Add marker
    markerRef.current = L.marker([location.lat, location.lng], {
      icon: customIcon,
      draggable: true,
    }).addTo(map)

    // Update location on drag
    markerRef.current.on('dragend', function () {
      const { lat, lng } = this.getLatLng()
      console.log('Dragged to:', lat, lng)
    })

    mapInstanceRef.current = map

    return () => {
      // Cleanup
    }
  }, [])

  // Update marker position when location changes
  React.useEffect(() => {
    if (markerRef.current && mapInstanceRef.current) {
      markerRef.current.setLatLng([location.lat, location.lng])
      mapInstanceRef.current.setView([location.lat, location.lng], 13)
    }
  }, [location])

  return (
    <> 
      <div ref={mapRef} className="map-view"></div>
      <style>{` 
        .custom-marker {
          background: none;
          border: none;
        }
        
        .marker-pulse {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .marker-dot {
          position: absolute;
          width: 12px;
          height: 12px;
          background: #00ff88;
          border-radius: 50%;
          box-shadow: 0 0 10px #00ff88;
          z-index: 10;
        }
        
        .marker-ring {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 2px solid #00ff88;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

export default MapComponent