import { fetchRoutines, fetchExercises, fetchBodyParts, fetchEquipment, fetchWorkouts, fetchUserWorkouts } from "../api/api";
import useRoutineStore from "../../store/routineStore";
import useFilterStore from "../../store/filterStore";
import useExercisesStore from "../../store/exercisesStore";

export const loadRoutines = async (userId) => {
    try {
      const routines = (await fetchRoutines(userId)).data;
      useRoutineStore.getState().setRoutines(routines);
    } catch (error) {
      console.error(error);
    }
  };

  export const loadBodyParts = async () => {
    try {
      const bodyParts = (await fetchBodyParts()).data;
      sortData(bodyParts);
      useExercisesStore.getState().setBodyParts(bodyParts);
    } catch (error) {
      console.error(error);
    }
  }


  export const loadEquipment = async () => {
    try {
      let equipment = ((await fetchEquipment()).data);
      sortData(equipment);
      useExercisesStore.getState().setEquipment(equipment);
    } catch (error) {
      console.error(error);
    }
  }

export const sortData = (data) => {
  data.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
};