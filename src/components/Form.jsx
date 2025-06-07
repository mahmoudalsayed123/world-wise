// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useEffect, useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";
import DataPicker from "react-datepicker";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
// import Message from "./Message";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { CitiesContext } from "../App";
import { useUrlPosition } from "../hooks/useUrlPosition";
import CountryFlag from "./CountryFlag";
import Message from "./Message";

function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
    const navigate = useNavigate();
    const { addCity } = useContext(CitiesContext);
    const [isGeoLoading, setIsGeoLoading] = useState(false);
    const [geoError, setGeoError] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [image, setImage] = useState("");
    const [emoji, setEmoji] = useState("");

    const [lat, lng] = useUrlPosition();
    
    async function handleAddCity(e) {
        e.preventDefault();

        if (!cityName) return;

        const newCity = {
            cityName,
            country,
            image,
            emoji,
            notes,
            date,
            countryCode,
            position: { lat, lng },
        };
        await addCity(newCity);
        navigate("/app/cities");
    }

    useEffect(
        function () {
            async function getCity() {
                try {
                    setIsGeoLoading(true);
                    setGeoError("");
                    const res = await fetch(
                        `${BASE_URL}?latitude=${lat}&longitude=${lng}`
                    );

                    if (!res.ok) throw new Error("Not Respones !!");
                    const data = await res.json();
                    setCityName(data.city || data.locality || "");
                    setCountryCode(data.countryCode);
                } catch (err) {
                    setGeoError(err);
                } finally {
                    setIsGeoLoading(false);
                }
            }
            getCity();
        },
        [lat, lng]
    );

    if (isGeoLoading) return <Spinner />;

    if (geoError) return <Message message="Position Is Not Founded" />;

    return (
        <form
            className={`${styles.form} ${isGeoLoading ? styles.loading : ""}`}
            onSubmit={handleAddCity}
        >
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />

                <span className={styles.flag}>
                    <CountryFlag countryCode={countryCode} />
                </span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DataPicker
                    id="date"
                    onChange={(date) => setDate(date)}
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">
                    Notes about your trip to {cityName}
                </label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <BackButton />
            </div>
        </form>
    );
}

export default Form;
