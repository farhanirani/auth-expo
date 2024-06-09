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

import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { AuthProvider } from "../../context/AuthContext";
import { useAuth } from "../../context/AuthContextProps";
import { Button } from "react-native";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default () => {
  const { authState, onLogout } = useAuth();

  useEffect(() => {
    console.log("authState changed to ", authState);
  }, [authState]);

  if (authState?.authenticated !== true) {
    return <Redirect href="/login" />;
  }
  return <Stack />;
  {
    /* <Stack.Screen
        name="(app)"
        options={{
          headerRight: () => <Button onPress={onLogout} title="Sign out" />,
        }}
      />
    </Stack> */
  }
};
