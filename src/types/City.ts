interface Position { 
  lat: number,
  lng: number
}

interface City { 
  id: string,
  cityName: string,
  country: string,
  date: string,
  emoji: string,
  notes: string,
  position: Position
}

const getDefaultCity = () => {
  return ({
        cityName: "",
        country: "",
        date: "",
        emoji: "",
        id: "",
        notes: "",
        position: {
          lat: 1,
          lng: 1
        }
      })
}

export { getDefaultCity }
export type { City }
export type { Position }