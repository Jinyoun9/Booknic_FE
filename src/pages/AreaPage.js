import {startTransition, useEffect, useState} from "react";
import fetchData from "../fetchData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../css/AreaPage.css'
import {Container as MapDiv, NaverMap, Marker} from "react-naver-maps";
const AreaPage = ()  => {
    const [area, setArea] = useState([]);
    const [detailArea, setDetailArea] = useState([]);
    const [selectedButton, setSelectedButton] = useState(null);
    const [paddingRight, setPaddingRight] = useState(null);

    useEffect(() => {

        fetchData('area', setArea, null);
        fetchData('area/detail', setDetailArea, {name: "서울", code: 11});
        setSelectedButton(11);
    }, []);
    useEffect(() => {
        const updatePaddingRight = () => {
            const areaContainer = document.querySelector('.area-container');
            const rect = areaContainer.getBoundingClientRect();
            const centerX = (rect.left + rect.right) / 2;
            const paddingRightValue = centerX - rect.left;
            startTransition(() => {
                setPaddingRight(paddingRightValue);
            });
        };

        updatePaddingRight();
        window.addEventListener('resize', updatePaddingRight);
        return () => window.removeEventListener('resize', updatePaddingRight);
    }, []);
    const handleAreaClick = (name, code) => {
        setSelectedButton(code);
        fetchData('area/detail', setDetailArea, {name, code});
    }

    console.log(area);
    console.log(detailArea);
    return (
        <div>
            <Header/>
            <div className="container-wrapper">
                <div className="area-container">
                    {area.length > 0 ? (
                        area.map((item, index) => (
                            <div key={index}>
                                <button
                                    className={selectedButton === item.code ? 'selected' : ''}
                                    onClick={() => handleAreaClick(item.name, item.code)}>{item.name}</button>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className="vertical-border"></div>
                <div className="dtl-container">
                    {detailArea.length > 0 ? (
                        detailArea.map((item, index) => (
                            <div key={index}>
                                <button
                                    className={selectedButton === item.code ? 'selected' : ''}
                                    onClick={() => handleAreaClick(item.name, item.code)}>{item.dtlname}</button>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
            <MapDiv style={{ height: 400 }}>
                    <NaverMap>
                        <Marker defaultPosition={{lat: 37.5666103, lng: 126.9783882}}></Marker>
                    </NaverMap>
            </MapDiv>
            <Footer/>
        </div>
    )
}


export default AreaPage;