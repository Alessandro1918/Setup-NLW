import dayjs from "dayjs"

export function generateDaysFromStartOfYear(){

  const dates = []
  const today = new Date()
  let i = dayjs().startOf("year") //Jan 1st

  while (i.isBefore(today)) {
    dates.push(i.toDate())
    i = i.add(1, "day")
  }

  return dates
}