import axios from './axios';

// putData 함수 정의
const putData = async (endpoint, params) => {
    try {
        // 로컬 스토리지에서 authToken 가져오기
        const authToken = localStorage.getItem('accessToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}` // Bearer 스킴 사용
        };

        // PUT 요청 보내기
        const response = await axios.put(endpoint, params, { headers });

        // 응답 상태 코드와 데이터 반환
        return { status: response.status, data: response.data };
    } catch (error) {
        // 오류 처리
        console.error('Error putting data:', error);
        return { error: true, message: error.message };
    }
};

export default putData;
