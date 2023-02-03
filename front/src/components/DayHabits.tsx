import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { Checkbox } from "./Checkbox"
import { api } from "../lib/axios"

interface DayHabitsProps {
  date: Date
  onHabitCompleteChange: (numberOfHabitsCompleted: number) => void
}

interface DayHabitsApiResponse {
  possibleHabits: {
    id: string
    title: string
    created_at: string
  }[]
  completedHabits: string[]
}

export function DayHabits(props: DayHabitsProps) {

  const [ dayHabits, setDayHabits ] = useState<DayHabitsApiResponse>()

  useEffect(() => {
    api.get("/day", {
      params: {
        date: props.date.toISOString()
      }
    }).then(response => {
      console.log(response.data)
      setDayHabits(response.data)
    })
  }, [])

  const isDateNotToday = dayjs(props.date)  //can only check today's boxes
    .endOf("day")                           //last minute of day x
    .isBefore(new Date())                   //now
  
  async function handleToggleHabit(habitId: string ) {
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

    props.onHabitCompleteChange(completedHabits.length)
  }

  return (
    //list of habits
    <div className="flex flex-col mt-6 gap-3">

      {
        dayHabits?.possibleHabits.map(habit => {
          return (
            <Checkbox 
              key={habit.id}
              title={habit.title}
              checked={dayHabits.completedHabits.includes(habit.id)}
              disabled={isDateNotToday}
              // onCheckedChange={() => handleToggleHabit(habit.id)}  //prop from Radix Checkbox
              onChange={() => handleToggleHabit(habit.id)}            //prop from my custom component                     //prop from my custom component
            />
          )
        })
      }
    </div>
  )
}