import { AuthProvider } from "@/context/AuthContext";
import { Slot, Stack } from "expo-router";

export default function Root() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}
