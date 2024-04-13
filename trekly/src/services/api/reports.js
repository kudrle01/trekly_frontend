import axios from 'axios';
import { config } from '../config/config';

export const reportUser = async (token, user_id) => {
    return axios.post(`${config.API_ENDPOINTS.REPORT_USER}/${user_id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data);
  };
  export const reportWorkout = async (token, workout_id) => {
    return axios.post(`${config.API_ENDPOINTS.REPORT_WORKOUT}/${workout_id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data);
  };