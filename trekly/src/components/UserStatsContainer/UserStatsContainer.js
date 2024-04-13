// UserStatsContainer.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import FollowsModal from '../../modals/FollowsModal';

const UserStatsContainer = ({ userData, navigation }) => {
    const [followsModalVisible, setFollowsModalVisible] = useState(false);
    const [modalListType, setModalListType] = useState('followers');

    const showFollowsModal = (listType) => {
        setModalListType(listType);
        setFollowsModalVisible(true);
    };

    return (
        <View style={styles.stats_container}>
            <View style={styles.stat_item}>
                <Text style={styles.stat_label}>Workouts</Text>
                <Text style={styles.stat_value}>{userData?.workouts?.length}</Text>
            </View>
            <Pressable style={styles.stat_item} onPress={() => showFollowsModal('followers')}>
                <Text style={styles.stat_label}>Followers</Text>
                <Text style={styles.stat_value}>{userData?.followers?.length}</Text>
            </Pressable>
            <Pressable style={styles.stat_item} onPress={() => showFollowsModal('following')}>
                <Text style={styles.stat_label}>Following</Text>
                <Text style={styles.stat_value}>{userData?.following?.length}</Text>
            </Pressable>
            <FollowsModal
                modalVisible={followsModalVisible}
                setModalVisible={setFollowsModalVisible}
                userId={userData?._id}
                listType={modalListType}
                navigation={navigation}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    stats_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    stat_item: {
        alignItems: 'center',
    },
    stat_value: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5
    },
    stat_label: {
        fontSize: 14,
        color: '#a1a7aa',
    },
});

export default UserStatsContainer;