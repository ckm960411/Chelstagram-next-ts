import { rest } from "msw";
import { users } from "dummyData/users";
import { getRandomID } from "lib/utils/getRandomID";

interface PostLoginReqBody extends LoginFormValue {}
interface PostSignUpReqBody extends SignUpFormValue {}
interface PostFollowReqBody extends FollowReqType {}
interface PatchProfileReqBody extends EditProfileType {}

export const userHandlers = [
/**
 * POST / 로그인
 */
rest.post<PostLoginReqBody>('http://localhost:3000/api/user/login', async (req,res, ctx) => {
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
      id: finded.id,
      email: finded.email,
      name: finded.name,
      nickname: finded.nickname,
      profileImg: finded.profileImg,
      followers: finded.followers,
      followings: finded.followings,
    })
  )
}),
/**
 * POST / 로그아웃
 */
rest.post('http://localhost:3000/api/user/logout', async (req, res, ctx) => {
  return res(
    ctx.status(200)
  )
}),
/**
 * post / 회원가입
 */
rest.post<PostSignUpReqBody>('http://localhost:3000/api/user/signup', async(req, res, ctx) => {
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
      id: getRandomID(),
      followers: [],
      followings: [],
      name, nickname, email
    })
  )
}),
/**
 * PATCH / 프로필 수정
 */
rest.patch<PatchProfileReqBody>('http://localhost:3000/api/profile/:userId', async (req, res, ctx) => {
  const { userId } = req.params
  const { name, nickname, profileImg } = req.body
  const userFinded = users.find(user => user.id === +userId)
  const nicknameFinded = users.find(user => user.nickname === nickname)

  if (!userFinded) {
    return res(
      ctx.json({
        errorMessage: "Unable to modify the profile of a user who does not exist."
      })
    )
  }

  if (nicknameFinded && nicknameFinded.id !== userFinded.id) {
    return res(
      ctx.json({
        errorMessage: "It's a duplicate nickname."
      })
    )
  }

  return res(
    ctx.status(200),
    ctx.json({
      userId: userFinded.id,
      name, nickname, profileImg
    })
  )
}),
/**
 * POST / 팔로워 or 팔로잉 불러오기
 */
rest.post<PostFollowReqBody>('http://localhost:3000/api/:reqType/:userId', async (req, res, ctx) => {
  const { userId, reqType } = req.params
  const { followers, followings } = req.body
  const userFinded = users.find(user => user.id === +userId)
  
  if (!userFinded) {
    return res(
      ctx.json({
        errorMessage: "This user does not exist."
      })
    )
  }

  if (reqType === 'followers') {
    const followersInfoArray = followers!.reduce((prevArray, userId) => {
      const user = users.find(user => user.id === userId)
      if (!user) return prevArray
      const userInfo: FollowInfoType = {
        id: user.id,
        nickname: user.nickname,
        name: user.name,
        email: user.email,
        profileImg: user.profileImg,
      }
      return [...prevArray, userInfo]
    }, [] as FollowInfoType[])

    return res(
      ctx.status(200),
      ctx.json({
        followers: followersInfoArray
      })
    )
  }

  if (reqType === 'followings') {
    const followingsInfoArray = followings!.reduce((prevArray, userId) => {
      const user = users.find(user => user.id === userId)
      if (!user) return prevArray
      const userInfo: FollowInfoType = {
        id: user.id,
        nickname: user.nickname,
        name: user.name,
        email: user.email,
        profileImg: user.profileImg,
      }
      return [...prevArray, userInfo]
    }, [] as FollowInfoType[])

    return res(
      ctx.status(200),
      ctx.json({
        followings: followingsInfoArray
      })
    )
  }
}),
/**
 * POST / 팔로우
 */
rest.post('http://localhost:3000/api/follow/:followingId/:followedId', async (req, res, ctx) => {
  const { followingId, followedId } = req.params
  const findedFollowingId = users.find(user => user.id === +followingId)
  const findedFollowedId = users.find(user => user.id === +followedId)

  if (!findedFollowedId || !findedFollowingId) {
    return res(
      ctx.json({
        errorMessage: 'This user does not exist.'
      })
    )
  }

  return res(
    ctx.status(200),
    ctx.json({
      followingId: +followingId,
      followedId: +followedId,
    })
  )
}),
/**
 * POST / 언팔로우
 */
rest.post('http://localhost:3000/api/unfollow/:followingId/:followedId', async (req, res, ctx) => {
  const { followingId, followedId } = req.params
  const findedFollowingId = users.find(user => user.id === +followingId)
  const findedFollowedId = users.find(user => user.id === +followedId)

  if (!findedFollowedId || !findedFollowingId) {
    return res(
      ctx.json({
        errorMessage: 'This user does not exist.'
      })
    )
  }

  return res(
    ctx.status(200),
    ctx.json({
      followingId: +followingId,
      followedId: +followedId,
    })
  )
}),
/**
 * POST / 팔로워 제거
 */
rest.post('http://localhost:3000/api/removefollower/:followedId/:followingId', async (req, res, ctx) => {
  const { followedId, followingId } = req.params
  const findedFollowedId = users.find(user => user.id === +followedId)
  const findedFollowingId = users.find(user => user.id === +followingId)

  if (!findedFollowedId || !findedFollowingId) {
    return res(
      ctx.json({
        errorMessage: 'This user does not exist.'
      })
    )
  }

  return res(
    ctx.status(200),
    ctx.json({
      followedId: +followedId,
      followingId: +followingId,
    })
  )
}),
]