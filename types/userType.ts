export interface UserType {
  userId: string // id
  // role: 'USER' | 'ADMIN'
  userName: string // name
  nickname: string
  profileImg: string | null
  email: string
  password: string
}