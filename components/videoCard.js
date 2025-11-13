import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { formatViews } from '../utils/numbers';
import { useNavigation } from '@react-navigation/native';

export default function VideoCard({video, relatedVideos}) {
  const navigation = useNavigation();

  const goToChannel = (e) => {
    // Stop propagation to prevent video navigation
    e?.stopPropagation?.();
    if (video && video.channelId) {
      navigation.navigate('Profile', {
        channelId: video.channelId,
        channelTitle: video.channelTitle,
        channelThumbnail: video.channelThumbnail || video.avatar,
        isOwnChannel: false
      });
    }
  };

  const goToVideo = () => {
    if (video) {
      navigation.navigate('VideoPlayer', {
        video: video,
        relatedVideos: relatedVideos || []
      });
    }
  };

  // Handle both API format (lengthText) and local format (duration)
  const videoDuration = video?.lengthText || video?.duration;
  // Handle both API format (channelThumbnail) and local format (avatar)
  const channelAvatar = video?.channelThumbnail || video?.avatar;

  return (
    <View>
      <TouchableOpacity onPress={goToVideo} activeOpacity={0.9}>
        <Image source={video && video.thumbnail} className="h-52 w-full"/>
        <View className="flex items-end mr-2 mb-5 -mt-6">
          <View className="bg-black rounded px-1"> 
              <Text className="text-white font-semibold text-xs">
                  {videoDuration}
              </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View 
        className="flex-row justify-between items-center pb-5 space-x-3 mx-2">
            <TouchableOpacity onPress={goToChannel}>
              <Image source={channelAvatar} className="h-9 w-9 rounded-full" />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToVideo} className="flex-1 space-y-1">
                <Text className="text-white font-semibold">
                    {video && video.title}
                </Text>
                <View>
                  <Text className="text-zinc-400 text-xs">
                      {video && video.channelTitle.length>20? video.channelTitle.slice(0,20)+'...': video?.channelTitle} • {formatViews(video?.viewCount)} views • {video?.publishedText}
                  </Text>
                </View>
            </TouchableOpacity>
            <View className="self-start">
                <Icon.MoreVertical stroke="white" strokeWidth={2} height={15} />
            </View>
      </View>
    </View>
  )
}