import { db } from '@/db'
import { goalCompletions } from '@/db/schema'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { eq } from 'drizzle-orm'

dayjs.extend(weekOfYear)

interface UndoGoalCompletionRequest {
  goalId: string
}

export async function undoGoalCompletion({
  goalId,
}: UndoGoalCompletionRequest) {
  const deletedGoalCompletion = await db
    .delete(goalCompletions)
    .where(eq(goalCompletions.id, goalId))
    .returning()

  if (deletedGoalCompletion.length === 0) {
    throw new Error('Goal completion not found!')
  }

  return {
    message: 'Goal completion deleted successfully',
  }
}
