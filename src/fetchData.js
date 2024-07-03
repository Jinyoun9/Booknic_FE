import axios from 'axios';

const baseURL = 'http://localhost:8080/';

const fetchData = async (endpoint, setData, params) => {
    try {
            const response = await axios.get(`${baseURL}${endpoint}`, { params,
                headers: {
                    'Content-Type': 'application/json'
                }, });
            const dataArray = response.data;
            setData(dataArray);

    } catch (error) {
        console.log(error);
    }
};

export default fetchData;