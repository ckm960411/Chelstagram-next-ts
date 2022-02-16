declare interface UserType {
  id: number
  role: 'USER' | 'ADMIN'
  name: string // name
  nickname: string
  profileImg: string | null
  email: string
  password: string
}