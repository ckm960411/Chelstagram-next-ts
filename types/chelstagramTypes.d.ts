declare interface EditProfileType {
  userId: number
  name: string
  nickname: string
  profileImg: string | null
}

declare type FollowReqType = {
  userId: number
  followers?: number[]
  followings?: number[]
  reqType: 'followers' | 'followings'
}

declare interface FollowInfoType {
  nickname: string
  name: string
  email: string
  profileImg: string | null
}

declare interface PostFeedType {
  userId: number
  postText: string
  postImg: string[]
}

declare interface EditFeedType {
  postId: number
  postText: string
  postImg: string[]
}

declare interface DeleteFeedType {
  postId: number
}

declare interface PostFeedCommentType {
  postId: number
  userId: number
  text: string
}

declare interface EditFeedCommentType {
  commentId: number
  postId: number
  text: string
}

declare interface DeleteFeedCommentType {
  commentId: number
  postId: number
}

declare interface PostPlayerCommentType {
  playerId: number
  userId: number
  text: string
}

declare interface EditPlayerCommentType {
  commentId: number
  playerId: number
  text: string
}

declare interface DeletePlayerCommentType {
  commentId: number
  playerId: number
}

// PropTypes
declare type InputFileFormProps = {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
  label: string
}

declare type PreviewImagesTabProps = {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

declare type PreviewImageProps = {
  image: string
  setImages: React.Dispatch<React.SetStateAction<string[]>>
  order: number
}

type CommentFrameProps = {
  comment: PostComment | PlayerComment
  postId?: number
  playerId?: number
}

type EditMenuProps = {
  anchorEl: HTMLElement | null
  handleClick: (event: React.MouseEvent<HTMLElement>) => void
  handleClose: () => void
  onEditContent: () => void
  onDeleteContent: () => void
  userId: number
}

declare type EditFeedModalProps = {
  editing: boolean
  setEditing: Dispatch<SetStateAction<boolean>>
  post: PostTypes
}

declare type EditProfileProps = {
  editing: boolean
  setEditing: Dispatch<SetStateAction<boolean>>
  myInfo: UserType
}

declare type EditProfileImageProps = {
  image: string | null
  setImage: Dispatch<SetStateAction<string | null>>
  nickname: string
}

declare type FollowListProps = { 
  userId: number
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  followers?: number[]
  followings?: number[]
}

declare type EditCommentFormProps = {
  text: string
  editCommentRef: React.RefObject<HTMLInputElement>
  onSubmit: () => void
  setEditing: (value: React.SetStateAction<boolean>) => void
  commentError: string
  setCommentError: React.Dispatch<React.SetStateAction<string>>
}

declare type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

declare type EachStatCardProps = {
  name: string
  img: StaticImageData
  stats: Stats
}

declare type InfoPropTypes = {
  title: string
  desc: string | number
}

declare type DateParagraphProps = {
  createdAt: string
  modifiedAt: string
}

// etc
declare type FollowDataType = {
  followingId: number
  followedId: number
}

declare type LoginFormValue = {
  email?: string
  password?: string
}

declare type SignUpFormValue = {
  name: string
  nickname: string
  email: string
  password: string
  confirm_password: string
}

declare type RHFformTypes = {
  type: string
  errors: FieldErrors
  attribute: UseFormRegisterReturn
  label?: string
}

declare type RightStatNumFuncType = (
  matches: boolean,
  mainPosition: string,
  subPosition: string,
  stat1: number | string,
  stat2: number | string,
  stat3: number | string,
  stat4: number | string
) => React.ReactNode;
declare type RightStatLabelFuncType = (
  mainPosition: string,
  subPosition: string,
  label1: string,
  label2: string,
  label3: string,
  label4: string
) => React.ReactNode;
declare type LeftStatNumFuncType = (
  matches: boolean,
  mainPosition: string,
  subPosition: string,
  stat1: number,
  stat2: number,
  stat3: number,
) => React.ReactNode
declare type LeftStatLabelFuncType = (
  mainPosition: string,
  subPosition: string,
  label1: string,
  label2: string,
  label3: string,
) => React.ReactNode