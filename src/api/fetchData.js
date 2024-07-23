import axios from './axios';

const fetchData = async (endpoint, setData, params) => {
    try {
        const response = await axios.get(endpoint, {
            params,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        const dataArray = response.data;
        setData(dataArray);

    } catch (error) {
        console.log(error);
    }
};

export default fetchData;