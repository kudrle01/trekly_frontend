import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import WorkoutPost from '../../components/WorkoutPost';
import WorkoutPostHeader from '../../components/headers/WorkoutPostHeader';

const WorkoutPostScreen = ({ route, navigation }) => {
    const { workout } = route.params || {};
    return (
        <View style={styles.root}>
            <WorkoutPostHeader navigation={navigation} />
            <ScrollView>
                <View style={styles.main_container}>
                    <WorkoutPost workout={workout} navigation={navigation} />
                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    main_container: {
        marginHorizontal: 20,
    }
});

export default WorkoutPostScreen;
