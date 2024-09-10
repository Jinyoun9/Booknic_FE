import React, { useState, useEffect } from 'react';
import '../css/Notification.css';  // 스타일 시트 임포트

const Notification = ({ message, onClose }) => {
    // 알림을 일정 시간 후 자동으로 닫기 위해 useEffect 사용
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000); // 5초 후 자동으로 닫기

            return () => clearTimeout(timer); // 클린업
        }
    }, [message, onClose]);

    return (
        message ? (
            <div className="notification">
                <span>{message}</span>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>
        ) : null
    );
};

export default Notification;
