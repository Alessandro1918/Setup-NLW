import dayjs from "dayjs"
import clsx from "clsx"
import * as Popover from "@radix-ui/react-popover"
import * as Checkbox from "@radix-ui/react-checkbox"
import { Check } from "phosphor-react"
import { ProgressBar } from "./ProgressBar"

interface DayProps {
  date: Date
  available: number
  completed: number
}

export function Day(props: DayProps) {

  const percentualCompleted = 
    props.available > 0
    ? props.completed / props.available * 100
    : 0

  return (
    <Popover.Root>
      <Popover.Trigger 
        className={clsx("w-10 h-10 border-2 rounded-lg", {
          "border-zinc-800 bg-zinc-900": percentualCompleted == 0,
          "border-violet-800 bg-violet-900": percentualCompleted > 0 && percentualCompleted < 20,
          "border-violet-700 bg-violet-800": percentualCompleted >= 20 && percentualCompleted < 40,
          "border-violet-600 bg-violet-700": percentualCompleted >= 40 && percentualCompleted < 60,
          "border-violet-500 bg-violet-600": percentualCompleted >= 60 && percentualCompleted < 80,
          "border-violet-400 bg-violet-500": percentualCompleted >= 80
        })} 
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          
          <span className="font-semibold text-zinc-400">
            {
              // v1:
              {
                0: "domingo",
                1: "segunda-feira",
                2: "terça-feira",
                3: "quarta-feira",
                4: "quinta-feira",
                5: "sexta-feira",
                6: "sábado"
              }[dayjs(props.date).format("d")]
              // v2:
              // {dayjs(props.date).format("dddd")} //day of week in pt-BR, because of the lib/dayjs.ts file I imported at App.tsx like the mobile version
            }
          </span>

          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayjs(props.date).format("DD/MM")}
          </span>

          <ProgressBar progress={percentualCompleted}/>

          {/* list of habits */}
          <div className="flex flex-col mt-6 gap-3">

            {/* tailwind trick: "group": allows me to style components based on attributes they don't have, but someone inside the group does */}
            {/* (style the parent "div" based on the state of the Indicator) */}
            <Checkbox.Root className="flex items-center gap-3 group">

              {/* Here I style a div because the unchecked Radix checkbox does not get rendered */}
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white"/>
                </Checkbox.Indicator>
              </div>

              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                oi
              </span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />          
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}