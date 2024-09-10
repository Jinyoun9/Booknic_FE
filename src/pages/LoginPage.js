import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import postData from "../api/postData";

import "../css/LoginPage.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [loginType, setLoginType] = useState('user'); // 'user' or 'staff'

    const handleSubmit = async (event) => {
        event.preventDefault();
        const params = {
            id: id,
            password: password,
            role: loginType
        };
        try {
            const response = await postData('/auth/login', params);

            // 응답이 에러인 경우 처리
            if (response.error) {
                throw new Error('Network response was not ok');
            }
            navigate('/');
        } catch (error) {
            console.log('There was a problem with the login request:', error);
            alert('Login failed');
        }
    };

    return (
        <div className="user-container">
            <div className="user-header">
                <h2 className="login-title">Login</h2>
                <div className="login-type-buttons">
                    <button
                        className={`login-user-button ${loginType === 'user' ? 'active' : ''}`}
                        onClick={() => setLoginType('user')}
                    >
                        개인회원 로그인
                    </button>
                    <button
                        className={`login-staff-button ${loginType === 'staff' ? 'active' : ''}`}
                        onClick={() => setLoginType('staff')}
                    >
                        도서관직원 로그인
                    </button>
                </div>
            </div>
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            value={id}
                            className="login-input"
                            placeholder="아이디"
                            onChange={(e) => setId(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            className="login-input"
                            placeholder="비밀번호"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`login-button ${loginType === 'user' ? 'user-login' : 'staff-login'}`}

                    >
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
