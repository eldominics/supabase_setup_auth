import { UseGlobalUserContext } from "@/context/GlobalUserProvider";
import { supabase } from "@/lib/supabase";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SignIn = () => {
  const { user, session } = UseGlobalUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  if (user && session) {
    router.replace("./(tabs)");
  }
  return (
    <SafeAreaView className="flex-1">
      <Text className="text-white"> Welcome Back!</Text>

      <View className="my-6">
        <Text className="text-white"> Sign Into Your Account</Text>
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
        onPress={async () => {
          setLoading(true);

          const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
            options: {}, // Prevent auto session creation
          });

          if (error) {
            console.log(error);
          } else {
            console.log("Signed In");
          }
          setLoading(false);
        }}
        className="bg-orange-400 rounded-2xl mt-6 w-[90%] self-center p-4"
      >
        <Text className="text-2xl">{loading ? "Signing in" : "Sign In"}</Text>
      </Pressable>

      <Pressable
        onPress={() => router.replace("/(auth)/sign-up")}
        className=" rounded-2xl mt-6 w-[90%] self-center"
      >
        <View className="h-14 items-center justify-center ">
          <Text className="text-white"> Sign Up</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default SignIn;
