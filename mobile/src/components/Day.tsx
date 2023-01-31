import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import clsx from "clsx"

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = 32  //each side

export const MARGIN_BETWEEN_DAYS = 8
export const DAY_SIZE = (Dimensions.get("screen").width - 2 * SCREEN_HORIZONTAL_PADDING - 7 * MARGIN_BETWEEN_DAYS) / WEEK_DAYS

interface DayProps extends TouchableOpacityProps {
  date: Date
  available: number
  completed: number
}

export function Day({date, available, completed, ...rest}: DayProps) {

  const percentualCompleted = 
    available > 0
    ? completed / available * 100
    : 0

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      className={clsx("border-2 rounded-lg m-1", {
        "border-zinc-800 bg-zinc-900": percentualCompleted == 0,
        "border-violet-800 bg-violet-900": percentualCompleted > 0 && percentualCompleted < 20,
        "border-violet-700 bg-violet-800": percentualCompleted >= 20 && percentualCompleted < 40,
        "border-violet-600 bg-violet-700": percentualCompleted >= 40 && percentualCompleted < 60,
        "border-violet-500 bg-violet-600": percentualCompleted >= 60 && percentualCompleted < 80,
        "border-violet-400 bg-violet-500": percentualCompleted >= 80
      })} 
      style={{width: DAY_SIZE, height: DAY_SIZE}}
      {...rest}
    />
  )
}