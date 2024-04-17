import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import ExerciseInfoHeader from '../../components/headers/ExerciseInfoHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const ExerciseInfoScreen = ({ navigation, route }) => {
    const { exercise, imageUrl } = route.params;
    return (
        <SafeAreaView style={styles.root}>
        <ExerciseInfoHeader navigation={navigation}/>
        <Text style={styles.exercise_heading}>{exercise.name}</Text>
        <Image style={styles.img} source={imageUrl} />
            <ScrollView contentContainerStyle={styles.content}>
                {exercise.instructions.map((instruction, index) => (
                    <View key={index} style={styles.instructionContainer}>
                        <Text style={styles.instructionNumber}>{index + 1}.</Text>
                        <Text style={styles.instructionText}>{instruction}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        alignItems: 'center',
        padding: 16,
    },
    img: {
        height: 300,
        width: 300,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    exercise_heading: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 20,
    },
    instructionContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    instructionNumber: {
        fontWeight: 'bold',
        marginRight: 8,
    },
    instructionText: {
        flex: 1,
        textAlign: 'justify',
    }
});

export default ExerciseInfoScreen;
