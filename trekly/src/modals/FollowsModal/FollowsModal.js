import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Dimensions, Animated, FlatList, KeyboardAvoidingView, Platform, Text, ActivityIndicator } from 'react-native';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import UserInfoRow from '../../components/UserInfoRow';
import { fetchFollowsByUserId } from '../../services/api/follows';
import performAuthenticatedOperation from '../../services/utilities/authenticatedRequest';
import useAuthStore from '../../store/authStore';

const FollowsModal = ({ modalVisible, setModalVisible, userId, listType, navigation, refreshUserData }) => {
    const [lastGestureDy, setLastGestureDy] = useState(0);
    const modalHeight = Dimensions.get('window').height * 0.78;
    const translateY = new Animated.Value(0);
    const [loading, setLoading] = useState(false);
    const [listToShow, setListToShow] = useState([]);
    const [error, setError] = useState('');
    const currentUser = useAuthStore(state => state.currentUser);

    useEffect(() => {
        const loadData = async () => {
            if (!userId) return;

            setLoading(true);
            try {
                await performAuthenticatedOperation(async (accessToken) => {
                    const data = await fetchFollowsByUserId(accessToken, userId);
                    if (listType === 'followers') {
                        setListToShow(data.followers);
                    } else if (listType === 'following') {
                        setListToShow(data.following);
                    }
                });
            } catch (err) {
                setError('Failed to fetch data:' + err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [userId, listType, refreshUserData, currentUser.followers, currentUser.following]);

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

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <GestureHandlerRootView style={styles.modal_outer}>
                    <PanGestureHandler
                        onGestureEvent={onGestureEvent}
                        onHandlerStateChange={onHandlerStateChange}
                    >
                        <Animated.View
                            style={[
                                styles.modal_view,
                                {
                                    transform: [{ translateY: translateY }],
                                },
                            ]}
                        >
                            <View style={styles.draggable_indicator} />
                            <View style={styles.modalContent}>
                                {loading ? (
                                    <ActivityIndicator size="large" color="#000" />
                                ) : error ? (
                                    <Text style={styles.error}>{error}</Text>
                                ) : (
                                    <>
                                        <FlatList
                                            style={styles.list}
                                            data={listToShow}
                                            keyExtractor={(item) => item._id}
                                            renderItem={({ item }) => <View style={{paddingVertical: 10,}}><UserInfoRow user={item} navigation={navigation} setModalVisible={setModalVisible}/></View>}
                                            ListHeaderComponent={<Text style={styles.header}>{listType}</Text>}
                                        />
                                    </>
                                )}
                            </View>
                        </Animated.View>
                    </PanGestureHandler>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modal_view: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: screenHeight * 0.78,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    draggable_indicator: {
        width: 40,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: '#ccc',
        alignSelf: 'center',
    },
    modalContent: {
        flex: 1,
        padding: 10,
    },
    list: {
        flex: 1,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    error: {
        color: 'red',
        fontSize: 16,
    },
});

export default FollowsModal;
