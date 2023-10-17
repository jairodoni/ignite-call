import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const timeIntervalsFormSchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number().min(0).max(6),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  const { intervals } = timeIntervalsFormSchema.parse(req.body)

  await Promise.all(
    intervals.map((intervals) => {
      return prisma.userTimeInterval.createMany({
        data: {
          week_day: intervals.weekDay,
          time_start_in_minutes: intervals.startTimeInMinutes,
          time_end_in_minutes: intervals.endTimeInMinutes,
          user_id: session.user.id,
        },
      })
    }),
  )

  return res.status(201).end()
}
