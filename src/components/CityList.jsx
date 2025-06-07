import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import CityItem from "./CityItem";
import { useContext } from "react";
import { CitiesContext } from "../App";
function CityList() {
  const {isLoading,cities} = useContext(CitiesContext);
  
  if (isLoading) return <Spinner />;

  if(!cities) return <Message message="Not Cities Founded !!" />;

    const newCities = [...new Map(cities.map(item => [item.id, item])).values()]

  return (
    <ul className={styles.cityList}>
      {newCities.map((city, i) => (
        <CityItem city={city} isLoading={isLoading} key={i} />
      ))}
    </ul>
  );
}

export default CityList;