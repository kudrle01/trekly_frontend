import { create } from 'zustand';

const useAchievementStore = create(set => ({
    // Adjusting the notification structure to include both name and description
    notification: { isVisible: false, name: '', description: '' },

    // Updating showAchievement to accept two parameters
    showAchievement: (name, description) => set({ 
        notification: { isVisible: true, name, description } 
    }),

    hideAchievement: () => set({ notification: { isVisible: false, name: '', description: '' } }),
}));

export default useAchievementStore;
