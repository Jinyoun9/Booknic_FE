import axios from './axios';

const deleteData = async (endpoint, params) => {
    const authToken = localStorage.getItem('accessToken');
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}` // 일반적으로 Bearer 스킴을 사용
    };
    try {
        const response = await axios.delete(endpoint, {
            headers,
            params,
            withCredentials: true
        });
        return response.data; // 성공적으로 삭제된 데이터 또는 상태를 반환할 수 있음
    } catch (error) {
        console.error('Delete request failed:', error);
        throw error; // 호출자에게 에러를 전파
    }
};

export default deleteData;
