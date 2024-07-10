import React from 'react';
import '../css/Header.css';
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const loginClickHandle = () =>{
        navigate("/login");
    }
    return (
        <header className="header">
            <div className="logo">Booknic</div>
            <button onClick={loginClickHandle}>로그인</button>
            <div className="menu-icon">☰</div>
        </header>
    );
};

export default Header;
