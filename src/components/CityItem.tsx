import { Link } from "react-router-dom"
import { City } from "../types/City"
import styles from './CityItem.module.css'
import { useCities } from "../hooks/useCities"


type CityItem = {
  city: City
}

export default function CityItem({ city }: CityItem) {
  const { currentCity } = useCities();

  const { 
    id,
    cityName,
    date,
    emoji,
    position,
  } = city
  
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  
  return (
    <li >
      <Link
        className={`${styles.cityItem} ${
          city.id === currentCity.id ?
          styles['cityItem--active'] :
            ""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`} >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  )
}

