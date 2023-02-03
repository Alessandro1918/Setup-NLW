import dayjs from "dayjs"
import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "./lib/prisma"

export async function appRoutes(app: FastifyInstance) {

  //get all habits
  app.get("/habits", async () => {
    const habits = await prisma.habit.findMany()
    return habits
  })

  //create habit
  app.post("/habits", async (req, res) => {
    
    const reqBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    })
    const { title, weekDays } = reqBody.parse(req.body)
        
    await prisma.habit.create({
      data: {
        //fields from table
        title,
        //created_at: new Date(),                       //current date
        created_at: dayjs().startOf("day").toDate(),    //first hour of the day

        //relation fields from other table
        weekDays: {                                     //"weekDays": name from "habits" table
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay                         //"week_day": name from "habit_week_days" table
            }
          })
        }
      }
    })
  })

  //get habits possible / completed for that day
  app.get("/day", async (req) => {
    const queryParams = z.object({
      date: z.coerce.date()
    })
    const { date } = queryParams.parse(req.query)

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
    }) ?? []                //4. if no habits completed, return empty list

    return {
      possibleHabits,
      completedHabits
    }
  })

  //change habit to completed / not completed
  app.patch("/habits/:id/toggle", async (req, res) => {

    const toggleParams = z.object({
      id: z.string().uuid()
    })
    const { id } = toggleParams.parse(req.params)

    const today = dayjs().startOf("day").toDate()

    //check if day is in the db
    let day = await prisma.day.findUnique({
      where: {
        date: today
      }
    })

    //doesn't exist; create day
    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today
        }
      })
    }

    //check if is there an entry for that habit on that day; thus signaling "completed"
    //Pivot table
    // model DayHabit {
    //   @@unique([day_id, habit_id])
    // }
    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {  //prisma geneated object name based on my @@unique constrain
          day_id: day.id,
          habit_id: id
        }
      }
    })

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id
        }
      })
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id
        }
      })
      //TODO - check first if that habit was supposed to be on that day
    }
  })

  //list of days and how many habits were completed / available
  //writen with raw SQL to be more performatic (the table relations would generate several queries per day)
  //list days from db, so I don't need to loop 365 times. Just need to filter by weekDay and day.date > habit.createdAt
  //(...)                   //subquery 
  //SELECT count(*)         //return the number of lines selected 
  //cast(count(*) as float) //convert BigInt to float
  //FROM day_habits DH      //"DH" = alias for the table "day_habits"
  //strftime                //SQLite format function
  //as completed            //alias for JSON return object: {..., "completed": 3, ...}
  //JOIN ...                //brings the habit related to the HWD entry so I can check the created_at field
  app.get("/summary", async (req, res) => {

    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date,
        (
          SELECT cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H on H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast(strftime("%w", D.date/1000.0, "unixepoch") as int)
            AND
            H.created_at <= D.date
        ) as available
      FROM days D
    `
    return summary
  })
}