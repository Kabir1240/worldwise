import { Marker, Popup } from "react-leaflet";
import { City } from "../types/City";

type MapMarkerProps = {
  city: City
}

export default function MapMarker({ city }: MapMarkerProps): JSX.Element {
  const mapPosition = [city.position['lat'], city.position['lng']]
  return (
    <Marker position={mapPosition}>
      <Popup>
        <span>{city.emoji}</span><span>{city.cityName}</span>
      </Popup>
    </Marker>
  )
}
