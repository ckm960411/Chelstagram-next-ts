import { rest } from "msw";
import { players } from "dummyData/players"
import { users } from "dummyData/users";
import { posts } from "dummyData/posts";
import { getRandomID } from "lib/utils/getRandomID";
import { format } from "date-fns";

interface PostLoginReqBody extends LoginFormValue {}
interface PostSignUpReqBody extends SignUpFormValue {}
interface PostFollowReqBody extends FollowReqType {}
interface PatchProfileReqBody extends EditProfileType {}
interface PostPlayerCommentReqBody extends PostPlayerCommentType {}
interface PatchPlayerCommentReqBody extends EditPlayerCommentType {}
interface DeletePlayerCommentReqBody extends DeletePlayerCommentType {}
interface PostPostReqBody extends PostFeedType {}
interface PatchPostReqBody extends EditFeedType {}
interface PostPostCommentReqBody extends PostFeedCommentType {}
interface PatchPostCommentReqBody extends EditFeedCommentType {}

export const handlers = [
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
  // POST / Logout
  rest.post('http://localhost:3000/api/user/logout', async (req, res, ctx) => {
    return res(
      ctx.status(200)
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
        id: getRandomID(),
        followers: [],
        followings: [],
        name, nickname, email
      })
    )
  }),
  // PATCH / Edit Profile
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
  // POST / Load Followers or Followings
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
  // POST / Follow User
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
  // POST / Unfollow User
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
  // GET / players
  rest.get('http://localhost:3000/players', async(req, res, ctx) => {
    return res(
      ctx.json(players)
    )
  }),
  // GET / player
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
  // POST / 선수 댓글 달기
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
  // PATCH / 선수 댓글 수정
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
  // DELETE / 선수 댓글 삭제
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
  // GET / 게시글들 불러오기
  rest.get('http://localhost:3000/posts', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        posts
      })
    )
  }),
  // POST / 게시글 작성
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
  // PATCH / 게시글 수정
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
  // DELETE / 게시글 삭제
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
  // POST / 게시글 댓글 작성
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
  // PATCH / 게시글 댓글 수정
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
  // DELETE / 게시글 댓글 삭제
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
  // GET / 자기 게시글 불러오기
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