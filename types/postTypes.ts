export interface PostTypes {
  id: number
  author: Author
  createdAt: string
  modifiedAt: string
  content: PostContent
  likes: number
  // liked: boolean
  comments: PostComment[]
}

export interface Author {
  userId: number
  nickname: string
  profileImg: string | null
}

export interface PostContent {
  postText: string
  postImg: string[]
}

export interface PostComment {
  id: number
  postId: number
  userId: number
  nickname: string
  profileImg: string | null
  text: string
  createdAt: string
  modifiedAt: string
}
