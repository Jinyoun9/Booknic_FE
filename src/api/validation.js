import axios from 'axios';

const isValidId = (id) => /^[a-zA-Z0-9]{1,20}$/.test(id);

export const checkIdAvailability = async (id) => {
    if (!isValidId(id)) {
        return 'CONSIST_INVALID';
    }
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
