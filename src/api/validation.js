import axios from 'axios';

const isValidId = (id) => /^[a-zA-Z0-9]{5,20}$/.test(id);

export const checkIdAvailability = async (id, role) => {
    if (!isValidId(id)) {
        return 'CONSIST_INVALID';
    }
    try {
        const response = await axios.get('https://localhost:8443/register/checkid', { params: { id, role } });
        return response.data;
    } catch (error) {
        console.error('Error checking ID availability:', error);
        return false;
    }
};

export const checkEmailAvailability = async (email, role) => {
    try {
        const response = await axios.get('/register/checkemail', { params: { email, role } });
        return response.data;
    } catch (error) {
        console.error('Error checking email availability:', error);
        return false;
    }
};
