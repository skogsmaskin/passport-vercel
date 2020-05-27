# passport-vercel
[Passport](http://passportjs.org/) strategy for authenticating with
[Vercel](https://vercel.com/) using the OAuth 2.0 API.
 
[![Build Status](https://travis-ci.com/skogsmaskin/passport-vercel.svg?branch=master)](https://travis-ci.com/skogsmaskin/passport-vercel)

This module lets you authenticate with [Vercel](https://vercel.com/) in your Node.js applications.
By plugging into Passport, Vercel authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).


## Install

```bash
$ npm install passport-vercel
```

## Usage

#### Create an Application

Before using `passport-vercel`, you must register an application with Vercel.
At the time being this is a manual process where you will have to contact Vercel and get them to do it for you. Your application will be issued a client ID and client secret, which need to be provided to the strategy. You will also need to configure a callback URL which matches the route in your application.

#### Configure Strategy

The Vercel authentication strategy authenticates users using a Vercel account
and OAuth 2.0 tokens. The client ID and secret obtained when creating an
application are supplied as options when creating the strategy. The strategy
also requires a `verify` callback, which receives the access token, as well as 
`profile` which contains the authenticated user's Netilify profile. 
The `verify` callback must call `cb` providing a user to complete authentication.

```js
const VercelStrategy = require('passport-vercel').Strategy;

passport.use(new VercelStrategy({
    clientID: VERCEL_CLIENT_ID,
    clientSecret: VERCEL_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/vercel/callback",
    state: true // use OAuth2 state param to protect against csrf attacks (requries express-session)
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({provider: 'vercel', providerId: profile.id }, (err, user) => {
      return cb(err, user)
    })
  }
))
```

*Note: While Vercel doesn't support refresh tokens (as for Jan. 2019),
the verify callback still uses a second parameter `refreshToken` to conform
to the OAuth2 standard. This makes it easier to  share a verify callback function
for all `passport-oauth2` based authentications you use with Passport.js.
The `refreshToken` will be undefined with this strategy, and should just be ignored.*

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'vercel'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.get('/auth/vercel', passport.authenticate('vercel'))

app.get('/auth/vercel/callback', 
  passport.authenticate('vercel', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  })
```
