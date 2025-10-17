import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useEffect, useRef } from "react"
import L from "leaflet"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
})

// Custom red marker icon
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

function ChangeMapView({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    if (center) {
      map.setView(center, zoom)
    }
  }, [center, zoom, map])
  return null
}

function MarkerWithHoverPopup({ position, display_name, lat, lon }) {
  const markerRef = useRef(null)

  const eventHandlers = {
    mouseover() {
      if (markerRef.current) {
        markerRef.current.openPopup()
      }
    },
    mouseout() {
      if (markerRef.current) {
        markerRef.current.closePopup()
      }
    },
  }

  return (
    <Marker 
      position={position} 
      icon={redIcon}
      ref={markerRef}
      eventHandlers={eventHandlers}
    >
      <Popup>
        <div className="text-sm">
          <p className="font-semibold mb-2">{display_name}</p>
          <div className="text-xs text-gray-600">
            <p><strong>Lat:</strong> {parseFloat(lat).toFixed(6)}</p>
            <p><strong>Lon:</strong> {parseFloat(lon).toFixed(6)}</p>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

export default function Map({ place }) {
  const defaultCenter = [10.762622, 106.660172]
  const center = place ? [place.lat, place.lon] : defaultCenter
  const zoom = place ? 15 : 12

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeMapView center={center} zoom={zoom} />
      {place && (
        <MarkerWithHoverPopup 
          position={[place.lat, place.lon]}
          display_name={place.display_name}
          lat={place.lat}
          lon={place.lon}
        />
      )}
    </MapContainer>
  )
}