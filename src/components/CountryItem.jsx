import styles from "./CountryItem.module.css";
import Spinner from "./Spinner";
import CountryFlag from "./CountryFlag";

function CountryItem({ country, isLoading }) {
  const { countryCode } = country;

  if (isLoading) return <Spinner />;

  return (
    <li className={styles.countryItem}>
      <span>
      <CountryFlag countryCode={country.countryCode} />  
      </span>
      <span>{country.countryName}</span>
    </li>
  );
}

export default CountryItem;
