import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { removeFollower, unfollowUser } from "store/usersSlice";
import styled from "styled-components";

const StyledCard = styled(Card)`
  border-radius: 8px;
  padding: 16px !important;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledAvatar = styled(Avatar)<{bgcolor?: boolean}>`
  background-color: ${props => props.bgcolor === true ? '#001487' : null };
  margin-right: 8px;
`
const StyledParagraph = styled(Typography)`
  font-weight: 600;
`

type FollowListItemProps = {
  followList: FollowInfoType[]
  followers: number[] | undefined
  followings: number[] | undefined
}

const FollowListItem: FC<FollowListItemProps> = ({ followList, followers, followings }) => {
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)

  return (
    <>
      {followList.map(user => (
        <StyledCard key={user.email}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user.profileImg
              ? <StyledAvatar src={user.profileImg} alt={user.nickname} /> 
              : <StyledAvatar bgcolor>{user.nickname[0]}</StyledAvatar>
            }
            <StyledParagraph>{user.nickname} ({user.name})</StyledParagraph>
          </Box>
          <Button onClick={() => {
            if (followings) return dispatch(unfollowUser({ followingId: myInfo!.id, followedId: user.id }))
            if (followers) return dispatch(removeFollower({ followedId: myInfo!.id, followingId: user.id }))
          }}>
            {followers ? 'remove' : followings && 'unfollow' }
          </Button>
        </StyledCard>
      ))}
    </>
  )
}

export default FollowListItem