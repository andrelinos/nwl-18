import { OutlineButton } from '@/components/ui/outline-button'
import { createGoalCompletion } from '@/http/create-goal-completion'
import { getPendingGoals } from '@/http/get-pending-golas'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 60 seconds
  })

  if (!data || isLoading) return <div>Carregando...</div>

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {data.map(goal => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <PlusIcon className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
