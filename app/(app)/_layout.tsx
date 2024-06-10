import { Redirect, Stack, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator, View, StyleSheet, Button } from "react-native";

import { useAuth } from "../../context/AuthContextProps";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default () => {
  const { authState, onLogout } = useAuth();

  useEffect(() => {
    console.log("authState changed to ", authState);
    if (authState?.authenticated !== null) {
      SplashScreen.hideAsync();
    }
  }, [authState]);

  if (authState?.authenticated === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (authState?.authenticated !== true) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerRight: () => <Button onPress={onLogout} title="Sign out" />,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
