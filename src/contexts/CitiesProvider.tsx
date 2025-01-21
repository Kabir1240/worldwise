import { createContext, useEffect, useReducer } from "react";

import { City as CityInterface, newCity } from "../types/City"

const baseUrl: string = 'http://localhost:8000'

interface LoadingAction {
  type: 'loading'
}

interface CitiesLoadedAction {
  type: "cities/loaded",
  payload: CityInterface[]
}

interface CityLoadedAction {
  type: "city/loaded",
  payload: CityInterface
}

interface CityCreatedAction {
  type: "city/created",
  payload: CityInterface
}

interface CityDeletedAction {
  type: "city/deleted",
  payload: string
}

interface RejectedAction {
  type: "rejected",
  payload: string
}

type action = LoadingAction | CitiesLoadedAction | CityLoadedAction | CityCreatedAction | CityDeletedAction | RejectedAction

interface state {
  cities: CityInterface[],
  isLoading: boolean,
  currentCity: CityInterface | null,
}

const initialState: state = {
  cities: [],
  isLoading: false,
  currentCity: null,
}

function reducer (state: state, action: action): state {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true
      }
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false
      }
    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false
      }
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload
      }
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
        currentCity: null
      }
    case "rejected":
      alert(action.payload)
      return {
        ...state,
        isLoading: false
      }
    default:
      throw new Error("unknown action type")
  }
}

type CityContextType = {
  cities: CityInterface[],
  isLoading: boolean,
  getCity: (id: string) => void,
  currentCity: CityInterface | null,
  createCity: (newCity: newCity) => void,
  deleteCity: (id: string) => void
}

const defaultContextValues: CityContextType = {
  cities: [],
  isLoading: false,
  getCity: () => {},
  currentCity: null,
  createCity: () => {},
  deleteCity: () => {}
}

const CitiesContext = createContext<CityContextType>(defaultContextValues);

type CityProviderProps = {
  children: JSX.Element
}

function CityProvider({ children }: CityProviderProps): JSX.Element {
  const [state, stateManager] = useReducer(reducer, initialState);

  const { 
    cities,
    isLoading,
    currentCity,
   }: state = state

  useEffect(() => {
    const fetchCities = async () => {
      stateManager({ type: "loading"})
      try {
        // setIsLoading(true);
        const response = await fetch(`${baseUrl}/cities`);
        const data = await response.json()
        stateManager({ type: "cities/loaded", payload: data })
      } catch { 
        stateManager({ type: 'rejected', payload: "Error fetching cities "})
      }
    }

    fetchCities()
  }, [])
  
  const getCity = async (id: string): Promise<void> => {
    if (id === currentCity?.id) return;

    stateManager({ type: "loading"})
    try {
      const response = await fetch(`${baseUrl}/cities/${id}`);
      const data = await response.json()
      stateManager({ type: "city/loaded", payload: data })
    } catch { 
      stateManager({ type: 'rejected', payload: "Error retrieving city "})
    }
  }
  
  const createCity = async (newCity: newCity): Promise<void> => {
    stateManager({ type: "loading"})
    try {
      const response = await fetch(`${baseUrl}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-type": "application/json"
        }
      });
      const data = await response.json();
      stateManager({ type: "city/created", payload: data })
    } catch {
      stateManager({ type: 'rejected', payload: "Error saving city "})
    }
  }

  const deleteCity = async (id: string): Promise<void> => {
    stateManager({ type: "loading"})
    try {
      await fetch(`${baseUrl}/cities/${id}`, {
        method: "DELETE"
      });
      // setCities((cities) => cities.filter((city) => city.id !== id))
      stateManager({ type: "city/deleted", payload: id })
    } catch {
        stateManager({ type: 'rejected', payload: "Error deleting city "})
    }
  }
  
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity
      }}>
    {children}
    </CitiesContext.Provider>
  )
}

export { CityProvider, CitiesContext }
