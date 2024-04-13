import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import React from 'react';

import RoutineHeader from '../../components/headers/RoutineHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import useRoutineStore from '../../store/routineStore';
import RoutineExercisesList from '../../components/RoutineExercisesList';

const RoutineScreen = ({ route, navigation }) => {
  const { routineId, workoutId } = route.params || {};
  const routine_name = useRoutineStore((state) => state.name);
  const setRoutineName = useRoutineStore((state) => state.setName);
  const routineExercises = useRoutineStore((state) => state.exercises);

  const addExercisePressed = () => {
    navigation.navigate("AddExercise");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={styles.root}>
        <RoutineHeader routineId={routineId ? routineId : null} navigation={navigation} />
        <View style={styles.top_section}>
          <CustomInput
            placeholder="Routine Name"
            value={routine_name}
            setValue={setRoutineName}
            type="SECONDARY"
            style={styles.input}
          />
        </View>
        <RoutineExercisesList
          exercises={routineExercises}
          id={routineId ? routineId : workoutId}
          navigation={navigation}
          ListFooterComponent={
            <CustomButton
              text="Add Exercise"
              onPress={addExercisePressed}
              type="SECONDARY"
              icon_name="add"
              textStyle={styles.add_exercise_button}
              style={styles.button}
            />
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  top_section: {
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  add_exercise_button: {
    color: '#fff',
  },
  button: {
    marginTop: 10,
  },
});

export default RoutineScreen;
