import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useEffect } from "react"
import L from "leaflet"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
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
        <Marker position={[place.lat, place.lon]}>
          <Popup>{place.display_name}</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}