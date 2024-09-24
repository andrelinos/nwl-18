import { PlusIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'

import lestStart from '@/assets/lest-start-illustration.svg'
import logo from '@/assets/logo-in-orbit.svg'

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in-orbit" />
      <img src={lestStart} alt="in-orbit" />

      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-4" /> Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  )
}
