import { useActionState, useEffect } from 'react'
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

export default function RegistrationForm({ onRegistered }) {
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

  useEffect(() => {
    if (state.success) {
      onRegistered()
    }
  }, [onRegistered, state.success])

  return (
    <section className="registration-section" aria-labelledby="registration-heading">
      <div className="registration-card">
        <div className="registration-intro">
          <span className="registration-kicker">Create your account</span>
          <h2 id="registration-heading">Register to shop</h2>
          <p>Register to view product details and start shopping.</p>
        </div>

        <form className="registration-form" action={formAction}>
          <label>
            <span>Name</span>
            <input
              name="name"
              autoComplete="name"
              placeholder="Your name"
              required
            />
          </label>

          <label>
            <span>Email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              minLength={8}
              required
            />
            <span className="field-hint">Use at least 8 characters.</span>
          </label>

          {state.error && (
            <p className="registration-message registration-error" role="alert">
              {state.error}
            </p>
          )}
          {state.success && (
            <p className="registration-message registration-success" role="status">
              {state.success}
            </p>
          )}

          <SubmitButton />
          <p className="registration-note">
            This demo keeps your name and email for this session only.
          </p>
        </form>
      </div>
    </section>
  )
}