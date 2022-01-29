import { rest } from "msw";
import { players } from "dummyData/players"
import { users } from "dummyData/users";

interface PostLoginReqBody {
  email: string
  password: string
}

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
        ctx.status(403),
        ctx.json({
          errorMessage: "해당 이메일을 찾을 수가 없습니다.",
        })
      )
    }
    if (finded.password !== password) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "비밀번호가 일치하지 않습니다.",
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
      // ctx.status(403)
    )
  })
]