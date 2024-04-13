import { create } from 'zustand';

const useExercisesStore = create(set => ({
    bodyParts: [],
    equipment: [],
    setBodyParts: (bodyParts) => set({ bodyParts: bodyParts }),
    setEquipment: (equipment) => set({ equipment: equipment }),
}));

export default useExercisesStore;