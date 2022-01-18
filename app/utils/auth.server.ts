// app/auth.server.ts
import {Authenticator} from 'remix-auth'
import {Auth0Strategy, Auth0Profile, Auth0ExtraParams} from 'remix-auth-auth0'
import {sessionStorage} from '~/session.server'
import {login, User} from '~/models/user'

let {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL,
  DOMAIN,
} = process.env

// Ensure they are defined and throw error if not
if (!AUTH0_DOMAIN) throw new Error('Missing Auth0 domain.')
if (!AUTH0_CLIENT_ID) throw new Error('Missing Auth0 client id.')
if (!AUTH0_CLIENT_SECRET) throw new Error('Missing Auth0 client secret.')
if (!AUTH0_CALLBACK_URL) throw new Error('Missing Auth0 redirect uri.')

export let authenticator = new Authenticator<User>(sessionStorage)
let auth0Strategy = new Auth0Strategy(
  {
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    callbackURL: AUTH0_CALLBACK_URL,
    audience: 'https://thehackboard.com', // optional
  },
  async ({accessToken, refreshToken, extraParams, profile}) =>
    login(profile.emails[0].value),
)

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
// export let authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(auth0Strategy)
