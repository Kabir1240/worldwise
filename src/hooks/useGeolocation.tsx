import { useState } from "react";
import { Position } from "../types/City";

type useGeolocationReturn = {
  position: Position | null,
  getPosition: () => void,
  isLoading: boolean,
  error: string | null

}

export function useGeolocation(): useGeolocationReturn {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [position, setPosition] = useState<Position | null>(null);
    const [error, setError] = useState<string | null>(null); 

    function getPosition(): void {
        if (!navigator.geolocation)
          return setError("Your browser does not support geolocation");
    
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            });
            setIsLoading(false);
          },
          (error) => {
            setError(error.message);
            setIsLoading(false);
          }
        );
      }

    return { position, getPosition, isLoading, error }
}
