import dayjs from "dayjs"
import clsx from "clsx"
import * as Popover from "@radix-ui/react-popover"
import { ProgressBar } from "./ProgressBar"

interface DayProps {
  date: Date
  available: number
  completed: number
}

export function Day(props: DayProps) {

  const percentualCompleted = props.completed / props.available * 100

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
              {
                0: "domingo",
                1: "segunda-feira",
                2: "terça-feira",
                3: "quarta-feira",
                4: "quinta-feira",
                5: "sexta-feira",
                6: "sábado"
              }[dayjs(props.date).format("d")]
            }
          </span>

          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayjs(props.date).format("DD/MM")}
          </span>

          <ProgressBar progress={percentualCompleted}/>

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />          
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}