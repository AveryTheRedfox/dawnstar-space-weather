

export function getSalliteData(SatelliteCommand) {
    async function fetchData() {
        const todayUTC = new Date().toISOString().split('T')[0];
        const startDate = todayUTC;
        const endDate = todayUTC;

        const baseUrl = "https://nasa.gov";
        const params = new URLSearchParams({
            format: "json",
            COMMAND: SatelliteCommand,
            OBJ_DATA: "'NO'",
            MAKE_EPHEM: "'YES'",
            EPHEM_TYPE: "'VECTORS'",
            CENTER: "'@sun'",
            START_TIME: `'${startDate}'`,
            STOP_TIME: `'${endDate}'`,
            STEP_SIZE: "'1 d'",
        });
        try {
            const response = await fetch(`${baseUrl}?${params.toString()}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching satellite data:", error);
            throw error;
        }
    }
    return fetchData();
}