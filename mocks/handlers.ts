import { rest } from "msw";
import { players } from "dummyData/players"
import { users } from "dummyData/users";
import { SignUpFormValue } from "components/login/SignUpForm";
import { LoginFormValue } from "components/login/LoginForm";
import { CommentData } from "components/playerInfo/comments/CommentForm";

interface PostLoginReqBody extends LoginFormValue {}
interface PostSignUpReqBody extends SignUpFormValue {}
interface PostCommentReqBody extends CommentData {}

export const handlers = [
  // GET / Home
  rest.get('http://localhost:3000/', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Welcome to Chelstagram!"
      })
    )
  }),
  // post / Login
  rest.post<PostLoginReqBody>('http://localhost:3000/user/login', async (req,res, ctx) => {
    const { email, password } = req.body

    const finded = users.find(v => v.email === email)
    if (!finded) {
      return res(
        ctx.json({
          errorMessage: "No matching email was found.",
        })
      )
    }
    if (finded.password !== password) {
      return res(
        ctx.json({
          errorMessage: "The password doesn't match.",
        })
      )
    }
    return res(
      ctx.status(201),
      ctx.delay(2000),
      ctx.json({
        userId: finded.userId,
        email: finded.email,
        userName: finded.userName,
        nickname: finded.nickname,
      })
    )
  }),
  // post / Sign Up
  rest.post<PostSignUpReqBody>('http://localhost:3000/user/signup', async(req, res, ctx) => {
    const { name, nickname, email } = req.body

    const findedEmail = users.find(v => v.email === email)
    if (findedEmail) {
      return res(
        ctx.json({
          errorMessage: "It's a duplicate account."
        })
      )
    }
    const findedNickname = users.find(v => v.nickname === nickname)
    if (findedNickname) {
      return res(
        ctx.json({
          errorMessage: "It's a duplicate nickname."
        })
      )
    }
    return res(
      ctx.delay(2000),
      ctx.json({
        name, nickname, email
      })
    )
  }),
  // GET / players
  rest.get('http://localhost:3000/players', async(req, res, ctx) => {
    return res(
      ctx.json(players)
    )
  }),
  // GET / player
  rest.get('http://localhost:3000/players/:playerId', async(req, res, ctx) => {
    const { playerId } = req.params
    const finded = players.find(v => v.backNumber.toString() === playerId)
    return res(
      ctx.status(200),
      ctx.json({
        ...finded
      })
    )
  }),
  // POST / 댓글 달기
  rest.post<PostCommentReqBody>('http://localhost:3000/players/:playerNum/comment', async(req, res, ctx) => {
    const { playerNum } = req.params
    const { playerId, userId, userName, nickname, commentId, text, date, profileImg } = req.body
    const finded = players.find(player => player.backNumber === Number(playerNum))

    if (!finded) {
      return res(
        ctx.json({
          errorMessage: "There is no player who is trying to comment right now."
        })
      )
    }

    return res(
      ctx.status(201),
      ctx.json({
        playerId, commentId, userId, userName, nickname, text, date, 
        profileImg: profileImg ? profileImg : null
      })
    )
  }),
]