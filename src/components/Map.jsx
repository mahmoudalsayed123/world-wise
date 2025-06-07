import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from "react-leaflet";
import { useContext, useEffect, useState } from "react";
import { CitiesContext } from "../App";
import CountryFlag from "./CountryFlag";
import { useGeoLocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
function Map() {
    const [mapPosition,setMapPosition] = useState([40, 54]);

    const { cities } = useContext(CitiesContext);
    const [lat,lng] = useUrlPosition();

    const {
        isLoading: mapIsLoading,
        position: geoPosition,
        getPosition,
    } = useGeoLocation();

    useEffect(function() {
        if(lat && lng) setMapPosition([lat, lng]);
    },[lat,lng])


    useEffect(function() {
        if(geoPosition) setMapPosition([geoPosition.lat,geoPosition.lng])
    },[geoPosition])


    return (
        <div className={styles.mapContainer}>
            {!geoPosition && <Button type="position" onClick={getPosition}>
                {mapIsLoading ? "Loading..." : "Get Your Position"}
            </Button>}
            <MapContainer
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>
                                {" "}
                                <CountryFlag
                                    countryCode={city.countryCode}
                                />{" "}
                                <span> {city.cityName} </span>{" "}
                            </span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeView position={mapPosition} />
                <DetectFrom />
            </MapContainer>
        </div>
    );
}
export default Map;

function ChangeView({ position }) {
    const map = useMap();
    useEffect(
        function () {
            map.setView(position);
        },
        [map, position]
    );
    return null;
}

function DetectFrom() {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
}
