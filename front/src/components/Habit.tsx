interface HabitProp {
  completed: number
}

export function Habit(props: HabitProp) {
  return (
    <p>{props.completed}</p>
  )
}