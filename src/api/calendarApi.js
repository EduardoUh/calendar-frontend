import axios from "axios";


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// interceptors allow us to edit the headers of the query, it can be in the request headers or in the response headers
apiClient.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
});

export default apiClient;
