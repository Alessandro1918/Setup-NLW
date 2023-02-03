import { useState, useEffect } from "react"
import { View, ScrollView, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native"
import dayjs from "dayjs";
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { EmptyHabitList } from "../components/EmptyHabitList";
import clsx from "clsx";

interface RoutePrams {
  date: string
}

interface DayHabitsApiResponse {
  possibleHabits: {
    id: string
    title: string
    created_at: string
  }[]
  completedHabits: string[]
}

export function Habit() {

  const route = useRoute()
  const { date } = route.params as RoutePrams

  const parsedDate = dayjs(date)
  const weekDay = parsedDate.format("dddd") //day of week in pt-BR, because of the lib/dayjs.ts file I imported at App.tsx
  const dayAndMonth = parsedDate.format("DD/MM")
  const isDateNotToday = parsedDate         //can only check today's boxes
    .endOf("day")                           //last minute of day x
    .isBefore(new Date())                   //now

  const [ isLoading, setIsLoading ] = useState(true)
  const [ dayHabits, setDayHabits ] = useState<DayHabitsApiResponse>()

  const percentualCompleted = 
    dayHabits
    ? dayHabits.completedHabits.length / dayHabits.possibleHabits.length * 100
    : 0

  async function getData() {
    try {
      setIsLoading(true)

      const response = await api.get("/day", {params: { date }})
      console.log(JSON.stringify(response.data, null, 1))
      setDayHabits(response.data)

    } catch (error) {
      Alert.alert("Ops!", "Não foi possível carregar as informações")
      console.log(JSON.stringify(error, null, 1))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  async function handleToggleHabit(habitId: string ) {

    try {
      await api.patch(`/habits/${habitId}/toggle`)

      const isHabitAlreadyCompleted = dayHabits?.completedHabits.includes(habitId)
      let completedHabits: string[] = []
      if (isHabitAlreadyCompleted) {
        //remove
        completedHabits = dayHabits!.completedHabits.filter(id => id !== habitId)
      } else {
        //add
        completedHabits = [...dayHabits!.completedHabits, habitId]
      }

      setDayHabits({
        possibleHabits: dayHabits!.possibleHabits,
        completedHabits: completedHabits
      })
    } catch (error) {
      Alert.alert("Ops!", "Não foi possível editar as informações")
      console.log(JSON.stringify(error, null, 1))
    }
  }

  if (isLoading) {
    return <Loading />
  }

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

        <ProgressBar progress={percentualCompleted}/>

        <View className={clsx("mt-6", {
          "opacity-50": isDateNotToday
        })}>
          {
            dayHabits!.possibleHabits.length > 0
            ?
            dayHabits?.possibleHabits.map(habit => {
              return (
                <Checkbox 
                  key={habit.id}
                  title={habit.title}
                  checked={dayHabits.completedHabits.includes(habit.id)}
                  onPress={() => handleToggleHabit(habit.id)}
                  disabled={isDateNotToday}
                />
              )
            })
            :
            <EmptyHabitList />
          }
        </View>

        {
          isDateNotToday &&
          <Text className="text-white mt-10 text-center">
            Você não pode editar hábitos de uma data passada
          </Text>
        }

      </ScrollView>

    </View>
  )
}