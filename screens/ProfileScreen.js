import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const goToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={{ backgroundColor: themeColors.bg }} className="flex-1">
      <SafeAreaView className="flex-row justify-between mx-4">
        <TouchableOpacity onPress={goToHome}>
          <View className="flex-row items-center space-x-1">
            <Image
              source={require("../assets/icons/youtubeIcon.png")}
              className="h-7 w-10"
            />
            <Text className="text-white font-semibold text-xl tracking-tighter">
              YouTube
            </Text>
          </View>
        </TouchableOpacity>
        <View className="flex-row items-center space-x-3">
          <Icon.Cast stroke="white" strokeWidth={1.2} height="22" />
          <Icon.Bell stroke="white" strokeWidth={1.2} height="22" />
          <Icon.Search stroke="white" strokeWidth={1.2} height="22" />
          <Image
            source={require("../assets/images/avatar.jpg")}
            className="h-7 w-7 rounded-full"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});
