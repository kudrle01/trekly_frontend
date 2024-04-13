import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { login, register, refreshAccessToken, fetchUserProfile, fetchUserById } from '../services/api/auth';

const useAuthStore = create(set => ({
  isAuthenticated: false,
  currentUser: null,
  user: null,

  updateRoutines: (newRoutines) => set((state) => ({
    currentUser: {
      ...state.currentUser,
      routines: newRoutines,
    },
  })),

  updateProfilePhoto: (newProfilePhotoUrl) => set((state) => ({
    currentUser: {
      ...state.currentUser,
      profilePhotoUrl: newProfilePhotoUrl,
    },
  })),

  setTokens: async (accessToken, refreshToken) => {
    try {
      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);
      set({ isAuthenticated: true });
    } catch (error) {
      console.error('Error storing the tokens', error);
    }
  },

  clearTokens: async () => {
    try {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      set({ isAuthenticated: false, currentUser: null }); // Reset currentUser on logout
    } catch (error) {
      console.error('Error clearing the tokens', error);
    }
  },

  checkAuth: async () => {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    if (accessToken) {
      return true;
    } 
    return false;
  },
  

  loginUser: async (username, password) => {
    try {
      const response = await login(username, password);
      if (response.status === 200 && response.data.access_token && response.data.refresh_token) {
        await useAuthStore.getState().setTokens(response.data.access_token, response.data.refresh_token);
        return { success: true };
      } else {
        return { success: false, message: response.data.msg || "Login failed. Please check your credentials." };
      }
    } catch (error) {
      if(error.response.data.msg) {
        return { success: false, message: error.response.data.msg };
      }
      console.error("Login failed", "An unexpected error occurred during login.");
      return { success: false, message: "An unexpected error occurred during login." };
    }
  },

  registerUser: async (username, email, password, birthDate, gender) => {
    try {
      const response = await register(username, email, password, birthDate, gender);
      if (response.status === 200 && response.data.access_token && response.data.refresh_token) {
        await useAuthStore.getState().setTokens(response.data.access_token, response.data.refresh_token);
        return { success: true };
      } else {
        return { success: false, message: response.data.msg || "Registration failed. Please try again." };
      }
    } catch (error) {
      if(error.response.data.msg) {
        return { success: false, message: error.response.data.msg };
      }
      console.error("Registration failed", "An unexpected error occurred during registration.");
      return { success: false, message: "An unexpected error occurred during registration." };
    }
  },

  logout: async () => {
    useAuthStore.getState().clearTokens();
  },

  refreshUserAccessToken: async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (!refreshToken) {
        return { success: false };
      }
      const response = await refreshAccessToken(refreshToken);
      if (response.data && response.data.access_token && response.data.refresh_token) {
        await useAuthStore.getState().setTokens(response.data.access_token, response.data.refresh_token);
        return { success: true };
      } else {
        useAuthStore.getState().logout();
        return { success: false, message: "Failed to refresh tokens." };
      }
    } catch (error) {
        useAuthStore.getState().logout();
      return { success: false, message: "Error refreshing tokens." };
    }
  },
  

  getUser: async () => {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (!accessToken) throw new Error('NoAccessToken');

      const profileResponse = await fetchUserProfile(accessToken);
      set({ currentUser: profileResponse.data });
      return { success: true };
    } catch (error) {
      if (error.message === 'NoAccessToken' || error.response.status === 401) {
        const refreshResult = await useAuthStore.getState().refreshUserAccessToken();
        if (refreshResult.success) {
          return useAuthStore.getState().getUser();
        }
      }
      set({ isAuthenticated: false });
      return { success: false, message: "Failed to fetch user profile." };
    }
  },

  getUserById: async (user_id) => {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (accessToken) {
        const userResponse = await fetchUserById(accessToken, user_id);
        if (userResponse.status === 200) {
          const user = userResponse.data;
          set({ user });
        } else {
          console.error('Failed to fetch user data');
        }
      } else {
        console.error('No access token found');
      }
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  },
  addFollowing: (userId) =>
    set(state => ({
      currentUser: {
        ...state.currentUser,
        following: [...state.currentUser.following, { followed: userId }],
      },
    })),
  removeFollowing: (userId) =>
    set(state => ({
      currentUser: {
        ...state.currentUser,
        following: state.currentUser.following.filter(rel => rel.followed !== userId),
      },
    })),
}));

export default useAuthStore;