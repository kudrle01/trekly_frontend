import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import ExerciseContainerAdd from '../ExerciseContainerAdd';
import { fetchExercises } from '../../services/api/api';
import useFilterStore from '../../store/filterStore';

const ExercisesList = ({ navigation }) => {
    const [exercises, setExercises] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const bodyPartFilter = useFilterStore(state => state.bodyPart);
    const equipmentFilter = useFilterStore(state => state.equipment);
    const searchQuery = useFilterStore(state => state.searchQuery);
    const defaultBodyPart = useFilterStore(state => state.defaultBodyPart);
    const defaultEquipment = useFilterStore(state => state.defaultEquipment);

    const loadExercises = useCallback(async () => {
        if (loading) return;
        try {
            setLoading(true);
            const data = (await fetchExercises(
                bodyPartFilter.name === defaultBodyPart.name ? "" : bodyPartFilter._id,
                equipmentFilter.name === defaultEquipment.name ? "" : equipmentFilter._id,
                searchQuery.toLowerCase(),
                page
            )).data;
            setExercises(prev => [...prev, ...data.exercises]);
            setHasMore(data.hasMore);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [bodyPartFilter, equipmentFilter, searchQuery, page, loading, hasMore]);

    // Effect to handle filter changes
    useEffect(() => {
        setExercises([]);
        setPage(1); // Reset page to 1 when filters change
        loadExercises();
    }, [bodyPartFilter, equipmentFilter, searchQuery]);

    // Effect to load exercises on page change
    useEffect(() => {
        if (page !== 1) {
            loadExercises();
        }
    }, [page]);
    return (
        <FlatList
            style={styles.list}
            data={exercises}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
                <ExerciseContainerAdd
                    item={item}
                    navigation={navigation}
                />
            )}
            onEndReached={() => !loading && hasMore && setPage(prev => prev + 1)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <ActivityIndicator style={styles.loader} size="large" color="#000" /> : null}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 20,
        flex: 1,
    },
    loader: {
        marginTop: 40,
    }
});

export default ExercisesList;
