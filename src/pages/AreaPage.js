import {startTransition, useEffect, useState} from "react";
import fetchData from "../fetchData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../css/AreaPage.css'
import {Container as MapDiv, NaverMap, Marker} from "react-naver-maps";
import {useNavigate} from "react-router-dom";
const AreaPage = ()  => {
    const navigate = useNavigate();
    const [area, setArea] = useState([]);
    const [detailArea, setDetailArea] = useState([]);
    const [selectedButton, setSelectedButton] = useState(null);
    const [showAreaButtons, setShowAreaButtons] = useState(null);
    const [showMap, setShowMap] = useState(null)

    useEffect(() => {
        fetchData('area', setArea, null);
        fetchData('area/detail', setDetailArea, {name: "서울", code: 11});
        setSelectedButton(11);
        setShowAreaButtons(true);
        setShowMap(false);
    }, []);
    const handleAreaClick = (name, code) => {
        setSelectedButton(code);
        fetchData('area/detail', setDetailArea, {name, code});
    }
    const handleDtlAreaClick = (Name, Code, DtlName, DtlCode) => {
        navigate('/lib', { state: { Name, Code, DtlName, DtlCode } });
    }
    const handleAreaSelectClick = () => {
        setShowMap(false);
        setShowAreaButtons(true);
    }
    const handleMapClick = () => {
        setShowMap(true);
        setShowAreaButtons(false);
    }
    console.log(area);
    console.log(detailArea);
    return (
        <div>
            <Header/>
            <div className="container-wrapper">
                <button onClick={() => handleAreaSelectClick()} className={showAreaButtons === true ? 'selected' : ''}>지역 선택하기</button>
                <button onClick={() => handleMapClick()} className={showMap === true ? 'selected' : ''}>지도로 보기</button>
            </div>
            {showAreaButtons === true ? (
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
                                        onClick={() => handleDtlAreaClick(item.name, item.code, item.dtlname, item.dtlcode)}>{item.dtlname}</button>
                                </div>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>

                </div>
            ): (
                <p>Loading...</p>
            )}
            {showMap === true ? (
                <MapDiv style={{ height: 400 }}>
                        <NaverMap>
                            <Marker defaultPosition={{lat: 37.5666103, lng: 126.9783882}}></Marker>
                        </NaverMap>
                </MapDiv>
            ) : (
                <p>Loading...</p>
            )}
            <Footer/>
        </div>
    )
}


export default AreaPage;