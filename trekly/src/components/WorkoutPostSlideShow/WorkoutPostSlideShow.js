import React from 'react';
import { View, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import WorkoutPostImage from '../WorkoutPostImage';
import FinishWorkoutExercisesList from '../FinishWorkoutExercisesList';

const { width } = Dimensions.get('window');

const WorkoutPostSlideShow = ({ imageUrl, exercises }) => {
  const slides = [];

  function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  }

  // Conditionally add the WorkoutPostImage slide if imageUrl exists
  if (imageUrl) {
    slides.push(
      <View key="imageSlide" style={{ width }}>
        <WorkoutPostImage imageUrl={imageUrl} />
      </View>
    );
  }

  const exerciseChunks = chunkArray(exercises, 6);

  // Always add the FinishWorkoutExercisesList slide
  exerciseChunks.forEach((chunk, index) => {
    slides.push(
      <View key={`exercisesSlide-${index}`}>
        <FinishWorkoutExercisesList exercises={chunk} />
      </View>
    );
  });

  return (
    <Swiper showsPagination={true} paginationStyle={{ position: 'absolute', bottom: -25 }} loop={false} style={{height: 400}}>
      {slides}
    </Swiper>
  );
};

export default WorkoutPostSlideShow;
