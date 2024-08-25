import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import VideoCard from "../components/profileVideoCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchTrendingVideos } from "../api/youtube";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const [activeButton, setActiveButton] = useState("All");
  settings = ["Switch Account", "Google Account", "Turn on Incognito"];
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetchTrendingVideos();
    setVideos(data);
  };

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
      <View className="flex-row space-x-3">
        <Image
          source={require("../assets/images/avatar.jpg")}
          className="h-20 w-20 rounded-full"
        />

        <View>
          <Text className="text-white text-3xl">Lukas Koenig</Text>
          <Text className="text-stone-400 text-xl">
            @LukasKoenig - View Channel
          </Text>
        </View>
      </View>

      <View className="py-3 pb-3">
        <ScrollView
          className="px-4"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {settings.map((button, index) => {
            let isActive = button == activeButton;
            let textClass = isActive ? "text-black" : "text-white";
            return (
              <TouchableOpacity
                // onPress={() => setActiveButton(button)}
                key={index}
                style={{
                  backgroundColor: isActive ? "white" : "rgba(255,255,255,0.1)",
                }}
                className="rounded-md p-1 px-3 mr-2"
              >
                <Text className={textClass}>{button}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View>
        <Text className="text-white ml-5 mt-5 font-bold text-lg">HISTORY</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4"
        >
          {videos && videos[2] && (
            <View className="mr-4">
              <VideoCard video={videos[2]} />
            </View>
          )}
          {videos && videos[4] && (
            <View className="mr-4">
              <VideoCard video={videos[4]} />
            </View>
          )}
          {videos && videos[6] && (
            <View className="mr-4">
              <VideoCard video={videos[6]} />
            </View>
          )}
        </ScrollView>
      </View>

      <View>
        <TouchableOpacity className="flex-row">
          <Image
            source={require("../assets/images/youtube-image-better.avif")}
            className="h-7 w-7 mt-3 ml-3 rounded-full"
          />
          <Text className="text-white ml-3 mt-5 font-bold">Your Videos</Text>
        </TouchableOpacity>
      </View>

      <View className="border-t-2 mt-5 border-gray-600">
        <TouchableOpacity className="ml-3 mt-3">
          <Text className="text-white mt-3 font-bold">Your movies & TV</Text>
        </TouchableOpacity>
        <TouchableOpacity className="ml-3 mt-3">
          <Text className="text-white mt-3 font-bold">Get Youtube Premium</Text>
        </TouchableOpacity>
        <View className="border-t-2 mt-5 border-gray-600" />
        <TouchableOpacity className="ml-3 mt-3">
          <Text className="text-white mt-3 font-bold">Time Watched</Text>
        </TouchableOpacity>
        <TouchableOpacity className="ml-3 mt-3">
          <Text className="text-white mt-3 font-bold">Help & Feedback</Text>
        </TouchableOpacity>
      </View>
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
