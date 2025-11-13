import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { categories, shortVideos, videos as localVideos } from "../constants";
import ShortVideoCard from "../components/shortVideoCard";
import VideoCard from "../components/videoCard";
import { fetchTrendingVideos } from "../api/youtube";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import ProfileMenu from "../components/profileMenu";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [videos, setVideos] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetchTrendingVideos();
    console.log('Fetched videos count:', data?.length);
    
    if (data && data.length > 0) {
      console.log('First video:', data[0]);
      setVideos(data);
    } else {
      // Use local videos as fallback
      console.log('Using local videos as fallback');
      setVideos(localVideos);
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <View style={{ backgroundColor: themeColors.bg }} className="flex-1">
      <StatusBar style="light" />
      <ProfileMenu
        visible={showProfileMenu}
        onClose={() => setShowProfileMenu(false)}
      />
      <SafeAreaView className="flex-row justify-between mx-4">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../assets/icons/youtubeIcon.png")}
            className="h-7 w-10"
          />
          <Text className="text-white font-semibold text-xl tracking-tighter">
            YouTube
          </Text>
        </View>
        <View className="flex-row items-center space-x-3">
          <Icon.Cast stroke="white" strokeWidth={1.2} height="22" />
          <Icon.Bell stroke="white" strokeWidth={1.2} height="22" />
          <Icon.Search stroke="white" strokeWidth={1.2} height="22" />
          <TouchableOpacity onPress={toggleProfileMenu}>
            <Image
              source={require("../assets/images/avatar.jpg")}
              className="h-7 w-7 rounded-full"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView className="flex-1 -mt-6" showsVerticalScrollIndicator={false}>
        {/* categories */}
        <View className="py-2 pb-3">
          <ScrollView
            className="px-4"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category, index) => {
              let isActive = category == activeCategory;
              let textClass = isActive ? "text-black" : "text-white";
              return (
                <TouchableOpacity
                  onPress={() => setActiveCategory(category)}
                  key={index}
                  style={{
                    backgroundColor: isActive
                      ? "white"
                      : "rgba(255,255,255,0.1)",
                  }}
                  className="rounded-md p-1 px-3 mr-2"
                >
                  <Text className={textClass}>{category}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* suggested Video */}
        {videos && videos[4] && <VideoCard video={videos[4]} relatedVideos={videos} />}

        {/* short videos */}
        <View className="mt-2 py-5 space-y-3 border-t-zinc-700 border-b-zinc-700 border-4 border-l-0 border-r-0">
          <View className="mx-4 flex-row items-center space-x-2">
            <Image
              source={require("../assets/icons/shortsIcon.png")}
              className="h-6 w-5"
            />
            <Text className="text-white font-semibold text-lg tracking-tighter">
              Shorts
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            {shortVideos.map((item, index) => (
              <ShortVideoCard item={item} key={index} />
            ))}
          </ScrollView>
        </View>

        {/* videos */}
        <View>
          {videos && videos.length > 0 ? (
            videos.map((video, index) => (
              <VideoCard video={video} relatedVideos={videos} key={index} />
            ))
          ) : (
            <View className="items-center justify-center py-10">
              <Text className="text-zinc-400 text-center">
                Loading videos...
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
