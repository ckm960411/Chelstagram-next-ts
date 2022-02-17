declare interface UserType {
  id: number
  role: 'USER' | 'ADMIN'
  name: string
  nickname: string
  profileImg: string | null
  email: string
  password: string
  followers: number[]
  followings: number[]
}