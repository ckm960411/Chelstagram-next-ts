export interface PostTypes {
  postId: string // id
  author: Author
  // date: number
  content: PostContent
  likes: string[] // number
  // liked: boolean
  comments: PostComment[]
}

export interface PostContent {
  postText: string
  date: number // x
  postImg: string[]
}

export interface PostComment {
  postId: string
  commentId: string // id
  userId: string
  userName: string // x
  nickname: string
  profileImg: string | null
  text: string
  date: number // x
  // createdAt: string
  // modifiedAt: string
}

export interface Author {
  userId: string
  userName: string // x
  nickname: string
  profileImg: string | null
  email: string // x
}