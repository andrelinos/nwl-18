export interface PendingGoalsResponse {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}

type PendingGoalsResponseProps = {
  pendingGoals: PendingGoalsResponse[]
}

export async function getPendingGoals(): Promise<PendingGoalsResponse[]> {
  const response = await fetch('http://localhost:3333/pending')
  const data: PendingGoalsResponseProps = await response.json()

  return data.pendingGoals
}
