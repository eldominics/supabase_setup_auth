import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";

import { useState } from "react";

import {} from "@react-navigation/native";

import { Redirect, router, useLocalSearchParams } from "expo-router";
import { UseGlobalUserContext } from "@/context/GlobalUserProvider";
import { supabase } from "@/lib/supabase";
import { Text } from "react-native";

function TokenConfirmation() {
  const { tokenConfirmation } = useLocalSearchParams<{
    tokenConfirmation: string;
  }>();

  console.log("tokCon-->", tokenConfirmation);
  const { session } = UseGlobalUserContext();

  if (session) return <Redirect href="/(tabs)" />;

  const [OTP, setOTP] = useState("");

  const [loading, setLoading] = useState(false);

  async function signInWithOTP() {
    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email: tokenConfirmation,
      token: OTP,
      type: "signup",
    });

    if (error) {
      Alert.alert(error.message);
    }
    console.log("session--,.", session);

    setLoading(false);
  }
  return (
    <SafeAreaView className="flex-1 ">
      <Text className="text-white"> You are Here</Text>

      <View style={{ marginVertical: "5%" }}>
        <Text className="text-white"> Please Use OTP to Sign Up</Text>
      </View>
      <View className="bg-white rounded-lg m-4 shadow-lg">
        <TextInput
          value={OTP}
          onChangeText={(text) => setOTP(text)}
          placeholder="Enter OTP"
          placeholderTextColor={"gray"}
          className="p-6"
        />
      </View>

      <Text className="text-white"> Provide OTP</Text>
      <Pressable
        onPress={() => signInWithOTP()}
        disabled={loading}
        className="bg-orange-400 rounded-2xl mt-6 w-[90%] self-center"
      >
        <View className="h-14 items-center justify-center ">
          <Text className="text-2xl">
            {loading ? "Confirming..." : "Confirm"}
          </Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

export default TokenConfirmation;
