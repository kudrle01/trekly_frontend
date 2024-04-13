import React, { useState, useEffect } from 'react';
import { Image, Dimensions } from 'react-native';

const WorkoutPostImage = ({ imageUrl }) => {
    const [imageHeight, setImageHeight] = useState(0);
    const screenWidth = Dimensions.get('window').width - 40;
    
    useEffect(() => {
      if (imageUrl) {
        Image.getSize(imageUrl, (width, height) => {
          const calculatedHeight = (height / width) * screenWidth;
          setImageHeight(calculatedHeight);
        }, (error) => {
          setImageHeight(screenWidth * 0.75); // Example fallback height
        });
      }
    }, [imageUrl]);
    
  
    return (
      <Image
        source={{ uri: imageUrl }}
        style={{ width: screenWidth, height: imageHeight, resizeMode: 'contain' }}
      />
    );
  };

  export default WorkoutPostImage;

  