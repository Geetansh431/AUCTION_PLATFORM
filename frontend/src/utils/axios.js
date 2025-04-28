import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://auction-platform-ojz0.onrender.com/api/v1',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance; 