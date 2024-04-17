import axios from 'axios';
import { config } from '../config/config';

export const fetchWorkoutComments = async (token, workout_id) => {
    return axios.get(`${config.API_ENDPOINTS.WORKOUT_COMMENTS}/${workout_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => response.data);
};

export const postComment = async (token, workout_id, body) => {
    return axios.post(`${config.API_ENDPOINTS.ADD_COMMENT}/${workout_id}`, { body }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => response.data);
};

export const deleteComment = async (token, comment_id) => {
    return axios.delete(`${config.API_ENDPOINTS.DELETE_COMMENT}/${comment_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => response.data);
};