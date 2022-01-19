import {Form, Link, useLoaderData} from 'remix'
import type {ActionFunction, LoaderFunction} from 'remix'
import {authenticator} from '~/utils/auth.server'

export let loader: LoaderFunction = async ({request}) => {
  const {email} = await authenticator.isAuthenticated(request)
  return {email}
}

export default function Index() {
  const data = useLoaderData()

  return (
    <>
      <Form action="/auth/login" method="post">
        <button>Login with Auth0</button>
      </Form>
      <Form action="/auth/logout" method="post">
        <button>Logout</button>
      </Form>
      <div>Hello world!!!</div>
      <div>{data?.email}</div>
    </>
  )
}
