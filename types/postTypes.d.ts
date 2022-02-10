declare interface PostTypes {
  id: number
  author: Author
  createdAt: string
  modifiedAt: string
  content: PostContent
  likes: number
  liked: boolean
  comments: PostComment[]
}

declare interface Author {
  userId: number
  nickname: string
  profileImg: string | null
}

declare interface PostContent {
  postText: string
  postImg: string[]
}

declare interface PostComment {
  id: number
  postId: number
  userId: number
  nickname: string
  profileImg: string | null
  text: string
  createdAt: string
  modifiedAt: string
}
