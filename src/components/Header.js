import React from 'react';
import '../css/Header.css';
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const handleLogInClick = () =>{
        navigate("/login");
    }
    const handleSignUpClick = () =>{
        navigate("/signup");
    }
    return (
        <header className="header">
            <div className="logo">Booknic</div>
            <button onClick={handleLogInClick}>로그인</button>
            <button onClick={handleSignUpClick}>회원가입</button>
            <div className="menu-icon">☰</div>
        </header>
    );
};

export default Header;
