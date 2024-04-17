import axios from 'axios';
import { config } from '../config/config';


export const follow = async (token, user_id) => {
    return axios.post(`${config.API_ENDPOINTS.FOLLOW}/${user_id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data);
  };
  
  export const unfollow = async (token, user_id) => {
    return axios.post(`${config.API_ENDPOINTS.UNFOLLOW}/${user_id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data);
  };

  export const fetchFollowsByUserId = async (token, user_id) => {
    return axios.get(`${config.API_ENDPOINTS.FOLLOWS}/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data);
  };