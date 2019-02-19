module.exports.OAuth2 = () => {
  return {
    useAuthorizationHeaderforGET: () => {
      //
    },
    get: (url: string, accessToken: string, callback: any): void => {
      callback(
        null,
        '{"user":{"uid":"xxxx","email":"test@test.com","name":"Test Testperson","username":"testperson","date":"2018-11-15T17:10:19.018Z","avatar":"92083b1b1217eb77bf18ff4a58c5a32c672e112b","github":{"updatedAt":1548684917967,"email":"test@test.com","login":"testpersongit","installation":{"id":"1234","login":"testpersongit","loginType":"User"}},"platformVersion":null,"billing":{"plan":"free","period":null,"trial":null,"cancelation":null,"addons":null},"bio":null,"website":null,"profiles":[]}}',
        undefined
      )
    }
  }
}
