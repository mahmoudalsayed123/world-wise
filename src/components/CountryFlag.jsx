import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import styles from "./CityItem.module.css";

export default function CountryFlag({countryCode}) {
  return (
    <ReactCountryFlag
    className={styles.image}
    countryCode={countryCode}
    svg
    cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
    cdnSuffix="svg"
    title="US"
        />
  )
}
