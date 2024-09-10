import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css';
import { useNotification } from '../components/NotificationContext'; // 컨텍스트 사용
import useWebSocket from '../hooks/useWebSocket'; // useWebSocket 훅 가져오기

const Header = ({ initialUserInfo }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { notification, setNotification } = useNotification(); // 알림 상태 가져오기
    const { sendMessage } = useWebSocket(); // 웹소켓 훅에서 메시지 전송 함수 가져오기

    const [userInfo, setUserInfo] = useState(initialUserInfo); // userInfo 상태 관리

    console.log('Notification in Header:', notification);
    const toggleDrawer = () => {
        setIsOpen(prev => !prev);
    };

    const closeDrawer = () => {
        setIsOpen(false);
    };

    const handleLogInClick = () => {
        navigate('/login');
    };

    const handleLogOutClick = () => {
        localStorage.removeItem('accessToken');
        setUserInfo(null); // 로그아웃 후 userInfo 상태를 null로 설정
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleNotificationClick = () => {
        if (notification) {
            sendMessage('READ_NOTIFICATION', notification.content, notification.id);
            setNotification(null);
        }
    };

    return (
        <header className="header">
            <div className="logo">Booknic</div>
            {!userInfo ? (
                <>
                    <button onClick={handleLogInClick}>로그인</button>
                    <button onClick={handleSignUpClick}>회원가입</button>
                </>
            ) : (
                <>
                    {userInfo.id && <div className="role-info">{userInfo.id}님 환영합니다.</div>}
                    {userInfo.role === 'staff' && (
                        <div className="role-info">{userInfo.role} 모드 입니다.</div>
                    )}
                    <button onClick={handleLogOutClick}>로그아웃</button>
                </>
            )}
            <div className="menu-icon" onClick={toggleDrawer}>🔔</div>
            <div className={`notification-drawer ${isOpen ? 'true' : ''}`}>
                <button className="close-btn" onClick={closeDrawer}>✖</button>
                <h3>Notifications</h3>
                <ul>
                    {notification && (
                        <li onClick={handleNotificationClick}>
                            {notification.content}
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Header;
