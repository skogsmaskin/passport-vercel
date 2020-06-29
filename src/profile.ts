interface UserInfoRaw {
  user: {
    uid: string
    email: string
    name: string
    username: string
    avatar: string
  }
}

export interface Profile {
  _raw?: string
  _json?: UserInfoRaw
  id?: string
  displayName?: string
  emails?: { value: string }[]
  photos?: { value: string }[]
  provider?: string
  username?: string
}

export function parseUserProfile(userInfo: UserInfoRaw) {
  const profile: Profile = {}
  profile.id = userInfo.user.uid
  profile.displayName = userInfo.user.name
  profile.username = userInfo.user.username
  if (userInfo.user.email) {
    profile.emails = [{ value: userInfo.user.email }]
  }
  if (userInfo.user.avatar) {
    profile.photos = [{ value: `https://vercel.com/api/www/avatar/${userInfo.user.avatar}?s=600` }]
  }
  return profile
}
