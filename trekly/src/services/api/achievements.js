import axios from 'axios';
import { config } from '../config/config';

export const checkAchievements = async (token) => {
    return axios.get(config.API_ENDPOINTS.CHECK_ACHIEVEMENTS, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.data);
    };

export const fetchUserAchievements = async(token, user_id) => {
    return axios.get(`${config.API_ENDPOINTS.FETCH_USER_ACHIEVEMENTS}/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.data);
    };