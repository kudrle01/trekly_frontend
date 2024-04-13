import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, ActivityIndicator, Text, RefreshControl } from "react-native";

import NotificationItem from "../../components/NotificationItem";
import { fetchNotifications } from "../../services/api/notifications";
import useAuthStore from "../../store/authStore";
import performAuthenticatedOperation from "../../services/utilities/authenticatedRequest";
import NotificationsHeader from "../../components/headers/NotificationsHeader";

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false); // State to manage refresh status

  const fetchUserNotifications = async (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true); // Activate refreshing state if triggered by a pull-to-refresh
    else setIsLoading(true);

    try {
      await performAuthenticatedOperation(async (accessToken) => {
        const fetchedNotifications = await fetchNotifications(accessToken);
        setNotifications(fetchedNotifications);
      });
    } catch (error) {
      console.error("Fetching notifications failed: " + error);
      navigation.navigate("UserStack");
      useAuthStore.getState().logout();
    } finally {
      if (isRefresh) setIsRefreshing(false); // Deactivate refreshing state after fetching
      else setIsLoading(false);
    }
  };

  // Handler for pull-to-refresh action
  const onRefresh = () => {
    fetchUserNotifications(true);
  };

  useEffect(() => {
    fetchUserNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <NotificationsHeader navigation={navigation} />
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : notifications.length === 0 ? (
        <View style={styles.noNotificationsContainer}>
          <Text style={styles.noNotificationsText}>No notifications</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <NotificationItem notification={item} navigation={navigation} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noNotificationsText: {
    fontSize: 16,
    color: "#666",
  },
});

export default NotificationsScreen;
