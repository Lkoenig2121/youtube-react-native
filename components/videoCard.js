import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { formatViews } from '../utils/numbers';
import { useNavigation } from '@react-navigation/native';

export default function VideoCard({video}) {
  const navigation = useNavigation();

  const goToChannel = () => {
    if (video && video.channelId) {
      navigation.navigate('Profile', {
        channelId: video.channelId,
        channelTitle: video.channelTitle,
        channelThumbnail: video.channelThumbnail,
        isOwnChannel: false
      });
    }
  };

  return (
    <View>
      <Image source={video && video.thumbnail} className="h-52 w-full"/>
      <View className="flex items-end mr-2 mb-5 -mt-6">
        <View className="bg-black rounded px-1"> 
            <Text className="text-white font-semibold text-xs">
                {video && video.lengthText}
            </Text>
        </View>
        
      </View>
      <View 
        className="flex-row justify-between items-center pb-5 space-x-3 mx-2">
            <TouchableOpacity onPress={goToChannel}>
              <Image source={video && video.channelThumbnail} className="h-9 w-9 rounded-full" />
            </TouchableOpacity>
            <View className="flex-1 space-y-1">
                <Text className="text-white font-semibold">
                    {video && video.title}
                </Text>
                <TouchableOpacity onPress={goToChannel}>
                  <Text className="text-zinc-400 text-xs">
                      {video && video.channelTitle.length>20? video.channelTitle.slice(0,20)+'...': video?.channelTitle} • {formatViews(video?.viewCount)} views • {video?.publishedText}
                  </Text>
                </TouchableOpacity>
            </View>
            <View className="self-start">
                <Icon.MoreVertical stroke="white" strokeWidth={2} height={15} />
            </View>
      </View>
    </View>
  )
}