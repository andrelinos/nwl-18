import { CreateGoal } from '@/components/create-goal'
import { EmptyGoals } from '@/components/empty-goals'
import { SignIn } from '@/components/sign-in'
import { Summary } from '@/components/summary'
import { Dialog } from '@/components/ui/dialog'
import { getSummary } from '@/http/get-summary'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  })

  // useEffect(() => {
  //   magic.user.isLoggedIn().then(isLoggedIn => {
  //     console.log('USEr :: ', magic.user)
  //     setIsAuthenticated(isLoggedIn)
  //   })
  // }, [])

  return (
    <Dialog>
      {isAuthenticated ? (
        <>
          {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}

          <CreateGoal />
        </>
      ) : (
        <SignIn />
      )}
    </Dialog>
  )
}
