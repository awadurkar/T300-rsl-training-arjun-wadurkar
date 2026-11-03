import { useUser } from '../context/UserContext'

export default function RegisteredUser() {
  const { user } = useUser()

  if (!user) {
    return <p>Register to unlock product details.</p>
  }

  return (
    <section aria-labelledby="registered-user-heading">
      <h2 id="registered-user-heading">Registered user</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </section>
  )
}