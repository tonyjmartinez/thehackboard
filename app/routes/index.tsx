import {Form, Link} from 'remix'

export default function Index() {
  return (
    <>
      <Form action="/auth/login" method="post">
        <button>Login with Auth0</button>
      </Form>
      <Form action="/auth/logout" method="post">
        <button>Logout</button>
      </Form>
      <div>Hello world!!</div>
    </>
  )
}
