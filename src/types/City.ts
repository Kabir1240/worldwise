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

interface newCity {
  id?: string,
  cityName: string,
  country: string,
  date: string,
  emoji: string,
  notes: string,
  position: Position
}

// export { getDefaultCity }
export type { City }
export type { newCity }
export type { Position }