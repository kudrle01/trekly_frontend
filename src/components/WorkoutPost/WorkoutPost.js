import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchUserById } from '../../services/api/auth';
import noProfilePictureIcon from '../../../assets/no_picture/no-profile-picture-icon.jpg';
import useAuthStore from '../../store/authStore';
import { showConfirmationAlert } from '../../services/utilities/alertUtils';
import WorkoutPostSlideShow from '../WorkoutPostSlideShow';
import useRoutineStore from '../../store/routineStore';
import UserInfoRow from '../UserInfoRow';
import CommentsModal from '../../modals/CommentsModal';
import LikesCommentsContainer from '../LikesCommentsContainer';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';
import { deleteWorkout } from '../../services/api/api';
import { formatDistanceToNow } from 'date-fns';
import { reportWorkout } from '../../services/api/reports';

const WorkoutPost = ({ workout, navigation, refreshUserData }) => {
    const currentUser = useAuthStore(state => state.currentUser);
    const [user, setUser] = useState(null);
    const { name, duration, postContent, exercises, imageUrl } = workout;
    const [isDeleting, setIsDeleting] = useState(false);
    const [commentsModalVisible, setCommentsModalVisible] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                await performAuthenticatedOperation(async (accessToken) => {
                    const userData = await fetchUserById(accessToken, workout.user);
                    setUser(userData.data);
                });
            } catch (error) {
                console.error('Failed to get user by id', error);
            }
        };
        fetchUser();
    }, [workout]);

    const handleCreatePressed = () => {
        showConfirmationAlert("Create Routine", "Do you want to make this workout your routine?", () => {
            useRoutineStore.getState().setExercises(exercises);
            useRoutineStore.getState().setName(name);
            navigation.navigate("Routine", { workoutId: workout._id });
        }, () => { });
    };

    const handleDeletePressed = () => {
        showConfirmationAlert("Delete Workout", "Are you sure you want to delete this workout?", deleteCurrentWorkout, () => { });
    };

    const deleteCurrentWorkout = async () => {
        setIsDeleting(true);
        try {
            await performAuthenticatedOperation(async (token) => {
                await deleteWorkout(token, workout._id);
                if (refreshUserData) {
                    refreshUserData();
                }
                navigation.navigate("MainContainer");
            });
        } catch (error) {
            console.error('Failed to delete workout: ', error);
            navigation.navigate("UserStack");
            useAuthStore.getState().logout();
        } finally {
            setIsDeleting(false);
        }
    };

    const handleReportPressed = () => {
        showConfirmationAlert("Report Workout Post", "Are you sure you want to report this workout post?", report, () => { });
    };

    const report = async () => {
        try {
            await performAuthenticatedOperation(async (accessToken) => {
                await reportWorkout(accessToken, workout._id)
            });
          } catch (error) {
            console.error("Report failed: " + error);
            navigation.navigate("UserStack");
            useAuthStore.getState().logout();
          }
    }

    return (
        <View style={styles.container}>
            <View style={styles.main_row}>
                <UserInfoRow user={user} navigation={navigation} />
                {workout.user === currentUser?._id ? (
                    <TouchableOpacity onPress={handleDeletePressed} disabled={isDeleting}>
                        {isDeleting ? (
                            <Ionicons name="hourglass-outline" size={25} /> // Optional: Show a different icon or a loader
                        ) : (
                            <Ionicons name="trash-outline" size={25} color="#ff6b6b" />
                        )}
                    </TouchableOpacity>
                )
                    :
                    <TouchableOpacity onPress={handleReportPressed}>
                        <Ionicons name="flag-outline" size={25} />
                    </TouchableOpacity>
                }
            </View>
            {/* Post Content */}
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.duration_detail}>Duration: {new Date(duration * 1000).toISOString().substr(11, 8)}</Text>
            <WorkoutPostSlideShow imageUrl={imageUrl} exercises={exercises} />
            {/* Likes and Comments Section */}
            <View style={styles.social_container}>
                <LikesCommentsContainer workout={workout} setCommentsModalVisible={setCommentsModalVisible} />
                <TouchableOpacity onPress={handleCreatePressed}>
                    <Ionicons name="duplicate-outline" size={25} />
                </TouchableOpacity>
            </View>
            <View style={styles.post_content}>
                <Text style={styles.justified_content}>
                    <Text style={styles.post_content_username}>{user?.username}</Text>
                    <Text>&nbsp;{postContent}</Text>
                </Text>
            </View>

            <Pressable style={styles.comment_section} onPress={() => setCommentsModalVisible(true)}>
                <Image source={currentUser?.profilePhotoUrl ? { uri: currentUser?.profilePhotoUrl } : noProfilePictureIcon} style={styles.avatar} />
                <Text style={styles.comment_text}>Add a comment...</Text>
            </Pressable>
            {workout.timestamp && <Text style={styles.timestamp}>{formatDistanceToNow(new Date(workout.timestamp), { addSuffix: true })}</Text>}
            <CommentsModal modalVisible={commentsModalVisible} setModalVisible={setCommentsModalVisible} workout={workout} navigation={navigation} />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 20,
    },
    main_row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
    },

    user_info: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontWeight: 'bold',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    duration_detail: {
        fontSize: 20,
        paddingVertical: 10,
    },
    // Add other styles as needed
    social_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
    },

    likes_comments: {
        flexDirection: 'row',
        gap: 20,
    },

    post_content: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 5,
    },
    post_content_username: {
        fontWeight: 'bold',
    },

    justified_content: {
        textAlign: 'justify',
    },

    like_button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    comment_button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    social_text: {
        marginLeft: 5,
        fontSize: 14,
    },
    comment_section: {
        paddingTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 20,
        height: 20,
        borderRadius: 20,
        marginRight: 5,
    },
    comment_text: {
        color: '#a1a7aa',
    },
    disabled_button: {
        opacity: 0.5,
    },
    timestamp: {
        marginTop: 16,
        fontSize: 12,
        color: '#95a5a6',
    },
});

export default WorkoutPost;
