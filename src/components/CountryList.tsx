import styles from './CountryList.module.css'
import { Country } from "../types/Country"
import Spinner from './Spinner'
import Message from './Message'
import CountryItem from './CountryItem'

import { useCities } from '../hooks/useCities'


export default function CountryList(): JSX.Element {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />
  if (!cities.length) return <Message message="Add your first country by clicking on a city on the map" />
  
  const countries: Country[] = cities.reduce<Country[]>((arr, city) => {
    if (!arr.map((country) => country.countryName).includes(city.country)) {
      return [...arr, { countryName: city.country, emoji: city.emoji }]
    } else {
      return arr
    }

   }, [])
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={ country.countryName } />
      )) }
    </ul>
  )
}
