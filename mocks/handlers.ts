import { rest } from "msw";
import { players } from "dummyData/players"
import { users } from "dummyData/users";
import { SignUpFormValue } from "components/login/SignUpForm";
import { LoginFormValue } from "components/login/LoginForm";

interface PostLoginReqBody extends LoginFormValue {}
interface PostSignUpReqBody extends SignUpFormValue {}

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
      ctx.json({
        id: 'asdf',
        email: 'asdf',
        userName: 'asdf',
        nickname: 'asdf',
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
  })
]