import axios from 'axios';

export const checkIdAvailability = async (id) => {
    try {
        const response = await axios.get('/register/checkid', { params: { id } });
        return response.data.available;
    } catch (error) {
        console.error('Error checking ID availability:', error);
        return false;
    }
};

export const checkEmailAvailability = async (email) => {
    try {
        const response = await axios.get('/register/checkemail', { params: { email } });
        return response.data.available;
    } catch (error) {
        console.error('Error checking email availability:', error);
        return false;
    }
};
