import { useEffect } from "react";
import { View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

interface ProgressBarProps {
  progress: number    //0-100
}

export function ProgressBar({ progress = 0 }: ProgressBarProps) {
  
  const sharedProgress = useSharedValue(progress)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`
    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(progress)
  }, [progress])

  return (
    <View className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <Animated.View 
        className="h-3 rounded-xl bg-violet-600"
        style={animatedStyle} 
      />
    </View>
  )
}