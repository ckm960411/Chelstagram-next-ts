import { rest } from "msw";
import { users } from "dummyData/users";
import { posts } from "dummyData/posts";
import { getRandomID } from "lib/utils/getRandomID";
import { format } from "date-fns";

interface PostPostReqBody extends PostFeedType {}
interface PatchPostReqBody extends EditFeedType {}
interface PostPostCommentReqBody extends PostFeedCommentType {}
interface PatchPostCommentReqBody extends EditFeedCommentType {}

export const postHandlers = [
  /**
   * GET / 게시글들 불러오기
   */
  rest.get('http://localhost:3000/posts', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        posts
      })
    )
  }),
  /**
   * POST / 게시글 작성
   */
  rest.post<PostPostReqBody>('http://localhost:3000/post', async (req, res, ctx) => {
    const { userId, postText, postImg } = req.body
    const finded = users.find(user => user.id === userId)

    if (!finded) {
      return res(
        ctx.json({
          errorMessage: "The user was not found."
        })
      )
    }
    return res(
      ctx.status(201),
      ctx.json({
        id: getRandomID(),
        author: {
          userId: finded.id,
          nickname: finded.nickname,
          profileImg: finded.profileImg,
        },
        createdAt: format(Date.now(), 'yyyy-MM-dd KK:mm:ss'),
        modifiedAt: format(Date.now(), 'yyyy-MM-dd KK:mm:ss'),
        content: {
          postText,
          postImg,
        },
        likes: [],
        comments: [],
      })
    )
  }),
  /**
   * PATCH / 게시글 수정
   */
  rest.patch<PatchPostReqBody>('http://localhost:3000/api/post/edit/:postId', async (req, res, ctx) => {
    const { postId } = req.params
    const { postText, postImg } = req.body
    // const postFinded = posts.find(post => post.id === +postId)

    return res(
      ctx.status(200),
      ctx.json({
        id: +postId,
        postText,
        postImg,
        modifiedAt: format(Date.now(), 'yyyy-MM-dd KK:mm:ss'),
      })
    )
  }),
  /**
   * DELETE / 게시글 삭제
   */
  rest.delete('http://localhost:3000/api/post/delete/:postId', async (req, res, ctx) => {
    const { postId } = req.params
    // const postFinded = posts.find(post => post.id === +postId)

    if (!postId) {
      return res(
        ctx.json({
          errorMessage: 'asdfasdfadsf'
        })
      )
    }

    return res(
      ctx.status(200),
      ctx.json({
        id: +postId,
      })
    )
  }),
  /**
   * POST / 게시글 댓글 작성
   */
  rest.post<PostPostCommentReqBody>('http://localhost:3000/api/comment/:postId', async (req, res, ctx) => {
    const { postId } = req.params
    const { userId, text } = req.body
    const userFinded = users.find(user => user.id === userId)
    // const postFinded = posts.find(post => post.id === +postId)
    
    if (!userFinded) {
      return res(
        ctx.json({
          errorMessage: "The user was not found."
        })
      )
    }

    return res(
      ctx.status(200),
      ctx.json({
        id: getRandomID(),
        postId: +postId,
        userId,
        nickname: userFinded.nickname,
        profileImg: userFinded.profileImg,
        text,
        createdAt: format(Date.now(), 'yyyy-MM-dd KK:mm:ss'),
        modifiedAt: format(Date.now(), 'yyyy-MM-dd KK:mm:ss'),
      })
    )
  }),
  /**
   * PATCH / 게시글 댓글 수정
   */
  rest.patch<PatchPostCommentReqBody>('http://localhost:3000/api/comment/:postId', async (req, res, ctx) => {
    const { postId } = req.params
    const { commentId, text } = req.body
    // const postFinded = posts.find(post => post.id === +postId)

    return res(
      ctx.status(200),
      ctx.json({
        id: commentId,
        postId: +postId,
        text,
        modifiedAt: format(Date.now(), 'yyyy-MM-dd KK:mm:ss'),
      })
    )
  }),
  /**
   * DELETE / 게시글 댓글 삭제
   */
  rest.delete('http://localhost:3000/api/comment/:postId/:commentId', async (req, res, ctx) => {
    const { postId, commentId } = req.params
    // const postFinded = posts.find(post => post.id === +postId)

    return res(
      ctx.status(200),
      ctx.json({
        id: +commentId,
        postId: +postId,
      })
    )
  }),
  /**
   * GET / 자기 게시글 불러오기
   */
  rest.get('http://localhost:3000/api/post/:userId', async (req, res, ctx) => {
    const { userId } = req.params

    return res(
      ctx.status(200),
      ctx.json({
        posts,
        userId: +userId
      })
    )
  }),
]