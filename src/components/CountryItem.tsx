import { Country } from "../types/Country";
import styles from "./CountryItem.module.css";

type CountryItemProps = {
  country: Country
}

function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.countryName}</span>
    </li>
  );
}

export default CountryItem;
