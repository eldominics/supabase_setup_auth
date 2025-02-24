import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Pressable,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import SignUp from "../(auth)/sign-up";
import { UseGlobalUserContext } from "@/context/GlobalUserProvider";

export default function HomeScreen() {
  const { user, session } = UseGlobalUserContext();
  if (!session || !user) {
    return <SignUp></SignUp>;
  }

  console.log(session, user);
  return (
    <View className="flex flex-col justify-center items-center h-full ">
      <Text className={`text-white text-4xl  text-center  px-10 `}>
        Feel At Home
      </Text>
      <View>
        <Text className="text-center  px-10 mt-10 text-6xl text-white font-extrabold">
          {" "}
          Supabase SMTP Email Setup
        </Text>
      </View>
    </View>
  );
}
