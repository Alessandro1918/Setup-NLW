import * as Checkbox from "@radix-ui/react-checkbox"
import dayjs from "dayjs"
import { Check } from "phosphor-react"
import { useEffect, useState } from "react"
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
            //{/* tailwind trick: "group": allows me to style components based on attributes they don't have, but someone inside the group does */}
            //{/* (style the parent "div" based on the state of the "Indicator" child) */}
            <Checkbox.Root 
              key={habit.id}
              className="flex items-center gap-3 group"
              disabled={isDateNotToday}
              checked={dayHabits.completedHabits.includes(habit.id)}
              onCheckedChange={() => handleToggleHabit(habit.id)}
            >

            {/* Here I style a div because an unchecked Radix checkbox does not get rendered */}
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white"/>
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
              {habit.title}
            </span>
          </Checkbox.Root>
          )
        })
      }
    </div>
  )
}