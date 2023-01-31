import { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native"
import dayjs from "dayjs"
import { Day, DAY_SIZE } from "../components/Day";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { generateDaysFromStartOfYear } from "../../utils/generate-dates-from-start-of-year";
import { api } from "../lib/axios";

//header
const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

//offset
const yearOffset = dayjs().startOf("year").day()  //not every year starts on a Sunday

//past dates
const summaryDates = generateDaysFromStartOfYear()

//future dates
const amountOfTotalDays = 20 * 7
const amountOfPlaceholderDays = amountOfTotalDays - summaryDates.length - yearOffset

// interface DayResponse {    //interface X {...}   usage: useState<SummaryResponse[]>([])
type SummaryResponse = {      //type X = {...}[]    usage: useState<SummaryResponse>([])
  id: string
  date: string
  completed: number
  available: number
}[]

export function Home() {

  const { navigate } = useNavigation()
  const [ isLoading, setIsLoading ] = useState(true)
  const [ summary, setSummary ] = useState<SummaryResponse>([])

  async function getData() {
    try {
      setIsLoading(true)

      const response = await api.get("/summary")
      console.log(response.data)
      setSummary(response.data)

      // const response = fetch("http://localhost:4000/summary")
      // console.log(response)
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

  if (isLoading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      
      <Header />
      
      {/* Week day letter */}
      <View className="flex-row mt-2">
        {weekDays.map((day, i) => {
          return (
            <Text
              key={i}
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{width: DAY_SIZE, height: DAY_SIZE}}
            >
              {day}
            </Text>
          )
        })}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >

        {/* Grid of squares */}
        <View className="flex-row flex-wrap">

          {/* Year offset */}
          {
            yearOffset > 0 &&
            Array.from({length: yearOffset}).map((_, i) => {
              return (
                <View 
                  key={i} 
                  className="m-1"
                  style={{width: DAY_SIZE, height: DAY_SIZE}}
                />
              )
            })
          }

          {/* Past days */}
          {summaryDates.map(date => {

            const dayInSummary = summary.find(day => {
              return dayjs(date).isSame(day.date, "day")  //"day": check year, month, up until day (no hour / min)
            })

            return (
              <Day 
                key={date.toString()}
                date={date}
                onPress={() => navigate("habit", {date: date.toISOString()})}
                //Random:
                // completed={Math.round(Math.random() * 5)}
                // available={5}
                //From the API:
                completed={dayInSummary?.completed || 0}
                available={dayInSummary?.available || 0}
              />
            )
          })}

          {/* Future days */}
          {
            amountOfPlaceholderDays > 0 &&
            Array.from({length: amountOfPlaceholderDays}).map((_, i) => {
              return (
                <View 
                  key={i} 
                  className="bg-zinc-900 border-zinc-800 border-2 rounded-lg m-1 opacity-50"
                  style={{width: DAY_SIZE, height: DAY_SIZE}}
                />
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}