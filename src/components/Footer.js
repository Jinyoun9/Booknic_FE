import React, {useEffect, useState} from 'react';
import '../css/Footer.css';
import {useLocation, useNavigate} from "react-router-dom";
import AreaPage from "../pages/AreaPage";
import {jwtDecode} from 'jwt-decode';

const Footer = ({userInfo}) => {

    const location = useLocation();
    const navigate = useNavigate();
    const accessToken =  localStorage.getItem('accessToken');
    const [showLocationPage, setShowLocationPage] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLibraryClick = () => {
        navigate('/lib');
    }
    const handleHomeClick = () => {
        navigate('/');
    }
    const handleLocationClick = () => {
        navigate('/area');
    }
    const handleFavoriteClick = ()  => {
        navigate('/favorite');
    }
    const handleMyClick = () => {
        if (userInfo.role === 'user') {
            navigate('/user', {state: {userInfo}});
        }
        else if (userInfo.role === 'staff') {
            navigate('/staff', {state: {userInfo}});
        }
    }
    useEffect(() => {
        const accessToken  = localStorage.getItem('accessToken');
        if(accessToken){
            setIsLoggedIn(true);
        }
        else{
            setIsLoggedIn(false);
        }
    }, []);
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
                {isLoggedIn ? (
                    <button onClick = {handleMyClick}>마이</button>
                ): (
                    <button>로그인</button>
                )
                }
            </div>
        </footer>
    );
};

export default Footer;
