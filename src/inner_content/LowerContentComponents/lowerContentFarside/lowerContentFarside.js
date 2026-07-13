import "./lowerContentFarside.css";
import { PopOverGraphs } from "../../popover";

export default function SolarFarsidePanel() {

    return(
    <div style={{"display": "flex", "flexDirection": "column", "height": "100%"}}>
        <div style={{"fontSize": "4vh", "textDecoration": "underline", "color": "white"}}>Solar Farside Environment:</div>
        <div className="farside-panel">
            <div className="SolarOrbiter">
                <a style={{"textDecoration": "underline dotted", "color": "inherit"}}href={"https://www.cosmos.esa.int/web/solar-orbiter/latest-data"}>Solar Orbiter PHI Imagery (ESA)</a>
                <div className="phi_imagepanel">
                <div className="imagepanel"><div>PHI Continuum</div><PopOverGraphs
                DisplayString={<img className="phi_image" src={'https://www2.mps.mpg.de/projects/soho/sumer/phiimg/solo_LL02_phi-fdt-icnt_last.png'}/>}
                PopOverString={<img className="phi_image_popover" src={'https://www2.mps.mpg.de/projects/soho/sumer/phiimg/solo_LL02_phi-fdt-icnt_last.png'}/>}
                /></div>
                <div className="imagepanel"><div>PHI Magnetogram</div><PopOverGraphs
                DisplayString={<img className="phi_image" src={'https://www2.mps.mpg.de/projects/soho/sumer/phiimg/solo_LL02_phi-fdt-blos_last.png'}/>}
                PopOverString={<img className="phi_image_popover" src={'https://www2.mps.mpg.de/projects/soho/sumer/phiimg/solo_LL02_phi-fdt-blos_last.png'}/>}
                /></div>
                </div>
               <div>
                <a style={{"textDecoration": "underline dotted", "color": "inherit"}} href="https://datacenter.stix.i4ds.net/view/ql/lightcurves">STIX Quick-Look Light Curves</a>
                </div> 
            </div>
            <div className="gong-farside">
                <a style={{"textDecoration": "underline dotted", "color": "inherit"}}href={"https://farside.nso.edu/calib_gallery.html"}>GONG Calibrated Images:</a>
                <div className="imagepanel"><div></div><PopOverGraphs
                DisplayString={<img className="gong_image" src={'https://farside.nso.edu/oQR/f6g/202607/mrf6g260713/mrf6g260713t0000.jpg'}/>}
                PopOverString={<img className="gong_image_popover" src={'https://farside.nso.edu/oQR/f6g/202607/mrf6g260713/mrf6g260713t0000.jpg'}/>}
                /></div>
            </div>
        </div>
    </div>
    )
}