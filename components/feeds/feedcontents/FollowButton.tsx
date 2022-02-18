import { FC, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { followUser, unfollowUser } from "store/usersSlice";

const FollowButton: FC<{followedId: number}> = ({ followedId }) => {
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  useEffect(() => {
    if (!myInfo) return
    setIsFollowing(myInfo.followings.includes(followedId))
  }, [myInfo?.followings])

  const onFollow = () => {
    if (!myInfo) {
      return alert('You can follow after logging in.')
    }
    if (!isFollowing) { // 팔로우하기
      const data: FollowDataType = { followingId: myInfo.id, followedId }
      return dispatch(followUser(data))
    }
    if (isFollowing) { // 언팔로우하기
      const data: FollowDataType = { followingId: myInfo.id, followedId }
      return dispatch(unfollowUser(data))
    }
  }

  return (
    <Button 
      variant="outlined" 
      size="small" 
      onClick={onFollow}
    >
      {!myInfo || !isFollowing ? 'follow' : 'unfollow'}
    </Button>
  )
}

export default FollowButton