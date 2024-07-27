import React, { useEffect, useState } from 'react';
import Notification from '../components/Notification'; // 알림 컴포넌트 임포트

const WebSocketClient = () => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const ws = new WebSocket(`wss://localhost:8443/ws/book-events?token=${accessToken}`);
        setSocket(ws);

        ws.onmessage = (event) => {
            setMessages(prevMessages => [...prevMessages, event.data]);
            setNotification(event.data); // 메시지를 알림으로 설정
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
        return () => {
            ws.close();
        };
    }, []);

    return (
        <div>
            <Notification
                message={notification}
                onClose={() => setNotification(null)} // 알림 닫기
            />
        </div>
    );
};

export default WebSocketClient;
