import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { like, unlike, fetchWorkoutLikes } from '../../services/api/likes';
import { fetchWorkoutComments } from '../../services/api/comments';
import useAuthStore from '../../store/authStore';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest'; // Ensure this import is correct
import * as Haptics from 'expo-haptics';

const LikesCommentsContainer = ({ workout, setCommentsModalVisible }) => {
    const [likesCount, setLikesCount] = useState(workout.likesCount);
    const [commentsCount, setCommentsCount] = useState(workout.commentsCount);
    const currentUser = useAuthStore(state => state.currentUser);
    const [isLiked, setIsLiked] = useState(false);
    const [likeButtonDisabled, setLikeButtonDisabled] = useState(false);

    const updateLikes = async () => {
        try {
            await performAuthenticatedOperation(async (token) => {
                const updatedLikes = await fetchWorkoutLikes(token, workout._id);
                setLikesCount(updatedLikes.length);
                const userLikes = updatedLikes.map(like => like.user_id);
                setIsLiked(userLikes.includes(currentUser?._id));
            });
        } catch (error) {
            console.error("Failed to get workout post likes: ", error);
        }
    };

    const handleLikePress = async () => {
        if (likeButtonDisabled) return;
        
        setLikeButtonDisabled(true);
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        setLikesCount(prev => newIsLiked ? prev + 1 : prev - 1);
        if (newIsLiked) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        try {
            await performAuthenticatedOperation(async (token) => {
                if (newIsLiked) {
                    await like(token, workout._id);
                } else {
                    await unlike(token, workout._id);
                }
            });
        } catch (error) {
            console.error('Failed to like/unlike the workout: ', error);
            setLikesCount(prev => newIsLiked ? prev - 1 : prev + 1);
            setIsLiked(!newIsLiked);
        } finally {
            setTimeout(() => setLikeButtonDisabled(false), 500);
        }
    };

    const updateComments = async () => {
        try {
            await performAuthenticatedOperation(async (token) => {
                const comments = await fetchWorkoutComments(token, workout._id);
                setCommentsCount(comments.length);
            });
        } catch (error) {
            console.error("Failed to get workout post comments: ", error);
        }
    };

    useEffect(() => {
        updateLikes();
        updateComments();
    }, [workout]);


    return (
        <View style={styles.likes_comments}>
            <TouchableOpacity onPress={handleLikePress} style={styles.like_button} disabled={likeButtonDisabled}>
                <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={25} color={isLiked ? 'red' : 'black'} />
                <Text style={styles.social_text}>{likesCount} Likes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.comment_button} onPress={() => setCommentsModalVisible(true)}>
                <Icon name="comment-outline" size={24} color="black" />
                <Text style={styles.social_text}>{commentsCount} Comments</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    likes_comments: {
        flexDirection: 'row',
        gap: 20,
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
});

export default LikesCommentsContainer;