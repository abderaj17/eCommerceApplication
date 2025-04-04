import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cart';


//Set auth token form requests
const setAuthToken = (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

// get user's cart
exports const getCart = async () => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    return await axios.get(API_URL);
}