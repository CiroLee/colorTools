import axios from 'axios';
const http = async options => {
    try {
        options.method = options.method || 'get';
        const {data} = await axios(options);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default http;