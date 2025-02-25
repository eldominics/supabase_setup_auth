import { supabase } from "@/lib/supabase";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setLoading(false);
      console.log("error-->N", error);
      return Alert.alert(error.message);
    }
    if (!session) {
      setLoading(false);
      Alert.alert("go to Token confirmation page");
      return router.replace(`/${email}`);
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <Text> Welcome Back!</Text>

      <View className="my-6">
        <Text> Sign Into Your Account</Text>
      </View>
      <View className="bg-white rounded-lg m-4 shadow-lg">
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter email"
          placeholderTextColor={"gray"}
          className="p-6"
        />
      </View>
      <View className="bg-white rounded-lg m-4 shadow-lg flex-row justify-center items-center">
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          className="flex flex-1 p-6"
          secureTextEntry={isSecure}
          placeholderTextColor={"gray"}
        />
        {isSecure ? (
          <TouchableOpacity onPress={() => setIsSecure(false)}>
            <Octicons name="eye-closed" size={20} color="grey" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsSecure(true)}>
            <Octicons name="eye" size={20} color="grey" />
          </TouchableOpacity>
        )}
      </View>

      <Pressable
        disabled={loading}
        onPress={() => signUpWithEmail()}
        className="bg-orange-400 rounded-2xl mt-6 w-[90%] self-center"
      >
        <View className="h-14 items-center justify-center ">
          <Text className="text-2xl">{loading ? "Signing Up" : "Sign Up"}</Text>
        </View>
      </Pressable>

      <Pressable
        onPress={() => router.replace("/(auth)/sign-in")}
        className=" rounded-2xl mt-6 w-[90%] self-center"
      >
        <View className="h-14 items-center justify-center ">
          <Text className="text-white"> Sign In</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default SignUp;
