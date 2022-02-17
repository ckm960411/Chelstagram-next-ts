import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { FC } from "react";
import styled from "styled-components";

const StyledCard = styled(Card)`
  border-radius: 8px;
  padding: 16px !important;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledAvatar = styled(Avatar)<{bgColor?: boolean}>`
  background-color: ${props => props.bgColor === true ? '#001487' : null };
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
  return (
    <>
      {followList.map(user => (
        <StyledCard key={user.email}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user.profileImg
              ? <StyledAvatar src={user.profileImg} alt={user.nickname} /> 
              : <StyledAvatar bgColor>{user.nickname[0]}</StyledAvatar>
            }
            <StyledParagraph>{user.nickname} ({user.name})</StyledParagraph>
          </Box>
          <Button>
            {followers ? 'remove' : followings && 'unfollow' }
          </Button>
        </StyledCard>
      ))}
    </>
  )
}

export default FollowListItem