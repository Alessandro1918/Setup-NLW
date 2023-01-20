import { View, Text, ScrollView } from "react-native";
import dayjs from "dayjs"

import { Day, DAY_SIZE } from "../components/Day";
import { Header } from "../components/Header";
import { generateDaysFromStartOfYear } from "../../utils/generate-dates-from-start-of-year";

//header
const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

//offset
const yearOffset = dayjs().startOf("year").day()  //not every year starts on a Sunday

//past dates
const summaryDates = generateDaysFromStartOfYear()

//future dates
const amountOfTotalDays = 20 * 7
const amountOfPlaceholderDays = amountOfTotalDays - summaryDates.length

export function Home() {
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
            return (
              <Day key={date.toString()}/>
            )
          })}

          {/* Future days */}
          {
            amountOfPlaceholderDays > 0 &&
            Array.from({length: amountOfPlaceholderDays}).map((_, i) => {
              return (
                <View 
                  key={i} 
                  className="bg-zinc-900 border-zinc-800  border-2 rounded-lg m-1 opacity-50"
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