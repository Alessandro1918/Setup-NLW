import dayjs from "dayjs"
import { generateDaysFromStartOfYear } from "../utils/generate-dates-from-start-of-year"
import { Day } from "./Day"

const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"]

const yearOffset = dayjs().startOf("year").day()  //not every year starts on a Sunday

const summaryDates = generateDaysFromStartOfYear()

const amountOfTotalDays = 18 * 7
const amountOfPlaceholderDays = amountOfTotalDays - summaryDates.length - yearOffset

export function SummaryTable() {
  return (
    <div className="w-full flex">
      {/* Week day letter */}
      {/* From top to bottom, 7 rows */}
      {/* Could work with just "grid gap-3" */}
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {weekdays.map((weekday, i) => {
          return (
            <div 
              key={i} 
              className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
            >
              {weekday}
            </div>
          )
        })}
      </div>

      {/* Grid of squares */}
      {/* From top to bottom, 7 rows, grid-flow-col makes the 8th element go to the next column  */}
      <div className="grid grid-rows-7 grid-flow-col gap-3">

        {/* Year offset */}
        {
          yearOffset > 0 &&
          Array.from({length: yearOffset}).map((_, i) => {
            return (
              <div 
                key={i} 
                className="w-10 h-10"
              />
            )
          })
        }

        {/* Past days */}
        {summaryDates.map(date => {
          return (
            <Day 
              key={date.toString()}
              date={date}
              completed={Math.round(Math.random() * 5)}
              available={5}
            />
          )
        })}

        {/* Future days */}
        {
          amountOfPlaceholderDays > 0 &&
          Array.from({length: amountOfPlaceholderDays}).map((_, i) => {
            return (
              <div 
                key={i} 
                //almost the same style as normal Day, but cannot trigger a Popover...
                className="w-10 h-10 border-zinc-800 bg-zinc-900 border-2 rounded-lg opacity-40 cursor-not-allowed"
              />
            )
          })
        }
      </div>
    </div>
  )
}