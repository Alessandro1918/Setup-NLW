import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = 32  //each side

export const MARGIN_BETWEEN_DAYS = 8
export const DAY_SIZE = (Dimensions.get("screen").width - 2 * SCREEN_HORIZONTAL_PADDING - 7 * MARGIN_BETWEEN_DAYS) / WEEK_DAYS

interface DayProps extends TouchableOpacityProps {}

export function Day({...rest}: DayProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      className="bg-zinc-900 border-zinc-800  border-2 rounded-lg m-1"
      style={{width: DAY_SIZE, height: DAY_SIZE}}
      {...rest}
    />
  )
}