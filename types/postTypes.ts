export interface PostTypes {
  postId: string
  author: Author
  content: PostContent
  likes: string[]
  comments: PostComment[]
}

export interface PostContent {
  postText: string
  date: number
  postImg: string | null
}

export interface PostComment {
  commentId: string
  postId: string
  userId: string
  userName: string
  nickname: string
  profileImg: string | null
  text: string
  date: number
}

export interface Author {
  userId: string
  userName: string
  nickname: string
  profileImg: string | null
  email: string
}