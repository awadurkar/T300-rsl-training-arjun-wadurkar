import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useUser } from '../context/UserContext'

const initialState = { error: '', success: '' }

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Registering…' : 'Register'}
    </button>
  )
}

export default function RegistrationForm() {
  const { setUser } = useUser()

  async function registerAction(_previousState, formData) {
    const name = formData.get('name')?.toString().trim() ?? ''
    const email = formData.get('email')?.toString().trim() ?? ''
    const password = formData.get('password')?.toString() ?? ''

    if (!name || !email || !password) {
      return { error: 'Please complete all fields.', success: '' }
    }

    if (password.length < 8) {
      return {
        error: 'Password must be at least 8 characters.',
        success: '',
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1200))

    setUser({ name, email })

    return { error: '', success: `Welcome, ${name}!` }
  }

  const [state, formAction] = useActionState(registerAction, initialState)

  return (
    <section aria-labelledby="registration-heading">
      <h2 id="registration-heading">Register to shop</h2>

      <form action={formAction}>
        <label>
          Name
          <input name="name" autoComplete="name" required />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>

        {state.error && <p role="alert">{state.error}</p>}
        {state.success && <p role="status">{state.success}</p>}

        <SubmitButton />
      </form>
    </section>
  )
}