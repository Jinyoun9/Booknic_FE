import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import postData from "../postData";

const LoginPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isValid, setisValid] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const params = {
            id: id,
            password: password
        };
        try {
            // 로그인 요청을 보냄
            const response = await postData('api/login', setLoading, setError, params);

            // 응답이 에러인 경우 처리
            if (response.error) {
                throw new Error('Network response was not ok');
            }

            // 응답 데이터에서 토큰을 추출
            const { accessToken, refreshToken } = response;

            // 로컬 스토리지에 토큰 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            alert('Login successful');
            // 로그인 성공 후 리디렉션 처리 (필요시)
            // window.location.href = '/dashboard';
        } catch (error) {
            console.error('There was a problem with the login request:', error);
            alert('Login failed');
        }
    };

    return (
        <div className="user-container">
            <div className="user-header">
                <h2 className="login-title">Login</h2>
            </div>
            {!isValid && (
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
                    <button type="submit" className="login-button" disabled={loading}>
                        로그인
                    </button>
                </form>
            )}
        </div>
    );
};

export default LoginPage;
