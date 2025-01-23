// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
// require('dotenv').config()

import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../hooks/useCities";
import { newCity } from "../types/City";
import { useNavigate } from "react-router-dom";

function convertToEmoji(countryCode: string): string{
  // console.log(countryCode);
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.geoapify.com/v1/geocode/reverse"
const API_KEY = process.env.REACT_APP_GEOAPIFY_API_KEY;

function Form() {
  const [isGeocodingLoading, setIsGeocodingLoading] = useState<boolean>(false);
  const [geocodingError, setGeocodingError] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState<string>("");
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [mapLat, mapLong] = useUrlPosition();

  useEffect(() => {
    if (!mapLat && !mapLong) return;
    const fetchCityData = async () => {
      try {
        setGeocodingError("")
        setIsGeocodingLoading(true);
        const response = await fetch(`${BASE_URL}?lat=${mapLat}&lon=${mapLong}&apiKey=${API_KEY}`);
        const data = await response.json()
        // extracts relevant data from the API call.
        const region_data = data["features"][0]["properties"]
        
        // console.log(region_data);
        if(!region_data.country) setGeocodingError("That doesn't seem to be a country, please click somewhere else 😭")
        setCityName(region_data.city || region_data.region || region_data.state || "")
        setCountry(region_data.country)
        setEmoji(convertToEmoji(region_data.country_code))
      } catch (error) { 
        if (error instanceof Error){
          setGeocodingError(error.message)
        }
      } finally {
        setIsGeocodingLoading(false);
      }
    }

    fetchCityData();
  }, [mapLat, mapLong])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const newCity: newCity = {
      cityName: cityName,
      country: country,
      date: date?.toString() || "",
      emoji: emoji,
      notes: notes,
      position: {
        lat: mapLat,
        lng: mapLong
      }
    }

    await createCity(newCity);
    navigate("/app")
  }

  if (isGeocodingLoading) return <Spinner />
  if (!mapLat && !mapLong) return <Message message="Start by clicking on the map"/>
  if (geocodingError) return <Message message={ geocodingError } />

  return (
    <form className={`${styles.form} ${isLoading? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={(): void => console.log('')} >Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
