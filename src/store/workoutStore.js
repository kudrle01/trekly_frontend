import { create } from "zustand";

const useWorkoutStore = create((set) => ({
  exercises: [],
  name: "",
  isWorkoutActive: false,
  postContent: "",
  currentRoutine: null,
  duration: 0,
  difficulty: 2,
  image: "",

  setExercises: (newExercises) => set({ exercises: newExercises }),
  setName: (name) => set(() => ({ name: name })),
  setIsWorkoutActive: (isWorkoutActive) => set({ isWorkoutActive: isWorkoutActive }),
  setDuration: (duration) => set({ duration: duration }),
  setPostContent: (updatedPostContent) => set({ postContent: updatedPostContent }),
  setDifficulty: (difficulty) => set({ difficulty: difficulty }),
  setImage: (image) => set(() => ({ image: image })),

  addExercise: (exercise) => set(state => ({
    ...state,
    exercises: [...state.exercises, exercise]
  })),
  clearExercises: () => set(() => ({ exercises: [] })),
  toggleWorkoutStatus: () => set((state) => ({ isWorkoutActive: !state.isWorkoutActive })),
  setCurrentRoutine: (currentRoutine) => set({ currentRoutine: currentRoutine }),
  addSetToExercise: (id, newSet) => set((state) => ({
    exercises: state.exercises.map((exercise) =>
      exercise._id === id ? { ...exercise, sets: [...exercise.sets, newSet] } : exercise,
    ),
  })),
  updateSet: (ex, index, field, value) => set((state) => ({
    exercises: state.exercises.map((exercise) =>
      exercise === ex ? { ...exercise, sets: exercise.sets.map((set, idx) => idx === index ? { ...set, [field]: value } : set) } : exercise),
  })),
  updateExercise: (id, update) => set((state) => ({
    exercises: state.exercises.map(exercise =>
      exercise._id === id ? { ...exercise, ...update } : exercise
    )
  })),
  deleteSetFromExercise: (exerciseId, index) => set((state) => ({
    exercises: state.exercises.map((exercise) => {
      if (exercise._id === exerciseId) {
        // Remove the set at the given index
        let newSets = [...exercise.sets];
        newSets.splice(index, 1);
        return { ...exercise, sets: newSets };
      }
      return exercise;
    }),
  })),
  removeExerciseFromWorkout: (exerciseId) => set((state) => ({
    exercises: state.exercises.filter(exercise => String(exercise._id) !== String(exerciseId)),
  })),
  logout: () => {
    useAuthStore.getState().clearTokens();
  },
  endWorkout: () => set(() => ({
    isWorkoutActive: false,
    exercises: [],
    name: "",
    duration: 0,
    difficulty: 2,
    image: "",
  })),
}));

export default useWorkoutStore;
