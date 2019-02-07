import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burger-builder-9a424.firebaseio.com/'
});

export default instance;