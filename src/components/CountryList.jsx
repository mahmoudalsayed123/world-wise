import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useContext } from "react";
import { CitiesContext } from "../App";

function CountryList() {
    const { cities, isLoading } = useContext(CitiesContext);
    if (isLoading) return <Spinner />;
    if (!cities.length)
        return (
        <Message message="Add your first city by clicking on a city on the map" />
        );


    const countries = [...new Map(cities.map(item => [item.id, item])).values()]

    return (
        <ul className={styles.countryList}>
        {countries.map((country, i) => (
            <CountryItem country={country} isLoading={isLoading} key={i} />
        ))}
        </ul>
    );
}

export default CountryList;