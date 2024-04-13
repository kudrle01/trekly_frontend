import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Animated,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import CommentsHeader from '../../components/headers/CommentsHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommentRow from '../../components/CommentRow/CommentRow';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';
import { fetchWorkoutComments, postComment } from '../../services/api/comments';
import { showErrorAlert, showInfoAlert } from '../../services/utilities/alertUtils';

const CommentsModal = ({ modalVisible, setModalVisible, workout, navigation }) => {
  const [lastGestureDy, setLastGestureDy] = useState(0);
  const modalHeight = Dimensions.get('window').height * 0.78;
  const translateY = new Animated.Value(0);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let newHeight = lastGestureDy + event.nativeEvent.translationY;
      if (newHeight > modalHeight / 3) {
        setModalVisible(false);
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
      setLastGestureDy(newHeight);
    }
  };

  const handleSubmitComment = async () => {
    // Check if the comment is empty or contains only white spaces
    if (!newComment.trim()) {
        showInfoAlert("Comment cannot be empty.")
        return;
    }

    try {
        await performAuthenticatedOperation(async (accessToken) => {
            const createdComment = await postComment(accessToken, workout._id, newComment);
            setComments(prevComments => [createdComment, ...prevComments]);
            setNewComment('');
            await updateComments();
        });
    } catch (error) {
        console.error("Failed to post comment: ", error);
        showErrorAlert("Comment failed", "Failed to post comment.")
    }
};

  const updateComments = async () => {
    try {
      await performAuthenticatedOperation(async (token) => {
        const comments = await fetchWorkoutComments(token, workout._id);
        setComments(comments);
      });
    } catch (error) {
      console.error("Failed to get workout post comments: ", error);
      navigation.navigate("UserStack");
    }
  };

  useEffect(() => {
    updateComments();
  }, [workout]);


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.modal_outer}>
            <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
              <Animated.View style={[styles.modal_view, { transform: [{ translateY: translateY }] }]}>
                <View style={styles.draggable_indicator} />
                <CommentsHeader />
                <FlatList
                  data={comments}
                  keyExtractor={(item, index) => `comment-${index}`}
                  renderItem={({ item }) => <CommentRow comment={item} navigation={navigation} setModalVisible={setModalVisible} updateComments={updateComments}/>}
                  ListHeaderComponent={<View style={{ flex: 1, marginBottom: 10 }} />}
                />
                <View style={styles.footerContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setNewComment}
                    value={newComment}
                    placeholder="Type your comment..."
                    placeholderTextColor="#95a5a6"
                    multiline={true}
                    clearButtonMode="while-editing"
                    textAlignVertical="top"
                    numberOfLines={4}
                  />
                  <TouchableOpacity onPress={handleSubmitComment} style={styles.submitButton}>
                    <Ionicons name="send" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </PanGestureHandler>
          </View>
        </GestureHandlerRootView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modal_outer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal_view: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: screenHeight * 0.78,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  draggable_indicator: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 12,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 96,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
    color: '#34495e',
    fontSize: 16,
    fontFamily: 'System',
  },
  submitButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 24,
  },
});

export default CommentsModal;
