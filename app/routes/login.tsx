import {Form} from 'remix'
// app/routes/login.tsx
export default function Login() {
  return (
    <Form action="/auth/auth0" method="post">
      <button>Login with Auth0</button>
    </Form>
  )
}
