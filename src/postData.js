import axios from 'axios';

const baseURL = 'https://localhost:8443/';

const postData = async (endpoint, setLoading, setError, params) => {
    try {
        setLoading(true);
        setError(false);
        const url = `${baseURL}${endpoint}`;
        console.log(url);
        console.log(params);

        let response;
        let headers = {
            'Content-Type': 'application/json'
        };
        response = await axios.post(url, params, {
            headers: headers
        });

        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        setError(true);
        return { error: true }; // 에러 발생 시 반환 값에 에러 표시
    } finally {
        setLoading(false);
    }
};

export default postData;
