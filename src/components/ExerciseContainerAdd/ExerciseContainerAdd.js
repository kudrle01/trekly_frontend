import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useFilterStore from '../../store/filterStore';
import useRoutineStore from '../../store/routineStore';
import useWorkoutStore from '../../store/workoutStore';
import useExercisesStore from '../../store/exercisesStore';
import { fetchImage } from '../../services/api/api';
import { showErrorAlert } from '../../services/utilities/alertUtils';

const ExerciseContainerAdd = ({ item, navigation }) => {
  const [imageUrl, setImageUrl] = useState(require('../../../assets/icon.png'));
  const defaultBodyPart = useFilterStore(state => state.defaultBodyPart);
  const defaultEquipment = useFilterStore(state => state.defaultEquipment);

  const routineExercises = useRoutineStore(state => state.exercises);
  const workoutExercises = useWorkoutStore(state => state.exercises);
  const workoutActive = useWorkoutStore(state => state.isWorkoutActive);
  const bodyParts = useExercisesStore(state => state.bodyParts);

  const { name, bodyPart, _id } = item;

  const bodyPartName = bodyParts.find(part => part._id === bodyPart)?.name || 'Unknown Body Part';

  const updateExerciseDetails = (id, kilograms, reps, isDone) => {
    workoutActive ? 
    useWorkoutStore.getState().updateExercise(id, { sets: [{ kilograms, reps, isDone }] }) :
    useRoutineStore.getState().updateExercise(id, { sets: [{ kilograms, reps, isDone }] });
  };

  useEffect(() => {
    const imageUrl = fetchImage("exercises", _id.replace("/", ""));
    setImageUrl({ uri: imageUrl });
}, [name]);


  const exercisePressed = () => {
    const exercise = {
      _id: _id,
    };
    if (workoutActive) {
      if (workoutExercises.some((exercise) => exercise._id === _id)) {
        showErrorAlert("", "Exercise already added");
      } else {
        useWorkoutStore.getState().addExercise(exercise);
      }
    } else {
      if (routineExercises.some((exercise) => exercise._id === _id)) {
        showErrorAlert("", "Exercise already added");
      } else {
        useRoutineStore.getState().addExercise(exercise);
      }
    }
    updateExerciseDetails(_id, "", "", false);
    useFilterStore.getState().setBodyPart(defaultBodyPart);
    useFilterStore.getState().setEquipment(defaultEquipment);
    useFilterStore.getState().setSearchQuery("");
    navigation.goBack();
  };

  const infoPressed = () => {
    navigation.navigate("ExerciseInfo", {exercise: item, imageUrl: imageUrl});
  };

  return (
    <TouchableOpacity style={styles.root} onPress={exercisePressed}>
      <Image style={styles.img} source={imageUrl} />
      <View style={styles.description}>
        <Text style={[styles.infoText, styles.exerciseName]}>{name}</Text>
        <Text style={[styles.infoText, styles.bodyPartName]}>{bodyPartName}</Text>
      </View>
      <TouchableOpacity onPress={infoPressed}>
        <Ionicons name="information-circle-outline" size={30} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    borderBottomWidth: 2,
    borderBottomColor: '#a1a7aa',
    height: 100,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  img: {
    width: 80,
    height: 80
  },

  description: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },

  infoText: {
    height: '50%',
  },

  exerciseName: {
    fontWeight: 'bold',
    fontSize: 15,
  },

  bodyPartName: {
    paddingTop: 10,
    color: '#a1a7aa'
  }

});

export default ExerciseContainerAdd;