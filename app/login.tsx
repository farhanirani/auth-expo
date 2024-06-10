import { View, Text, TextInput, Button, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContextProps";
import { useRouter } from "expo-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    const res = await onLogin!(email, password);
    console.log("SUCCESS LOGIN", res.data);
    if (res && res.error) {
      alert(res.msg);
    } else {
      router.push("/");
    }
  };

  const handleRegister = async () => {
    const res = await onRegister!(email, password);
    if (res && res.error) {
      alert(res.msg);
    } else {
      handleLogin();
    }
  };

  return (
    <View style={{ flex: 1, gap: 20, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        style={{ width: 200, padding: 8, borderColor: "black", borderRadius: 8, borderWidth: 2 }}
        placeholder="Email"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={{ width: 200, padding: 8, borderColor: "black", borderRadius: 8, borderWidth: 2 }}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text: string) => setPassword(text)}
        value={password}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.text}>Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    width: 120,
    borderRadius: 4,
    backgroundColor: "black",
  },
  text: {
    color: "white",
  },
});
