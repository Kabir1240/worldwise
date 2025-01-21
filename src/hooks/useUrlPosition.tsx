import { useSearchParams } from "react-router-dom";

export default function useUrlPosition(): [number, number] {
  const [searchParams, setSearchParams] = useSearchParams();

  return [Number(searchParams.get('lat')), Number(searchParams.get('lng'))]
}
