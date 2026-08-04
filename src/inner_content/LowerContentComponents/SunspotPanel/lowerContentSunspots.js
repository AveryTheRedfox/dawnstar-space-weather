function RenderSunspotTable({ numbers, locations, areas, numberofspots, magneticclasses, index }) {

    let magClassColor =
    magneticclasses[index] === "Alpha"
      ? "#007e0b"
      : magneticclasses[index] == "Beta"
      ? "#007e0b"
      : magneticclasses[index] == "Beta-Gamma"
      ? "#dcb21b"
      : magneticclasses[index] == "Beta-Gamma-Delta"
      ? "#cf4d1a" :
      "#ffffff";

console.log(magneticclasses);
  return (
    <div style={{ display: "flex", flexDirection: "column", border: "5px solid gray", maxHeight: "22vh", minWidth: "20vw"}}>
      <div style={{textAlign: "center", border: "2px solid gray", backgroundColor: magClassColor}}><div><strong>AR{numbers[index]}</strong></div></div>
      <div style={{ display: "flex", flexDirection: "row",  color: "#ffffff"  }}>
        <div style={{ display: "flex", flexDirection: "column" ,width: "100%", border: "2px solid gray"}}>
            <div>Location: <br></br>{locations[index]}</div>
            <div>Area: <br></br>{areas[index]}MH</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", border: "2px solid gray", width: "100%",  color: "#ffffff" }}>
            <div>Nr. of Spots: <br></br>{numberofspots[index]}</div>
            <div>Mag. Class.: <br></br><div style={{color: magClassColor}}>{magneticclasses[index]}</div></div>
        </div>
      </div>
    </div>
  );
}

export default function SunspotPanel({ data }) { // Destructured 'data' out of props directly
  const regex = /([0-9]{4} [SN][0-9]{2}[WE][0-9]{2}   [0-9]{3}  [0-9]{4} [A-Z][a-z]{2}  [0-9]{2}   [0-9]{2} ([a-zA-Z-]{1,16}))/g;


  const sunspotData = data?.text?.split("\n").map(line => line.match(regex)).filter(line => line !== null) || [];

  const numbers = sunspotData.map((i) => i.toString().substring(0, 4));
  const locations = sunspotData.map(line => line.toString().substring(5, 12));
  const areas = sunspotData.map(line => line.toString().substring(18, 24));
  const numberofspots = sunspotData.map(line => line.toString().substring(33, 36));
  const magneticclasses = sunspotData.map(line => line.toString().substring(37, 55));  

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column", // Stack items vertically
      flexWrap: "wrap",      // Break to the right when space runs out
      height: "100%",        // Lock container height to the full viewport height
      maxHeight: "65vh", 
      alignContent: "start",
      width: "100%"    // Keep it constrained           // Optional: space between your components       // Optional: padding around the grid// Prevents padding from breaking height calculations
    }}
    >
      {numbers.map((_, index) => (
        <RenderSunspotTable
          key={index}
          index={index}
          numbers={numbers}
          locations={locations}
          areas={areas}
          numberofspots={numberofspots}
          magneticclasses={magneticclasses}
        />
      ))}
    </div>
  );
}