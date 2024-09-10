import axios from './axios';

const fetchData = async (endpoint, setData, params) => {
    const authToken = localStorage.getItem('accessToken'); // authToken을 로컬 스토리지에서 가져옴
    let headers = {
                'Content-Type': 'application/json',
                'Authorization': `${authToken}`
    };
    try {
        const response = await axios.get(endpoint, {
            params,
            headers,
            withCredentials: true
        });

        const dataArray = response.data;
        setData(dataArray);

    } catch (error) {
        console.log(error);
    }
};

export default fetchData;