import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import SearchUserHeader from '../../components/headers/SearchUserHeader';
import useFilterStore from '../../store/filterStore';
import SearchBar from '../../components/SearchBar';
import UserInfoRow from '../../components/UserInfoRow';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';
import { fetchUsers } from '../../services/api/api';
import useAuthStore from '../../store/authStore';

const SearchUserScreen = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const searchQuery = useFilterStore(state => state.searchQuery);

    const loadUsers = useCallback(async () => {
        if (loading || !searchQuery) return;
        setLoading(true);
        try {
            await performAuthenticatedOperation(async (accessToken) => {
                const data = await fetchUsers(accessToken, searchQuery.toLowerCase(), page);
                setUsers(prev => [...prev, ...data.users]);
                setHasMore(data.hasMore);
            });
        } catch (error) {
            console.error("Fetching users failed: " + error);
            navigation.navigate("UserStack");
            useAuthStore.getState().logout();
        } finally {
            setLoading(false);
        }
    }, [searchQuery, page, loading]);

    useEffect(() => {
        setUsers([]);
        setPage(1); // Reset page to 1 when filters change
        loadUsers();
    }, [searchQuery]);

    useEffect(() => {
        if (page !== 1) {
            loadUsers();
        }
    }, [page]);

    return (
        <View style={styles.root}>
            <SearchUserHeader navigation={navigation} />
            <View style={styles.content}>
                <SearchBar placeholder={"Search user..."}/>
                <FlatList
                    style={styles.list}
                    data={users}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => <View style={{paddingVertical: 10,}}><UserInfoRow user={item} navigation={navigation} /></View>}
                    onEndReached={() => !loading && hasMore && setPage(prev => prev + 1)}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loading && <ActivityIndicator style={styles.loader} size="large" color="#000" />}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginHorizontal: 20,
    },
    loader: {
        marginVertical: 20,
    },
});

export default SearchUserScreen;
