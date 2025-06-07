import { useState } from "react";

export function useGeoLocation(defaultPosition = null) {
    const [isLoading,setIsLoading] = useState(false)
    const [position,setPosition] = useState(defaultPosition)
    const [error,setError] = useState("");

    function getPosition() {

        if(!navigator.geolocation) return setError("Position Is Not Founded")

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setIsLoading(true)
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                })
                setIsLoading(false)
            },
            (error) => {
                setError(error)
                setIsLoading(false)
            }
        )
    }
    return {isLoading, position, error, getPosition}
}