import dayjs from "dayjs"
import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "./lib/prisma"

export async function appRoutes(app: FastifyInstance) {

  //get all
  app.get("/habits", async () => {
    const habits = await prisma.habit.findMany()
    return habits
  })

  //create
  app.post("/habits", async (req, res) => {
    
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    })
    const { title, weekDays } = createHabitBody.parse(req.body)
        
    await prisma.habit.create({
      data: {
        //fields from table
        title,
        //created_at: new Date(),
        created_at: dayjs().startOf("day").toDate(),   //first hour of the day

        //relation fields from other table
        weekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay
            }
          })
        }
      }
    })
  })

  //get habits possible / completed for that day
  app.get("/day", async (req) => {
    const getDayParams = z.object({
      date: z.coerce.date()
    })
    const { date } = getDayParams.parse(req.query)

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date
        },
        weekDays: {
          some: {
            week_day: dayjs(date).get("day")
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date                //1. get the day
      },
      include: {
        dayHabits: true     //2. get the day habits
      }
    })
    const completedHabits = day?.dayHabits.map(habit => {
      return habit.habit_id //3. return just the habit's ID
    })

    return {
      possibleHabits,
      completedHabits
    }
  })
}