import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import UserInfoRow from '../UserInfoRow';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAuthStore from '../../store/authStore';
import { deleteComment } from '../../services/api/comments';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';
import { showConfirmationAlert } from '../../services/utilities/alertUtils';
import { formatDistanceToNow } from 'date-fns';

const CommentRow = ({ comment, navigation, setModalVisible, updateComments }) => {
    const currentUser = useAuthStore(state => state.currentUser);
    const [isDeleting, setIsDeleting] = useState(false);
    const [iconName, setIconName] = useState("trash-outline");

    const deleteCurrentComment = async () => {
        const commentId = comment._id;
        setIsDeleting(true);
        setIconName("hourglass-outline");
        try {
            await performAuthenticatedOperation(async (token) => {
                await deleteComment(token, commentId);
                await updateComments();
                setIsDeleting(false);
                setIconName("trash-outline");
            });
        } catch (error) {
            console.error('Failed to delete comment: ', error);
            navigation.navigate("UserStack");
            useAuthStore.getState().logout();
            setModalVisible(false);
            setIsDeleting(false);
            setIconName("trash-outline");
        }
    };

    const handleDeletePressed = () => {
        showConfirmationAlert("Delete Comment", "Are you sure you want to delete this comment?", deleteCurrentComment, () => { });
    };

    return (
        <View style={styles.commentItem}>
            <View style={styles.mainRow}>
                <UserInfoRow user={comment.user} navigation={navigation} setModalVisible={setModalVisible} />
                <View>
                    {comment.user._id === currentUser?._id && (
                        <TouchableOpacity onPress={handleDeletePressed} style={styles.deleteIcon} activeOpacity={0.7} disabled={isDeleting}>
                            <Ionicons name={iconName} size={20} color={isDeleting ? "#95a5a6" : "#ff6b6b"} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <Text style={styles.commentText}>{comment.body}</Text>
            <Text style={styles.timestamp}>{formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    commentItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingHorizontal: 10,
    },
    mainRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timestamp: {
        marginTop: 16,
        fontSize: 12,
        color: '#95a5a6',
    },
    deleteIcon: {
        marginTop: 4,
        padding: 8,
    },
    commentText: {
        fontSize: 16,
        color: '#34495e',
        marginTop: 8,
        paddingLeft: 50,
        lineHeight: 20,
    },
});

export default CommentRow;
