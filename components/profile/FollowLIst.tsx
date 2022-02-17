import { FC, useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { loadFollowers, loadFollowings, clearFollowList } from "store/usersSlice";
import FollowListItem from "components/profile/FollowListItem";

export type FollowReqType = {
  userId: number
  reqType: 'followers' | 'followings'
}

const FollowList: FC<FollowListProps> = ({ userId, open, setOpen, followers, followings }) => {
  const dispatch = useAppDispatch()
  const myFollowers = useAppSelector(state => state.users.myFollowers)
  const myFollowings = useAppSelector(state => state.users.myFollowings)
  const [followList, setFollowList] = useState<FollowInfoType[]>([])

  useEffect(() => {
    if (followers) {
      const data: FollowReqType = { userId, reqType: 'followers' }
      dispatch(loadFollowers(data))
    } else if (followings) {
      const data: FollowReqType = { userId, reqType: 'followings' }
      dispatch(loadFollowings(data))
    }
  }, [])

  useEffect(() => {
    if (followers) return setFollowList(myFollowers)
    if (followings) return setFollowList(myFollowings)
  }, [myFollowers, myFollowings])

  const onCloseModal = () => {
    setOpen(false)
    dispatch(clearFollowList())
  }

  return (
    <Dialog
      open={open}
      onClose={onCloseModal}
      fullWidth
      sx={{ maxHeight: '600px', margin: 'auto' }}
    >
      <DialogTitle>
        {followers ? 'Followers List' : followings ? 'Followings List' : null}
      </DialogTitle>
      <DialogContent>
        <FollowListItem 
          followList={followList} 
          followers={followers}
          followings={followings}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseModal}>close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FollowList