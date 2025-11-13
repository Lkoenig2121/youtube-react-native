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
import { videos as localVideos } from "../constants";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import ProfileMenu from "../components/profileMenu";

export default function ProfileScreen({ route }) {
  const [activeButton, setActiveButton] = useState("Videos");
  const [videos, setVideos] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Get parameters from navigation
  const { 
    channelId = null, 
    channelTitle = "Lukas Koenig", 
    channelThumbnail = null,
    isOwnChannel = true 
  } = route?.params || {};

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetchTrendingVideos();
    console.log('Profile - Fetched videos count:', data?.length);
    
    if (data && data.length > 0) {
      setVideos(data);
    } else {
      // Use local videos as fallback
      console.log('Profile - Using local videos as fallback');
      setVideos(localVideos);
    }
  };

  const navigation = useNavigation();
  const goToHome = () => {
    navigation.navigate("Home");
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const profileTabs = ["Videos", "Shorts", "Playlists", "About"];

  return (
    <View style={{ backgroundColor: themeColors.bg }} className="flex-1">
      <ProfileMenu
        visible={showProfileMenu}
        onClose={() => setShowProfileMenu(false)}
      />
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
          <TouchableOpacity onPress={toggleProfileMenu}>
            <Image
              source={require("../assets/images/avatar.jpg")}
              className="h-7 w-7 rounded-full"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      
      {/* Channel Header */}
      <View className="mx-4 mt-4">
        <View className="flex-row space-x-4 items-center">
          <Image
            source={
              channelThumbnail && !isOwnChannel 
                ? channelThumbnail 
                : require("../assets/images/avatar.jpg")
            }
            className="h-24 w-24 rounded-full"
          />
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">{channelTitle}</Text>
            <Text className="text-zinc-400 text-sm mt-1">
              @{channelTitle.replace(/\s+/g, '')}
            </Text>
            <Text className="text-zinc-400 text-sm mt-1">
              256K subscribers • 89 videos
            </Text>
          </View>
        </View>
        
        {/* Subscribe/Edit Profile Button */}
        <TouchableOpacity 
          className="mt-4 bg-red-600 rounded-full py-2 px-6 items-center"
        >
          <Text className="text-white font-semibold text-base">
            {isOwnChannel ? "Edit Profile" : "Subscribe"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View className="mt-6 border-b border-zinc-700">
        <ScrollView
          className="px-4"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {profileTabs.map((tab, index) => {
            let isActive = tab === activeButton;
            return (
              <TouchableOpacity
                onPress={() => setActiveButton(tab)}
                key={index}
                className="mr-6 pb-3"
                style={{
                  borderBottomWidth: isActive ? 2 : 0,
                  borderBottomColor: isActive ? "white" : "transparent",
                }}
              >
                <Text className={isActive ? "text-white font-semibold" : "text-zinc-400"}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Content based on active tab */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {activeButton === "Videos" && (
          <View className="px-4 mt-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white font-semibold text-base">
                {isOwnChannel ? "Your Videos" : "Uploads"}
              </Text>
              <TouchableOpacity>
                <Icon.Filter stroke="white" strokeWidth={2} height={20} />
              </TouchableOpacity>
            </View>
            
            {/* Video Grid */}
            {videos && videos.length > 0 ? (
              videos.map((video, index) => (
                <TouchableOpacity 
                  key={index} 
                  className="mb-4"
                  onPress={() => navigation.navigate('VideoPlayer', {
                    video: video,
                    relatedVideos: videos
                  })}
                  activeOpacity={0.9}
                >
                  <Image 
                    source={video.thumbnail} 
                    className="w-full h-48 rounded-lg"
                  />
                  <View className="flex-row mt-2">
                    <View className="flex-1">
                      <Text className="text-white font-semibold text-base" numberOfLines={2}>
                        {video.title}
                      </Text>
                      <Text className="text-zinc-400 text-sm mt-1">
                        {video.viewCount ? `${(video.viewCount / 1000).toFixed(0)}K views` : "No views"} • {video.publishedText || "Recently"}
                      </Text>
                    </View>
                    <TouchableOpacity className="ml-2" onPress={(e) => e.stopPropagation()}>
                      <Icon.MoreVertical stroke="white" strokeWidth={2} height={20} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View className="items-center justify-center py-10">
                <Icon.Film stroke="white" strokeWidth={1} height={60} width={60} />
                <Text className="text-zinc-400 text-center mt-4">
                  {isOwnChannel ? "No videos uploaded yet" : "This channel has no videos"}
                </Text>
              </View>
            )}
          </View>
        )}

        {activeButton === "Shorts" && (
          <View className="items-center justify-center py-20">
            <Icon.Film stroke="white" strokeWidth={1} height={60} width={60} />
            <Text className="text-zinc-400 text-center mt-4">
              No shorts available
            </Text>
          </View>
        )}

        {activeButton === "Playlists" && (
          <View className="items-center justify-center py-20">
            <Icon.List stroke="white" strokeWidth={1} height={60} width={60} />
            <Text className="text-zinc-400 text-center mt-4">
              No playlists created
            </Text>
          </View>
        )}

        {activeButton === "About" && (
          <View className="px-4 mt-4">
            <Text className="text-white font-semibold text-lg mb-3">Description</Text>
            <Text className="text-zinc-400 text-base leading-6 mb-6">
              Welcome to my channel! I create content about technology, coding, and more.
            </Text>
            
            <View className="border-t border-zinc-700 pt-4">
              <View className="flex-row items-center mb-3">
                <Icon.Mail stroke="white" strokeWidth={2} height={18} width={18} />
                <Text className="text-zinc-400 text-sm ml-3">
                  For business inquiries: contact@lukaskoenig.com
                </Text>
              </View>
              <View className="flex-row items-center mb-3">
                <Icon.MapPin stroke="white" strokeWidth={2} height={18} width={18} />
                <Text className="text-zinc-400 text-sm ml-3">
                  United States
                </Text>
              </View>
              <View className="flex-row items-center">
                <Icon.Calendar stroke="white" strokeWidth={2} height={18} width={18} />
                <Text className="text-zinc-400 text-sm ml-3">
                  Joined Mar 15, 2020
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
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
