import { View, ScrollView, Text } from "react-native";
import { useRoute } from "@react-navigation/native"
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";

interface RoutePrams {
  date: string
}

export function Habit() {

  const route = useRoute()
  const { date } = route.params as RoutePrams

  const parsedDate = dayjs(date)
  const weekDay = parsedDate.format("dddd") //day of week in pt-BR, because of the lib/dayjs.ts file I imported at App.tsx
  const dayAndMonth = parsedDate.format("DD/MM")

  return (
    <View className="flex-1 bg-background px-8 pt-16">

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >

        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {weekDay}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={1}/>

        <View className="mt-6">
          <Checkbox 
            title="Beber 2L de água"
            checked={true}
          />

          <Checkbox 
            title="Caminhar"
            checked={false}
          />
        </View>

      </ScrollView>

    </View>
  )
}