// React
import { useContext } from "react";

// Context
import { CitiesContext } from "../contexts/CitiesProvider"

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error('you cannot use this context here')
  return context;
}

export { useCities }
