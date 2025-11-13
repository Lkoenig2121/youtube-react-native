import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { formatViews } from "../utils/numbers";
import VideoCard from "../components/videoCard";

const { width } = Dimensions.get("window");

export default function VideoPlayerScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { video, relatedVideos = [] } = route.params || {};
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (!video) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white">No video data available</Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: themeColors.bg }} className="flex-1">
      <SafeAreaView>
        <View className="flex-row justify-between items-center px-4 py-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon.ChevronDown stroke="white" strokeWidth={2} height={28} width={28} />
          </TouchableOpacity>
          <View className="flex-row space-x-4">
            <Icon.Cast stroke="white" strokeWidth={2} height={24} />
            <Icon.MoreVertical stroke="white" strokeWidth={2} height={24} />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Video Player Placeholder */}
        <View
          style={{ width: width, height: width * (9 / 16) }}
          className="bg-black items-center justify-center"
        >
          <Image
            source={video.thumbnail}
            style={{ width: width, height: width * (9 / 16) }}
            resizeMode="cover"
          />
          <View className="absolute">
            <TouchableOpacity className="bg-red-600 rounded-full p-5">
              <Icon.Play stroke="white" fill="white" strokeWidth={2} height={30} width={30} />
            </TouchableOpacity>
          </View>
          <View className="absolute top-2 right-2 bg-black bg-opacity-80 rounded px-2 py-1">
            <Text className="text-white text-xs font-semibold">
              {video.lengthText || video.duration || "0:00"}
            </Text>
          </View>
        </View>

        {/* Video Info */}
        <View className="px-4 mt-3">
          <Text className="text-white text-lg font-semibold leading-6">
            {video.title}
          </Text>
          <Text className="text-zinc-400 text-sm mt-2">
            {formatViews(video.viewCount)} views • {video.publishedText || "Recently"}
          </Text>
        </View>

        {/* Channel Info & Actions */}
        <View className="px-4 mt-4 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => {
              if (video.channelId) {
                navigation.navigate("Profile", {
                  channelId: video.channelId,
                  channelTitle: video.channelTitle,
                  channelThumbnail: video.channelThumbnail || video.avatar,
                  isOwnChannel: false,
                });
              }
            }}
            className="flex-row items-center flex-1"
          >
            <Image
              source={video.channelThumbnail || video.avatar}
              className="h-10 w-10 rounded-full"
            />
            <View className="ml-3 flex-1">
              <Text className="text-white font-semibold">
                {video.channelTitle}
              </Text>
              <Text className="text-zinc-400 text-xs">
                {video.subscriberCount || "256K"} subscribers
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsSubscribed(!isSubscribed)}
            className={`rounded-full px-6 py-2 ${
              isSubscribed ? "bg-zinc-700" : "bg-red-600"
            }`}
          >
            <Text className="text-white font-semibold">
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View className="px-4 mt-4 flex-row justify-around border-t border-b border-zinc-700 py-2">
          <TouchableOpacity
            onPress={() => setIsLiked(!isLiked)}
            className="flex-row items-center space-x-2"
          >
            <Icon.ThumbsUp
              stroke={isLiked ? "#ef4444" : "white"}
              fill={isLiked ? "#ef4444" : "none"}
              strokeWidth={2}
              height={22}
            />
            <Text className={isLiked ? "text-red-500 font-semibold" : "text-white"}>
              {video.likeCount || "Like"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center space-x-2">
            <Icon.ThumbsDown stroke="white" strokeWidth={2} height={22} />
            <Text className="text-white">Dislike</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center space-x-2">
            <Icon.Share2 stroke="white" strokeWidth={2} height={22} />
            <Text className="text-white">Share</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center space-x-2">
            <Icon.Download stroke="white" strokeWidth={2} height={22} />
            <Text className="text-white">Download</Text>
          </TouchableOpacity>
        </View>

        {/* Comments Section Preview */}
        <View className="px-4 mt-4 mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white font-semibold text-base">
              Comments {video.commentCount ? `• ${formatViews(video.commentCount)}` : ""}
            </Text>
            <Icon.ChevronDown stroke="white" strokeWidth={2} height={20} />
          </View>
          <View className="flex-row items-center space-x-3 py-3 border-t border-zinc-700">
            <Image
              source={require("../assets/images/avatar2.png")}
              className="h-8 w-8 rounded-full"
            />
            <Text className="text-zinc-400 flex-1">
              Add a comment...
            </Text>
          </View>
        </View>

        {/* Related Videos */}
        {relatedVideos && relatedVideos.length > 0 && (
          <View className="mt-4">
            <Text className="text-white font-semibold text-lg px-4 mb-3">
              Related Videos
            </Text>
            {relatedVideos.slice(0, 10).map((relatedVideo, index) => (
              <VideoCard key={index} video={relatedVideo} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

