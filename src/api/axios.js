    import axios from 'axios';

    const instance = axios.create({
        baseURL: 'https://localhost:8443' // 기본 URL 설정
    });

    export default instance;
