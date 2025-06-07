import { createContext, useContext, useEffect, useState } from "react";

const cities = [
    {
        id: "852c",
        cityName: "Sevan",
        country: "",
        image: "",
        emoji: "",
        notes: "sdf",
        date: "2025-03-05T01:15:10.097Z",
        countryCode: "AM",
        position: {
            lat: "40.58393655676433",
            lng: "44.97802734375",
        },
    },
    {
        id: "a2e0",
        cityName: "Tsurib",
        country: "",
        image: "",
        emoji: "",
        notes: "sdf",
        date: "2025-03-05T12:47:59.669Z",
        countryCode: "RU",
        position: {
            lat: "42.09822241118974",
            lng: "46.82373046875",
        },
    },
    {
        id: "f0ef",
        cityName: "Krasnodarskiy Kray",
        country: "",
        image: "",
        emoji: "",
        notes: "dsf",
        date: "2025-03-06T00:14:30.048Z",
        countryCode: "RU",
        position: {
            lat: "43.374628362160834",
            lng: "39.83642578125",
        },
    },
];

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

function CitiesProvider({ childern }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        async function getCities() {
            try {
                setIsLoading(true);
                // const res = await fetch(`http://localhost:9000/cities`);
                const res = await fetch(`${cities}`);
                const data = await res.json();
                setCities(data);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
        getCities();
    }, []);
    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
            }}
        >
            {childern}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    // if(context === undefined) throw new Error("Cities Not Founded !!")
    return context;
}

export { CitiesProvider, CitiesContext, useCities };
