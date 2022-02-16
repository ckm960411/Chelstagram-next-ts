import { FC } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import styled from "styled-components";
import { useAppSelector } from "store/hooks";

const StyledInfo = styled(Card)`
  height: 100%;
  box-shadow: none;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ProfileInfo: FC = () => {
  const myInfo = useAppSelector(state => state.users.myInfo)
  const myPosts = useAppSelector(state => state.posts.myPosts)

  if (!myInfo) return <div>No User Information</div>

  return (
    <>
      <StyledInfo>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ color: '#001487', fontWeight: 600 }} variant="h5" component="span">
              {myInfo.nickname || 'Nickname'}
            </Typography>
            <Button size="small" variant="outlined">log out</Button>
          </Box>
          <Typography variant="h6" gutterBottom>{myInfo.name || 'User Name'}</Typography>
          <Typography>{myInfo.email || 'User Email'}</Typography>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="overline" sx={{ fontSize: '14px' }}>Feeds</Typography>
            <Typography variant="h6">{myPosts.length}</Typography>
          </Box>
          <Box>
            <Typography variant="overline" sx={{ fontSize: '14px' }}>Follower</Typography>
            <Typography variant="h6">{(10000).toLocaleString("ko-KR")}</Typography>
          </Box>
          <Box>
            <Typography variant="overline" sx={{ fontSize: '14px' }}>Following</Typography>
            <Typography variant="h6">100</Typography>
          </Box>
        </Box>
      </StyledInfo>
    </>
  )
}

export default ProfileInfo