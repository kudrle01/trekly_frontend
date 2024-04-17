import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native';
import useWorkoutStore from '../../store/workoutStore';
import useAuthStore from '../../store/authStore';
import FinishWorkoutHeader from '../../components/headers/FinishWorkoutHeader';
import CustomInput from '../../components/CustomInput';
import Slider from '@react-native-community/slider';
import { showConfirmationAlert } from '../../services/utilities/alertUtils';
import FinishWorkoutExercisesList from '../../components/FinishWorkoutExercisesList';
import noWorkoutPictureIcon from '../../../assets/no_picture/no-workout-picture-icon.png';
import * as ImagePicker from 'expo-image-picker';

const FinishWorkoutScreen = ({ route, navigation }) => {
    const { exercises } = route.params || {};
    const { checkAuth, refreshUserAccessToken, logout, getUser } = useAuthStore();
    const workoutName = useWorkoutStore(state => state.name);
    const setWorkoutName = useWorkoutStore(state => state.setName);
    const duration = useWorkoutStore(state => state.duration);
    const postContent = useWorkoutStore(state => state.postContent);
    const setPostContent = useWorkoutStore(state => state.setPostContent);
    const difficulty = useWorkoutStore(state => state.difficulty);
    const setDifficulty = useWorkoutStore(state => state.setDifficulty);
    const image = useWorkoutStore(state => state.image);
    const setImage = useWorkoutStore(state => state.setImage);

    const authenticateAndProceed = async (action) => {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
            const refreshResult = await refreshUserAccessToken();
            if (!refreshResult.success) {
                logout();
                navigation.replace("Login");
                return;
            }
        }
        action();
    };

    let totalReps = 0;
    exercises.forEach(exercise => {
        exercise.sets.forEach(set => {
            if (set.isDone) {
                totalReps += (parseInt(set.kilograms) * parseInt(set.reps)) || 0;
            }
        });
    });


    const endWorkout = async () => {
        await authenticateAndProceed(async () => {
            useWorkoutStore.getState().endWorkout();
            await getUser(); // Ensure user data is refreshed to reflect any changes
            navigation.navigate("MainContainer");
        });
    };

    const handleDiscardPressed = () => {
        showConfirmationAlert("Discard Workout", "Are you sure you want to discard this workout?", endWorkout, () => { });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
        >
                <FinishWorkoutHeader exercises={exercises} navigation={navigation} />
                <ScrollView style={styles.container}>

                    <CustomInput
                        placeholder="Workout Name"
                        value={workoutName}
                        setValue={setWorkoutName}
                        type="SECONDARY"
                    />
                    <View style={[styles.section, styles.summary_section]}>
                        <View style={styles.stats_container}>
                            <Text style={styles.stats_header}>Duration:</Text>
                            <Text style={styles.stats_value}>{new Date(duration * 1000).toISOString().substr(11, 8)}</Text>
                        </View>
                        <View style={styles.stats_container}>
                            <Text style={styles.stats_header}>Volume:</Text>
                            <Text style={styles.stats_value}>{totalReps} kg</Text>
                        </View>
                    </View>
                    <View style={[styles.section]}>
                        <Text style={styles.stats_header}>Add photo:</Text>
                        <TouchableOpacity onPress={pickImage}>
                            <Image source={image ? { uri: image } : noWorkoutPictureIcon} style={styles.workout_photo} resizeMode="contain"/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.section]}>
                        <Text style={styles.stats_header}>Share something about your workout:</Text>
                        <TextInput
                            style={styles.workout_info_input}
                            onChangeText={setPostContent}
                            value={postContent}
                            placeholder="How did it go? Share your workout feelings..."
                            multiline
                            numberOfLines={4}
                        />
                    </View>
                    <View style={[styles.section, styles.difficulty_section]}>
                        <Text style={styles.stats_header}>How difficult was it?</Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={4}
                            step={1}
                            value={difficulty}
                            onValueChange={setDifficulty}
                            minimumTrackTintColor="#000"
                            maximumTrackTintColor="#d3d3d3"
                        />
                        <Text style={styles.difficulty_label}>{['Very Easy', 'Easy', 'Normal', 'Difficult', 'Very Difficult'][difficulty]}</Text>
                    </View>
                    <View style={[styles.section, styles.exercises_section]}>
                        <Text style={styles.stats_header}>Exercises:</Text>
                        <FinishWorkoutExercisesList exercises={exercises} />
                    </View>
                    <TouchableOpacity style={styles.discard_button} onPress={handleDiscardPressed}>
                        <Text style={styles.button_text}>Discard Workout</Text>
                    </TouchableOpacity>
                </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 15,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    section: {
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#a1a7aa',
    },

    summary_section: {
        flexDirection: 'row',
        borderColor: '#a1a7aa',
    },
    stats_container: {
        width: '50%',
    },
    stats_header: {
        fontWeight: 'bold',
        color: '#333',
    },
    stats_value: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: 'bold',
    },

    workout_info_input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: '#fff',
        marginTop: 10,
    },
    exercises_section: {
        flex: 1,
        borderBottomColor: 'transparent',
    },

    discard_button: {
        alignSelf: 'center',
    },
    button_text: {
        fontSize: 20,
        color: 'red',
    },
    difficulty_label: {
        fontSize: 16,
        marginTop: 8,
        color: '#000',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    slider: {
        width: '100%',
        height: 40,
        marginTop: 20,
    },
    workout_photo: {
        width: 200,
        height: 200,
        marginTop: 20,
        borderRadius: 20,
    },
});

export default FinishWorkoutScreen;
