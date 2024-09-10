import { useEffect, useState } from 'react';
import { useNotification } from '../components/NotificationContext'; // 경로를 수정하여 컨텍스트 임포트

const useWebSocket = () => {
    const { setNotification } = useNotification(); // 컨텍스트의 알림 설정 함수 가져오기
    const [socket, setSocket] = useState(null);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (!accessToken) {
            console.warn('No access token found. WebSocket connection will not be established.');
            return; // accessToken이 없으면 웹소켓 연결을 시도하지 않음
        }

        let ws = new WebSocket(`wss://localhost:8443/ws/book-events?token=${encodeURIComponent(accessToken)}`);

        ws.onopen = () => {
            console.log("WebSocket connection established.");
        };

        ws.onmessage = (event) => {
            try {
                const messageData = JSON.parse(event.data);
                if (messageData.content && messageData.id) {
                    setNotification({id: messageData.id, content: messageData.content}); // 'content' 필드만 상태로 설정
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed. Reconnecting...");
            setSocket(null); // 연결이 끊어진 후 상태를 초기화
            setTimeout(() => {
                // 재연결 시도
                if (accessToken) {
                    ws = new WebSocket(`wss://localhost:8443/ws/book-events?token=${encodeURIComponent(accessToken)}`);
                    setSocket(ws);
                }
            }, 3000); // 3초 후에 재연결
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            ws.close();
        };

        setSocket(ws);

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [accessToken, setNotification]); // accessToken이 변경될 때도 effect가 재실행됨

    const sendMessage = (type, content, id) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({ type, content, id });
            socket.send(message);
        }
    };

    return { sendMessage };
};

export default useWebSocket;
