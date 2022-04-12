import { rest } from "msw";
import { players } from "dummyData/players"
import { users } from "dummyData/users";
import { getRandomID } from "lib/utils/getRandomID";
import { format } from "date-fns";

interface PostPlayerCommentReqBody extends PostPlayerCommentType {}
interface PatchPlayerCommentReqBody extends EditPlayerCommentType {}
interface DeletePlayerCommentReqBody extends DeletePlayerCommentType {}

export const playerHandlers = [
  /**
   * GET / 전체 선수 정보 불러오기
   */
  rest.get('http://localhost:3000/players', async(req, res, ctx) => {
    return res(
      ctx.json(players)
    )
  }),
  /**
   * GET / 선수 정보 불러오기
   */
  rest.get('http://localhost:3000/players/:playerId', async(req, res, ctx) => {
    const { playerId } = req.params
    const finded = players.find(player => player.id.toString() === playerId)
    return res(
      ctx.status(200),
      ctx.json({
        ...finded
      })
    )
  }),
  /**
   * POST / 선수 댓글 달기
   */
  rest.post<PostPlayerCommentReqBody>('http://localhost:3000/players/:playerId/comment', async(req, res, ctx) => {
    const { playerId } = req.params
    const { userId, text } = req.body
    const Playerfinded = players.find(player => player.id.toString() === playerId)
    const userFinded = users.find(user => user.id === userId)
    
    if (!Playerfinded) {
      return res(
        ctx.json({
          errorMessage: "There is no player who is trying to comment right now."
        })
      )
    }
    if (!userFinded) {
      return res(
        ctx.json({
          errorMessage: "This user does not exist."
        })
      )
    }

    return res(
      ctx.status(201),
      ctx.json({
        playerId: Playerfinded.id,
        id: getRandomID(),
        userId: userFinded.id,
        nickname: userFinded.nickname,
        profileImg: userFinded.profileImg ? userFinded.profileImg : null,
        text,
        createdAt: format(Date.now(), 'yyyy-MM-dd KK:mm:ss'),
        modifiedAt: format(Date.now(), 'yyyy-MM-dd KK:mm:ss'), 
      })
    )
  }),
  /**
   * PATCH / 선수 댓글 수정
   */
  rest.patch<PatchPlayerCommentReqBody>('http://localhost:3000/players/:playerId/comment/:commentId', async (req, res, ctx) => {
    const { playerId, commentId } = req.params
    const { text } = req.body
    const playerFinded = players.find(player => player.id.toString() === playerId)
    // const comments = playerFinded!.comments
    // const commentFinded = comments.find(comment => comment.commentId === commentId)

    // if(!commentFinded) {
    //   return res(
    //     ctx.json({
    //       errorMEssage: "You're trying to edit the comments that aren't there."
    //     })
    //   )
    // }

    return res(
      ctx.status(200),
      ctx.json({
        commentId: +commentId,
        text,
        modifiedAt: format(Date.now(), 'yyyy-MM-dd KK:mm:ss')
      })
    )
  }),
  /**
   * DELETE / 선수 댓글 삭제
   */
  rest.delete<DeletePlayerCommentReqBody>('http://localhost:3000/players/:playerId/comment/:commentId', async (req, res, ctx) => {
    const { playerId, commentId } = req.params
    const playerFinded = players.find(player => player.id.toString() === playerId)
    // const comments = playerFinded?.comments
    // const commentFinded = comments?.find(comment => comment.commentId === commentId)

    // if (!finded) {
    //   return res(
    //     ctx.status(403),
    //     ctx.json({
    //       errorMessage: "없는 댓글을 삭제하시려 하는군요."
    //     })
    //   )
    // }

    return res(
      ctx.json({
        commentId: +commentId,
      })
    )
  }),
]