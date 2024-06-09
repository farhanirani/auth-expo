import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { AuthProvider } from "../context/AuthContext";
import { useAuth } from "../context/AuthContextProps";
import { Button } from "react-native";
import { useEffect } from "react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default () => {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
};

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  useEffect(() => {
    console.log("authState changed to ", authState);
  }, [authState]);

  return (
    <Stack>
      {!authState || authState?.authenticated !== true ? (
        <Stack.Screen name="login" />
      ) : (
        <Stack.Screen
          name="(tabs)"
          options={{
            headerRight: () => <Button onPress={onLogout} title="Sign out" />,
          }}
        />
      )}
    </Stack>
  );
};
