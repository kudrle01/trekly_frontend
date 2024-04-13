import axios from 'axios';
import { config } from '../config/config';

export const fetchBodyParts = () => {
  return axios.get(config.API_ENDPOINTS.BODY_PARTS);
};

export const fetchTargets = () => {
  return axios.get(config.API_ENDPOINTS.TARGETS);
};

export const fetchEquipment = () => {
  return axios.get(config.API_ENDPOINTS.EQUIPMENT);
};

export const fetchExercises = (bodyPart, equipment, query, page, limit = 10) => {
  return axios.get(`${config.API_ENDPOINTS.EXERCISES}?bodyPart=${bodyPart}&equipment=${equipment}&query=${query}&page=${page}&limit=${limit}`);
};

export const fetchExerciseById = (exercise_id) => {
  return axios.get(`${config.API_ENDPOINTS.EXERCISE}/${exercise_id}`);
};

export const saveRoutine = (token, name, exercises) => {
  return axios.post(config.API_ENDPOINTS.SAVE_ROUTINE, { name, exercises }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteRoutine = (token, routine_id) => {
  return axios.delete(`${config.API_ENDPOINTS.DELETE_ROUTINE}/${routine_id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateRoutine = (token, routine_id, name, exercises) => {
  return axios.put(`${config.API_ENDPOINTS.UPDATE_ROUTINE}/${routine_id}`, { name, exercises }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const fetchRoutines = (token) => {
  return axios.post(config.API_ENDPOINTS.GET_ROUTINES, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const fetchUsers = async (token, query, page, limit = 10) => {
  return axios.get(`${config.API_ENDPOINTS.USER_PROFILES}?query=${query}&page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => response.data);
};

export const fetchWorkouts = async (token, feedType, page, limit = 3) => {
  return axios.get(`${config.API_ENDPOINTS.FETCH_WORKOUTS}?feedType=${feedType}&page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.data);
};


export const saveWorkout = async (token, formData) => {
  return fetch(config.API_ENDPOINTS.SAVE_WORKOUT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
};


export const deleteWorkout = async (token, workout_id) => {
  return axios.delete(`${config.API_ENDPOINTS.DELETE_WORKOUT}/${workout_id}`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  })
      .then(response => response.data);
};

export const upload = async (token, type, formData) => {
  return fetch(`${config.API_ENDPOINTS.UPLOAD_IMAGE}/${type}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
};


export const fetchImage = (type, id) => {
  return `${config.API_ENDPOINTS.GET_IMAGE}/${type}/${encodeURIComponent(id)}`;
};

export const deleteAccount = (token) => {
  return axios.delete(config.API_ENDPOINTS.DELETE_ACCOUNT, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};