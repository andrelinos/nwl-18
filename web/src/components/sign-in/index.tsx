import { Input } from '@/components/ui/input'
import { magic } from '@/libs/magic.link'
import { useState } from 'react'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    try {
      await magic.auth.loginWithMagicLink({ email })

      const didToken = await magic.user.getIdToken()

      const response = await fetch('/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${didToken}`,
        },
      })

      if (response.ok) {
        setMessage('Login successful!')
      } else {
        setMessage('Login failed.')
      }
    } catch (error) {
      setMessage('An error occurred.')
    }
  }

  return (
    <div>
      <h1>Sign In</h1>
      <Input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button type="button" onClick={handleLogin}>
        Sign In
      </button>
      <p>{message}</p>
    </div>
  )
}
