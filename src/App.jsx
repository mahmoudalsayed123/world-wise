// Two problem
//1- user not add for him payload data

import { createContext, useEffect, useReducer, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import {CitiesProvider} from "./contexts/CitiesContext"
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import PricingPage from "./pages/PricingPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./components/NotFoundPage";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import CityItem from "./components/CityItem";
import Form from "./components/Form";
import City from "./components/City";
import ProtectedRoutes from "./pages/ProtectedRoutes";

const BASE_URL = "http://localhost:9000";

export const CitiesContext = createContext();

export const AuthCotext = createContext();

const initialSatateCities = {
    cities: [],
    isLoading: false,
    error: "",
};

const initialSatateAuth = {
    user: null,
    isAuth: false,
};

function reducerCities(state, action) {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true,
            };

        case "cities/loaded":
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            };

        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
            };

        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(
                    (city) => city.id !== action.payload
                ),
            };

        case "rejected":
            return {
                ...state,
                error: action.payload,
            };

        default:
            throw new Error("Rejected Data !!");
    }
}

function reducerAuth(state, action) {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload,
                isAuth: true,
            };

        case "logOut":
            return {
                ...state,
                user: null,
                isAuth: false,
            };
        default:
            throw new Error("Rejected Data !!");
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function App() {
    // const [cities, setCities] = useState([]);
    // const [isLoading,setIsLoading] = useState(false);
    // const [error,setError] = useState('')

    const [{ cities, isLoading, error }, dispatchCities] = useReducer(
        reducerCities,
        initialSatateCities
    );

    const [{ user, isAuth }, dispatchAuth] = useReducer(
        reducerAuth,
        initialSatateAuth
    );

    function login(email, password) {
        // if (email === FAKE_USER.email && password === FAKE_USER.password)
        dispatchAuth({ type: "login", paylaod: FAKE_USER });
    }

    function logOut() {
        dispatchAuth({ type: "logOut" });
    }

    async function addCity(city) {
        dispatchCities({ type: "loading" });
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(city),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) throw new Error("Data Not Fetching !!");
            const data = await res.json();
            dispatchCities({ type: "city/created", payload: data });
        } catch (err) {
            dispatchCities({ type: "rejected", payload: err });
        }
    }

    async function delCity(id) {
        dispatchCities({ type: "loading" });
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            dispatchCities({ type: "city/deleted", payload: id });
        } catch (err) {
            dispatchCities({ type: "rejected", payload: err });
        }
    }

    useEffect(function () {
        async function getCities() {
            dispatchCities({ type: "loading" });
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatchCities({ type: "cities/loaded", payload: data });
            } catch (err) {
                dispatchCities({ type: "rejected", payload: err });
            }
        }
        getCities();
    }, []);

    useEffect(function () {
        async function getCurrentCity() {
            dispatchCities({ type: "loading" });
            try {
                const res = await fetch(`http://localhost:9000/cities`);
                const data = await res.json();
                dispatchCities({ type: "cities/loaded", payload: data });
            } catch (err) {
                dispatchCities({ type: "rejected", payload: err });
            }
        }
        getCurrentCity();
    }, []);

    return (
        <AuthCotext.Provider value={{ user, isAuth, login, logOut }}>
            <CitiesContext.Provider
                value={{ cities, isLoading, addCity, delCity, error }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="product" element={<ProductPage />} />
                        <Route path="pricing" element={<PricingPage />} />
                        <Route path="login" element={<LoginPage />} />

                        <Route
                            path="app"
                            element={
                                <ProtectedRoutes>
                                    <AppLayout />
                                </ProtectedRoutes>
                            }
                        >
                            <Route index element={<Navigate to="cities" />} />
                            <Route path="cities" element={<CityList />} />
                            <Route path="countries" element={<CountryList />} />
                            <Route path="form" element={<Form />} />
                            <Route path="cities/:id" element={<City />} />
                        </Route>

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </CitiesContext.Provider>
        </AuthCotext.Provider>
    );
}

export default App;
