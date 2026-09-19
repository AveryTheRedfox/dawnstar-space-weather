
import EARTH_MAP from '../resources/merkury_highres.jpg'


export const EPHEMERIS_DATA = {
    "MERCURY": {
        a_base: 0.38709893, a_dot: 0.00000000,
        e_base: 0.20563069, e_dot: 0.00002040,
        i_base: 7.00487,    i_dot: -0.005941,
        L_base: 252.25084,  L_dot: 149472.67411,
        w_base: 77.45645,   w_dot: 0.15901,
        omega_base: 48.33167, omega_dot: -0.12532,
        color: "#525252",
        map: require('../resources/merkury_highres.jpg'),
    },
    "VENUS": {
        a_base: 0.72333199, a_dot: 0.00000000,
        e_base: 0.00677323, e_dot: -0.00004776,
        i_base: 3.39471,    i_dot: -0.000788,
        L_base: 181.97973,  L_dot: 58517.81538,
        w_base: 131.53298,  w_dot: 0.00213,
        omega_base: 76.68069, omega_dot: -0.27769,
        color: "#a58721",
        map: require('../resources/Venus_map_NASA_JPL_Magellan-Venera-Pioneer.jpg'),
    },
    "EARTH": {
        a_base: 1.00000011, a_dot: -0.00000005,
        e_base: 0.01671022, e_dot: -0.00003804,
        i_base: 0.00005,    i_dot: -0.015218,
        L_base: 100.46435,  L_dot: 35999.37244,
        w_base: 102.94719,  w_dot: 0.32327,
        omega_base: -11.26064, omega_dot: -0.41321,
        color: "#0d98d9",
        map: require('../resources/Earthmap1000x500.jpg'), 
    },
    "MARS": {
        a_base: 1.52366231, a_dot: -0.00000072,
        e_base: 0.09341233, e_dot: 0.00011902,
        i_base: 1.85061,    i_dot: -0.007248,
        L_base: 355.45332,  L_dot: 19140.30268,
        w_base: 336.04084,  w_dot: 0.44375,
        omega_base: 49.57854, omega_dot: -0.29257,
        color: "#a14b09",
        map: require('../resources/marsmap.jpg'),
    },
    "JUPITER": {
        a_base: 5.20336301, a_dot: 0.00060737,
        e_base: 0.04839266, e_dot: -0.00012880,
        i_base: 1.30530,    i_dot: -0.004150,
        L_base: 34.40438,   L_dot: 3034.74612,
        w_base: 14.75385,   w_dot: 0.19152,
        omega_base: 100.55615, omega_dot: 0.20404,
        color: "#9f670e",
        map: require('../resources/STScI-01EVT28HQ6C7YPMSRCA9GTTTPM.jpeg'),
        rings_map: require('../resources/dg5tai3-38ef3d34-6a38-4978-a0b4-918c4ba06612.png'),
    }
};