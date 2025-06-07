import Spinner from "./Spinner";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import ReactCountryFlag from "react-country-flag"
import CountryFlag from "./CountryFlag";
import { CitiesContext } from "../App";
// import { useCities } from "../contexts/CitiesContext";



const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));


function CityItem({city,isLoading}) {
  const {delCity} = useContext(CitiesContext);
  const { cityName, countryCode, date, id, position } = city;
  const {lat,lng} = position;

  function deleteCity(e) {
    e.preventDefault();
    delCity(id)
  }

  if (isLoading) return <Spinner />;

  return (
    <li>
      <Link
        className={`${styles.cityItem} `}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <CountryFlag countryCode={city.countryCode} />    
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={(e) => deleteCity(e)}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;