import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '@/components/ui/radio-group'
import { createGoal } from '@/http/create-goal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const createGoalFormSchema = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja realizar'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateGoalFormProps = z.infer<typeof createGoalFormSchema>

export function CreateGoal() {
  const queryClient = useQueryClient()

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<CreateGoalFormProps>({
    resolver: zodResolver(createGoalFormSchema),
  })

  const handleCreateGoal = async (data: CreateGoalFormProps) => {
    await createGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    })
    reset()

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  const titleError = !!errors?.title

  return (
    <DialogContent>
      <div className="flex h-full flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>
          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex flex-col flex-1 justify-between"
        >
          <div className="flex flex-col">
            <div className="flex h-28 flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                placeholder="Praticar exercícios, meditar, etc..."
                className={`${titleError && 'border-red-400'}`}
                autoFocus
                {...register('title')}
              />
              {titleError && (
                <p className="text-xs text-red-400">{errors?.title?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="radio-group">Quantas vezes na semana?</Label>
              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={3}
                render={({ field: { value, name, onChange, disabled } }) => {
                  return (
                    <RadioGroup
                      name={name}
                      value={String(value)}
                      onValueChange={onChange}
                      id="radio-group"
                      disabled={disabled}
                    >
                      <RadioGroupItem value="1">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          1x na semana
                        </span>
                        <span className="text-lg leading-none">🥱</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="2">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          2x na semana
                        </span>
                        <span className="text-lg leading-none">🙂</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="3">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          3x na semana
                        </span>
                        <span className="text-lg leading-none">😎</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="4">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          4x na semana
                        </span>
                        <span className="text-lg leading-none">😜</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="5">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          5x na semana
                        </span>
                        <span className="text-lg leading-none">🤨</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="6">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          6x na semana
                        </span>
                        <span className="text-lg leading-none">🤯</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="7">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          Todos os dias da semana
                        </span>
                        <span className="text-lg leading-none">🔥</span>
                      </RadioGroupItem>
                    </RadioGroup>
                  )
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild className="flex-1">
              <Button type="button" variant="secondary" disabled={isLoading}>
                Fechar
              </Button>
            </DialogClose>

            <Button className="flex-1" disabled={isLoading}>
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
