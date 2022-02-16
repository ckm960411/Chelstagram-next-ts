import { FC, useState } from "react";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import styled from "styled-components";
import { useAppSelector } from "store/hooks";
import EditProfileForm from "components/profile/EditProfileForm";

const StyledInfo = styled(Card)`
  height: 100%;
  box-shadow: none;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`

const ProfileInfo: FC<{ myInfo: UserType }> = ({ myInfo }) => {
  const myPosts = useAppSelector(state => state.posts.myPosts)
  const [editing, setEditing] = useState(false)

  const onEditProfile = () => {
    setEditing(true)
  }

  return (
    <>
      {editing && <EditProfileForm editing={editing} setEditing={setEditing} myInfo={myInfo} />}
      <StyledInfo>
        <Box>
          <FlexBox>
            <FlexBox sx={{ alignItems: 'center' }}>
              <Typography sx={{ color: '#001487', fontWeight: 600 }} variant="h5" component="span">
                {myInfo.nickname}
              </Typography>
              <IconButton onClick={onEditProfile}>
                <SettingsIcon />
              </IconButton>
            </FlexBox>
            <Button size="small" variant="outlined">log out</Button>
          </FlexBox>
          <Typography variant="h6" gutterBottom>{myInfo.name}</Typography>
          <Typography>{myInfo.email}</Typography>
        </Box>
        <FlexBox sx={{ textAlign: 'center', mt: 2 }}>
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
        </FlexBox>
      </StyledInfo>
    </>
  )
}

export default ProfileInfo