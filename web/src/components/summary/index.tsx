import { InOrbitIcon } from '@/components/in-orbit-icon'
import { PendingGoals } from '@/components/pending-goals'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { Progress, ProgressIndicator } from '@/components/ui/progress-bar'
import { Separator } from '@/components/ui/separator'
import { getSummary } from '@/http/get-summary'
import { undoGoalCompletion } from '@/http/undo-goal-completion'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { CheckCircle2Icon, PlusIcon } from 'lucide-react'

dayjs.locale(ptBR)

export function Summary() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  })

  if (!data || isLoading) return <div>Carregando...</div>

  async function handleUncompletedGoal(goalId: string) {
    await undoGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage = Math.round((data?.completed * 100) / data.total)

  return (
    <div className="flex py-10 max-w-[480px] px-5 mx-auto flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center justify-between">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <PlusIcon className="size-4" /> Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>
      <div className="flex flex-col gap-3">
        <Progress value={1} max={15}>
          <ProgressIndicator
            style={{
              width: `${completedPercentage}%`,
            }}
          />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <div>
            Você completou{' '}
            <span className="text-zinc-100">{data?.completed}</span> de{' '}
            <span className="text-zinc-100">{data?.total}</span> metas nessa
            semana.
          </div>
          <span>{`${completedPercentage}%`}</span>
        </div>

        <Separator />

        <PendingGoals />

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>

          {data.goalsPerDay &&
            Object.entries(data.goalsPerDay).map(([date, goals], i) => {
              const weekDay = dayjs(date).format('dddd')
              const formattedDate = dayjs(date).format('D[ de ] MMMM')

              return (
                <div key={date + String(i)} className="flex flex-col gap-4">
                  <h3 className="font-medium space-x-2">
                    <span className="capitalize">{weekDay}</span>
                    <span className="text-zinc-400 text-xs">
                      ({formattedDate})
                    </span>
                  </h3>

                  <ul className="flex flex-col gap-3">
                    {goals.map(goal => {
                      const time = dayjs(goal.createdAt).format('HH:mm')

                      return (
                        <li
                          key={goal.id}
                          className="flex group items-center gap-2"
                        >
                          <CheckCircle2Icon className="size-4 text-pink-500" />
                          <div className="text-sm w-full flex items-center text-zinc-400">
                            <div className="flex gap-1">
                              Você completou "
                              <span className="text-zinc-100">
                                {goal.title}
                              </span>
                              " às{' '}
                              <span className="text-zinc-100">{`${time}h`}</span>
                            </div>
                            <div className="w-16 flex justify-end">
                              <Button
                                variant="link"
                                className="hover:text-rose-300 p-0 m-0 hidden group-hover:flex"
                                onClick={() => handleUncompletedGoal(goal.id)}
                              >
                                Desfazer
                              </Button>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
