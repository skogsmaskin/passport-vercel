import ApiError from '../src/apiError'

/**
 * ApiError test
 */
describe('ApiError', () => {
  it('has name', () => {
    expect(new ApiError('foo').name).toEqual('APIError')
  })
  it('has code', () => {
    expect(new ApiError('foo').status).toEqual(500)
  })
})
