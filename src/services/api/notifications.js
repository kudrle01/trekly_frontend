import axios from 'axios';
import { config } from '../config/config';


export const fetchNotifications = async(token) => {
    return axios.get(config.API_ENDPOINTS.FETCH_NOTIFICATIONS, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.data);
    };