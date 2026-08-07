import { useState } from "react";
import { useEffect } from "react";

function useFetchingApi() {
  const [SolarWind, setSolarWind] = useState();
  const [IntMag, setIntMag] = useState();
  const [KpIndex, setKpIndex] = useState();
  const [Alerts, setAlerts] = useState();
  const [Flare, setFlare] = useState();
  const [LatestFlare, setLatestFlare] = useState();
  const [Enlil, setEnlil] = useState();
  const [Ovation, setOvation] = useState();
  const [HPIData, setHPIData] = useState();
  const [ForecastData, setForecastData] = useState();
  const [SunspotData, setSunspotData] = useState();
  const [CMEData, setCMEData] = useState();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function FetchAll() {
      try {
        const response = await fetch("http://192.168.2.233:3001/api/space-weather-data", { signal });
        const data = await response.json();
        setSolarWind(data.solarWind);
        setIntMag(data.intMag);
        setKpIndex(data.kpIndex);
        setAlerts(data.alerts?.[0], data.alerts?.[1]);
        setFlare(data.flare);
        setLatestFlare(data.latestFlare);
        setEnlil(data.enlil);
        setOvation(data.ovation);
        setHPIData(data.hpi);
        setForecastData(data.forecast);       
        setSunspotData(data.sunspot);
        setCMEData(data.cme);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching all data:", error);
        }
      }
    }
    FetchAll();
    const interval = setInterval(FetchAll, 60000);
    return () => {
      clearInterval(interval);
      controller.abort();
    };
  }, []);
  return [
    SolarWind,
    IntMag,
    KpIndex,
    Alerts,
    Flare,
    LatestFlare,
    Enlil,
    Ovation,
    HPIData,
    ForecastData,
    SunspotData,
    CMEData,
  ];
}


export default useFetchingApi;
