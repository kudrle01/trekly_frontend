import React, { useState, useEffect, useCallback } from 'react';
import { Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import useAuthStore from '../../store/authStore';
import { fetchUserById } from '../../services/api/auth';
import { showErrorAlert } from '../../services/utilities/alertUtils';
import { follow, unfollow } from '../../services/api/follows';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';
import UserAchievementsList from '../UserAchievementsList';
import UserWorkoutList from '../UserWorkoutsList/UserWorkoutList';
import UserSplitStatsContainer from '../UserSplitStatsContainer';
import UserStatsContainer from '../UserStatsContainer';
import UserProfilePhotoContainer from '../UserProfilePhotoContainer';


const ProfileContent = ({ navigation, user }) => {
    const { currentUser } = useAuthStore();
    const [refreshing, setRefreshing] = useState(false);
    const [userData, setUserData] = useState();
    const [isFollowing, setIsFollowing] = useState(currentUser?.following.some(rel => rel.followed === user?._id));

    const fetchAndUpdateUserData = useCallback(async () => {
        setRefreshing(true);
        try {
            await performAuthenticatedOperation(async (token) => {
                const fetchedUserData = await fetchUserById(token, user._id);
                setUserData(fetchedUserData.data);
            });
        } catch (error) {
            console.error(error);
            showErrorAlert("Fetch Error", "Failed to fetch user data.");
        } finally {
            setRefreshing(false);
        }
    }, [user?._id, navigation]);

    useEffect(() => {
        fetchAndUpdateUserData();
    }, [fetchAndUpdateUserData, user._id, user.profilePhotoUrl, navigation]);

    const handleFollowPress = async () => {
        try {
            await performAuthenticatedOperation(async (token) => {
                if (isFollowing) {
                    await unfollow(token, user._id);
                    useAuthStore.getState().removeFollowing(user._id);
                } else {
                    await follow(token, user._id);
                    useAuthStore.getState().addFollowing(user._id);
                }
                setIsFollowing(!isFollowing);
                fetchAndUpdateUserData();
            });
        } catch (error) {
            console.error("Follow/Unfollow action failed:", error);
            showErrorAlert("Action Failed", "Failed to update follow status.");
            navigation.navigate("UserStack");
            useAuthStore.getState().logout();
        }
    };

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchAndUpdateUserData} />}>
            <UserProfilePhotoContainer userData={userData}/>
            <UserStatsContainer userData={userData} navigation={navigation} />
            {
                user?._id !== currentUser._id && (
                    <TouchableOpacity
                        style={isFollowing ? styles.unfollowButton : styles.followButton}
                        onPress={handleFollowPress}
                    >
                        <Text style={isFollowing ? styles.unfollowButtonText : styles.followButtonText}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
                    </TouchableOpacity>
                )
            }
            <UserSplitStatsContainer userData={userData} navigation={navigation} />
            <UserAchievementsList userData={userData}/>
            <UserWorkoutList workouts={userData?.workouts} navigation={navigation} refreshUserData={fetchAndUpdateUserData}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    
    followButton: {
        marginTop: 20,
        borderWidth: 2,
        backgroundColor: '#000',
        paddingVertical: 10,
        marginHorizontal: 20,
        borderRadius: 20,
    },
    unfollowButton: {
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#000',
        paddingVertical: 10,
        marginHorizontal: 20,
        borderRadius: 20,
    },
    followButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    unfollowButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProfileContent;