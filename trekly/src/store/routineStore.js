import { create } from "zustand";

const useRoutineStore = create(set => ({
  exercises: [],
  name: "",
  routines: [],

  setName: (name) => set(() => ({ name: name })),

  addExercise: (exercise) => set(state => ({
    ...state,
    exercises: [...state.exercises, exercise]
  })),

  setExercises: (newExercises) => set({ exercises: newExercises }),

  reorderExercises: (fromIndex, toIndex) => set((state) => {
    let reorderedExercises = [...state.exercises];
    const [removed] = reorderedExercises.splice(fromIndex, 1);
    reorderedExercises.splice(toIndex, 0, removed);
    return { exercises: reorderedExercises };
  }),

  clearExercises: () => set(() => ({ exercises: [] })),

  updateExercise: (id, update) => set((state) => ({
    exercises: state.exercises.map(exercise =>
      exercise._id === id ? { ...exercise, ...update } : exercise
    )
  })),

  removeExerciseFromRoutine: (exerciseId) => set((state) => ({
    exercises: state.exercises.filter(exercise => String(exercise._id) !== String(exerciseId)),
  })),

  addSetToExercise: (id, newSet) => set((state) => ({
    exercises: state.exercises.map((exercise) =>
      exercise._id === id ? { ...exercise, sets: [...exercise.sets, newSet] } : exercise,
    ),
  })),

  updateSet: (ex, index, field, value) => set((state) => ({
    exercises: state.exercises.map((exercise) =>
      exercise === ex ? { ...exercise, sets: exercise.sets.map((set, idx) => idx === index ? { ...set, [field]: value } : set) } : exercise),
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

  setRoutines: (routines) => set(({ routines: routines })),

  addRoutine: (routine) => set(state => ({
    ...state,
    routines: [...state.routines, routine]
  })),

  clearRoutines: () => set(() => ({ routines: [] })),

  setEditedRoutine: (editedRoutine) => set(({ editedRoutine: editedRoutine })),

  reorderRoutineExercises: (routineId, newExercisesOrder) => set((state) => {
    const updatedRoutines = state.routines.map((routine) => {
      if (routine._id === routineId) {
        // Found the routine to update, replace its exercises with the new order
        return { ...routine, exercises: newExercisesOrder };
      }
      return routine; // Return other routines unchanged
    });
    return { routines: updatedRoutines }; // Update the state with the modified routines array
  }),
}));

export default useRoutineStore;
