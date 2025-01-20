import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css'
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../hooks/useCities';
import { useGeolocation } from '../hooks/useGeolocation'
import MapMarker from './MapMarker';
import Button from './Button';


export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState<[number, number]>([51.505, -0.09]);
  const { cities } = useCities();
  const {
    position: geolocationPosition,
    getPosition: getGeolocationPosition,
    isLoading: isGeolocationLoading 
  } = useGeolocation();

  const mapLong = searchParams.get('lng');
  const mapLat = searchParams.get('lat');

  useEffect(() => {
    if(mapLong && mapLat) setMapPosition([Number(mapLat), Number(mapLong)])
  }, [mapLong, mapLat])
  
  useEffect(() => {
    if(geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
  }, [geolocationPosition])

  return (
    <div className={styles.mapContainer} >
      <Button type="position" onClick={{getGeolocationPosition}}>

      </Button>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        { cities.map((city) => (
          <MapMarker city={city} key={city.id} />
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectMapEvents />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }: {position: [number, number]}) {
  const map = useMap();
  map.setView(position);
  return null
}

function DetectMapEvents() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })

  return null;
}