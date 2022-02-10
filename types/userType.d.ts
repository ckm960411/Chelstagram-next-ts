declare interface UserType {
  id: number
  role: 'USER' | 'ADMIN'
  userName: string // name
  nickname: string
  profileImg: string | null
  email: string
  password: string
}