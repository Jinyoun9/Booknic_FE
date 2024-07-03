import React, {useState} from 'react';
import '../css/Footer.css';
import {useLocation, useNavigate} from "react-router-dom";
import AreaPage from "../pages/AreaPage";

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showLocationPage, setShowLocationPage] = useState(false);
    const handleLibraryClick = () => {
        navigate('/lib');
    }
    const handleHomeClick = () => {
        navigate('/');
    }
    const handleLocationClick = () => {
        navigate('/area');
    }
    return (
        <footer className="footer">
            <div className="footer-menu">
                {location.pathname === '/lib' && (
                    <button onClick={() => handleLocationClick()}>지역</button>
                )}
                {location.pathname !== '/lib' && (
                    <button onClick={() => handleLibraryClick()}>도서관</button>
                )}
                {showLocationPage === true && (
                    <AreaPage/>
                )}
                <button>책</button>
                <button onClick={() => handleHomeClick()}>홈</button>
                <button>찜</button>
                <button>마이</button>
            </div>
        </footer>
    );
};

export default Footer;
