import Strategy from '../src/passport-vercel'
import { Profile } from '../src/profile'

const strategy = new Strategy(
  {
    clientID: 'xxx',
    clientSecret: 'yyy',
    callbackURL: 'http://localhost/callback',
    state: false
  },
  (accessToken: string, refreshToken: string, profile: any, cb: any) => {
    cb(null, {})
  }
)

/**
 * Strategy test
 */
describe('Strategy', () => {
  it('is instantiable', () => {
    expect(strategy).toBeInstanceOf(Strategy)
  })

  it('parses profile info', () => {
    let theProfile
    const done = jest.fn().mockImplementationOnce((err: Error | null, profile?: Profile): void => {
      if (err) {
        return done(err)
      }
      theProfile = profile
      done(null, profile)
    })
    strategy.userProfile('jibberishAccessToken', done)
    expect(theProfile).toEqual({
      _json: {
        user: {
          avatar: '92083b1b1217eb77bf18ff4a58c5a32c672e112b',
          billing: { addons: null, cancelation: null, period: null, plan: 'free', trial: null },
          bio: null,
          date: '2018-11-15T17:10:19.018Z',
          email: 'test@test.com',
          github: {
            email: 'test@test.com',
            installation: { id: '1234', login: 'testpersongit', loginType: 'User' },
            login: 'testpersongit',
            updatedAt: 1548684917967
          },
          name: 'Test Testperson',
          platformVersion: null,
          profiles: [],
          uid: 'xxxx',
          username: 'testperson',
          website: null
        }
      },
      _raw:
        '{"user":{"uid":"xxxx","email":"test@test.com","name":"Test Testperson","username":"testperson","date":"2018-11-15T17:10:19.018Z","avatar":"92083b1b1217eb77bf18ff4a58c5a32c672e112b","github":{"updatedAt":1548684917967,"email":"test@test.com","login":"testpersongit","installation":{"id":"1234","login":"testpersongit","loginType":"User"}},"platformVersion":null,"billing":{"plan":"free","period":null,"trial":null,"cancelation":null,"addons":null},"bio":null,"website":null,"profiles":[]}}',
      displayName: 'Test Testperson',
      emails: [{ value: 'test@test.com' }],
      id: 'xxxx',
      photos: [
        {
          value: 'https://vercel.com/api/www/avatar/92083b1b1217eb77bf18ff4a58c5a32c672e112b?s=600'
        }
      ],
      provider: 'vercel',
      username: 'testperson'
    })
  })
})
