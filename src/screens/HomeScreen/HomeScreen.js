import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, Text, ActivityIndicator, Modal, TouchableOpacity, TouchableWithoutFeedback, StatusBar, Platform } from 'react-native';

import HomeHeader from '../../components/headers/HomeHeader';
import WorkoutPost from '../../components/WorkoutPost';
import { fetchWorkouts } from '../../services/api/api';
import useAuthStore from '../../store/authStore';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';
import { checkAchievements } from '../../services/api/achievements';
import useAchievementStore from '../../store/achievementStore';
import useRefreshStore from '../../store/refreshStore';

const HomeScreen = ({ navigation }) => {
    const [workouts, setWorkouts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const checkAuth = useAuthStore(state => state.checkAuth);
    const getUser = useAuthStore(state => state.getUser);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [feedType, setFeedType] = useState('followed');
    const showAchievement = useAchievementStore(state => state.showAchievement);
    const currentUser = useAuthStore(state => state.currentUser);
    const refresh = useRefreshStore(state => state.refresh);

    const checkAuthentication = async () => {
        const isAuthenticated = await checkAuth();
        if (isAuthenticated) {
            const userFetchResult = await getUser();
            if (!userFetchResult.success) {
                navigation.replace("UserStack");
            }
        }
    };

    const fetchUserAndWorkouts = useCallback(async (isRefresh = false) => {
        if (loading) return;
        isRefresh ? setRefreshing(true) : setLoading(true);

        let currentPage = isRefresh ? 1 : page;
        try {
            await performAuthenticatedOperation(async (accessToken) => {
                const data = await fetchWorkouts(accessToken, feedType, currentPage);
                setWorkouts(prevWorkouts => isRefresh ? data.workouts : [...prevWorkouts, ...data.workouts]);
                setHasMore(data.hasMore);
                setPage(currentPage + 1);
            });
        } catch (error) {
            console.error('Failed to fetch workouts or refresh token', error);
            navigation.navigate("UserStack");
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    }, [loading, page, feedType, refresh]);

    const onRefresh = useCallback(() => {
        checkAuthentication();
        fetchUserAndWorkouts(true);
    }, [fetchUserAndWorkouts]);

    useEffect(() => {
        checkAuthentication();
        fetchUserAndWorkouts();
    }, [feedType]);

    useEffect(() => {
        checkAuthentication();
        fetchUserAndWorkouts(true);
    }, [refresh]);

    const changeFeedType = (type) => {
        if(feedType !== type){
            setFeedType(type);
            setWorkouts([]);
            setPage(1);
        }
        setModalVisible(false);
    };

    useEffect(() => {
        const checkForAchievements = async () => {
          try {
            await performAuthenticatedOperation(async (token) => {
              const achievements = await checkAchievements(token);
              if (achievements && achievements.length > 0) {
                // Show each achievement consecutively
                achievements.reduce((promise, achievement, index) => {
                  return promise.then(() => {
                    return new Promise((resolve) => {
                      showAchievement(achievement.name, achievement.description);
                      // Wait for a bit before showing the next achievement
                      setTimeout(resolve, 3500);
                    });
                  });
                }, Promise.resolve());
              }
            });
          } catch (error) {
            console.error("Failed to check achievements:", error);
          }
        };
      
        if (currentUser) {
          checkForAchievements();
        }
      }, [currentUser.workouts, currentUser.streaks, currentUser, showAchievement, performAuthenticatedOperation]);

    const renderEmptyComponent = () => {
        return (
            <View style={styles.emptyContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.exploreButton]}
                    onPress={() => changeFeedType('global')}
                >
                    <Text style={styles.textStyle}>Explore</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.root}>
            <HomeHeader 
                feedType={feedType} 
                onPeopleIconPress={() => setModalVisible(true)} 
                navigation={navigation} 
                isFeedLoading={loading}
            />
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.centeredView}>
                        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                            <View style={styles.modalView}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => changeFeedType('followed')}
                                >
                                    <Text style={styles.textStyle}>Followed</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => changeFeedType('global')}
                                >
                                    <Text style={styles.textStyle}>Global</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <FlatList
                style={styles.list}
                data={workouts}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => <WorkoutPost workout={item} navigation={navigation} />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onEndReached={() => { if (!refreshing && hasMore) fetchUserAndWorkouts(); }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading && hasMore ? <ActivityIndicator style={styles.loader} size="large" color="#000" /> : null}
                ListEmptyComponent={renderEmptyComponent}
            />
        </View>
    );
};

const headerHeight = 60;
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 40;
const totalTopMargin = headerHeight + statusBarHeight;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    list: {
        paddingHorizontal: 20,
    },
    centeredView: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: totalTopMargin,
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 150,
        marginHorizontal: 20,
        paddingVertical: 10,
    },
    button: {
        padding: 10,
        width: '100%',
    },
    exploreButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 15,
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
    loader: {
        marginTop: 20,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200, // Adjust based on your layout
    },
});

export default HomeScreen;