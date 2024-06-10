// import { Redirect, Stack } from "expo-router";

// import { useSession } from "@/context/ctx";
// import { Text } from "@/components/Themed";

// export default function AppLayout() {
//   const { session, isLoading } = useSession();

//   // You can keep the splash screen open, or render a loading screen like we do here.
//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   if (!session) {
//     return <Redirect href="/sign-in" />;
//   }

//   return <Stack />;
// }

import { Redirect, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { useAuth } from "../../context/AuthContextProps";
import { useEffect } from "react";
import { Text } from "@/components/Themed";
import { Button } from "react-native";

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
    return <Text>Loading... </Text>; // Show nothing or a loading spinner until the auth state is determined
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
