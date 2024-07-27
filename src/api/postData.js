import axios from './axios';


const postData = async (endpoint, setLoading, setError, params) => {
    try {
        setLoading(true);
        setError(false);

        const authToken = localStorage.getItem('accessToken'); // authToken을 로컬 스토리지에서 가져옴
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`
        };

        const response = await axios.post(endpoint, params, {
            headers: headers
        });

        if (endpoint === 'auth/login'){
            const accessToken = response.headers['authorization'];
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
            }
        }
        console.log('Response:', response.status);
        return response.status;
    } catch (error) {
        console.log('Error posting data: ', error);
        setError(true);
        return { error: true }; // 에러 발생 시 반환 값에 에러 표시
    } finally {
        setLoading(false);
    }
};

export default postData;
