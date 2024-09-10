import axios from './axios';

// postData 함수 수정
const postData = async (endpoint, params) => {
    try {
        // 로컬 스토리지에서 authToken 가져오기
        const authToken = localStorage.getItem('accessToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`
        };

        // POST 요청 보내기
        const response = await axios.post(endpoint, params, { headers,
            withCredentials: true,
         });

        // 로그인 응답 처리
        if (endpoint === '/auth/login') {
            const accessToken = response.headers['authorization'];
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
            }
        }

        // 응답 상태 코드 반환
        return { status: response.status, data: response.data };
    } catch (error) {
        // 오류 처리
        console.error('Error posting data:', error);
        return { error: true, message: error.message };
    }
};

export default postData;