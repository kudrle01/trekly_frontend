import axios from 'axios';
import { config } from '../config/config';

export const register = (username, email, password, birthDate, gender) => {
    return axios.post(config.API_ENDPOINTS.REGISTER, { username, email, password, birthDate, gender });
};

export const login = (username, password) => {
    return axios.post(config.API_ENDPOINTS.LOGIN, { username, password });
};

export const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post(config.API_ENDPOINTS.REFRESH_TOKEN, {}, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`,
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error refreshing access token', error);
        throw error;
    }
};

export const fetchUserProfile = async (token) => {
        return await axios.get(config.API_ENDPOINTS.USER_PROFILE, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
};

export const fetchUserById = (token, user_id) => {
    return axios.get(`${config.API_ENDPOINTS.USER_PROFILE}/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };
