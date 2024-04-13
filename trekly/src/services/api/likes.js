import axios from 'axios';
import { config } from '../config/config';

export const like = async (token, workout_id) => {
    return axios.post(`${config.API_ENDPOINTS.LIKE}/${workout_id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data);
  };
  
  export const unlike = async (token, workout_id) => {
    return axios.post(`${config.API_ENDPOINTS.UNLIKE}/${workout_id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data);
  };

  export const fetchWorkoutLikes = async (token, workout_id) => {
    return axios.get(`${config.API_ENDPOINTS.WORKOUT_LIKES}/${workout_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data);
  };