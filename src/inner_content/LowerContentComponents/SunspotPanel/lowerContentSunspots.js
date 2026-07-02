import {useState, useEffect} from 'react';

export default function SunspotPanel() {

        const images = [
            'https://defn.nict.go.jp/sharp/ARID0003_001.png',
            'https://defn.nict.go.jp/sharp/ARID0003_002.png',
            'https://defn.nict.go.jp/sharp/ARID0003_003.png',
            'https://defn.nict.go.jp/sharp/ARID0003_004.png',
            'https://defn.nict.go.jp/sharp/ARID0003_005.png',
            'https://defn.nict.go.jp/sharp/ARID0003_006.png',
            'https://defn.nict.go.jp/sharp/ARID0003_007.png',
            'https://defn.nict.go.jp/sharp/ARID0003_009.png',
            'https://defn.nict.go.jp/sharp/ARID0003_010.png',
            'https://defn.nict.go.jp/sharp/ARID0003_011.png',
            'https://defn.nict.go.jp/sharp/ARID0003_012.png',
            'https://defn.nict.go.jp/sharp/ARID0003_013.png',
            'https://defn.nict.go.jp/sharp/ARID0003_014.png',
            'https://defn.nict.go.jp/sharp/ARID0003_015.png',
            'https://defn.nict.go.jp/sharp/ARID0003_017.png',
            'https://defn.nict.go.jp/sharp/ARID0003_018.png',
            'https://defn.nict.go.jp/sharp/ARID0003_019.png',
            'https://defn.nict.go.jp/sharp/ARID0003_020.png',
        ];
        const [currentIndex, setCurrentIndex] = useState(0);
        console.log(currentIndex);
        useEffect(() => {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    return (prevIndex + 1) % images.length;
                });
            }, 1000);
            return () => clearInterval(timer);
        }, []);
        return(
            <div>
                <img style={{"width": "70vw", "maxHeight": "50vh"}} src={images[currentIndex]}></img>
                <p> Displaying Image {currentIndex + 1}</p>
            </div>
        )
}