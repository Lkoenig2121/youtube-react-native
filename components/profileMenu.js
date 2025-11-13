import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Pressable,
} from "react-native";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";

export default function ProfileMenu({ visible, onClose }) {
  const navigation = useNavigation();

  const menuItems = [
    {
      icon: "User",
      label: "View Profile",
      action: () => {
        navigation.navigate("Profile", {
          isOwnChannel: true,
        });
        onClose();
      },
    },
    {
      icon: "Settings",
      label: "Settings",
      action: () => {
        onClose();
        // Add settings navigation here if needed
      },
    },
    {
      icon: "UserPlus",
      label: "Switch Account",
      action: () => {
        onClose();
      },
    },
    {
      icon: "LogOut",
      label: "Sign Out",
      action: () => {
        onClose();
      },
    },
  ];

  const renderIcon = (iconName) => {
    const IconComponent = Icon[iconName];
    return IconComponent ? (
      <IconComponent stroke="white" strokeWidth={2} height={20} width={20} />
    ) : null;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onPress={onClose}
      >
        <View className="absolute top-16 right-4 bg-zinc-800 rounded-lg shadow-lg overflow-hidden w-64">
          {/* Profile Header */}
          <View className="p-4 bg-zinc-900 border-b border-zinc-700">
            <View className="flex-row items-center space-x-3">
              <Image
                source={require("../assets/images/avatar.jpg")}
                className="h-12 w-12 rounded-full"
              />
              <View className="flex-1">
                <Text className="text-white font-semibold text-base">
                  Lukas Koenig
                </Text>
                <Text className="text-zinc-400 text-sm">
                  @LukasKoenig
                </Text>
              </View>
            </View>
          </View>

          {/* Menu Items */}
          <View className="py-2">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.action}
                className="flex-row items-center px-4 py-3 active:bg-zinc-700"
              >
                <View className="w-6 items-center">
                  {renderIcon(item.icon)}
                </View>
                <Text className="text-white text-base ml-3">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

