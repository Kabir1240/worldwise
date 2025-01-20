import { createContext, useEffect, useState } from "react";

import { City as CityInterface, getDefaultCity } from "../types/City"

const baseUrl: string = 'http://localhost:8000'

type CityContextType = {
  cities: CityInterface[],
  isLoading: boolean,
  getCity: (id: string) => void,
  currentCity: CityInterface,
}

const CitiesContext = createContext<CityContextType>({
  cities: [],
  isLoading: false,
  getCity: () => { return },
  currentCity: getDefaultCity()
});

type CityProviderProps = {
  children: JSX.Element
}

function CityProvider({ children }: CityProviderProps): JSX.Element {
    const [cities, setCities] = useState<CityInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentCity, setCurrentCity] = useState<CityInterface>(getDefaultCity());
  
    useEffect(() => {
      const fetchCities = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`${baseUrl}/cities`);
          const data = await response.json()
          setCities(data)
        } catch (error) { 
          if (error instanceof Error){
            alert(error.message)
          }
        } finally {
          setIsLoading(false);
        }
      }
  
      fetchCities()
    }, [])
  
  const getCity = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/cities/${id}`);
      const data = await response.json()
      setCurrentCity(data)
    } catch (error) { 
      if (error instanceof Error){
        alert(error.message)
      }
    } finally {
      console.log(`${baseUrl}/cities/${id}`);
      setIsLoading(false);
    }
   }
  
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity
      }}>
    {children}
    </CitiesContext.Provider>
  )
}

export { CityProvider, CitiesContext }
