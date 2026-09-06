import {createContext, useContext, useState, useEffect} from "react";
import  useFetchingApi from "./FetchingFunction.js";

const SpaceWeatherContext = createContext();

export function SpaceWeatherProvider({ children }) {

    const weatherData = useFetchingApi();

    return (
        <SpaceWeatherContext.Provider value={weatherData}>
            {children}
        </SpaceWeatherContext.Provider>
    );
}
export function useSpaceWeather() {
    const context = useContext(SpaceWeatherContext);
    if (!context) {
        throw new Error("useSpaceWeather must be used within a SpaceWeatherProvider");
    }
    return context;
}