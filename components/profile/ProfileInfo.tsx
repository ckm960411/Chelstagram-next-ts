import { FC, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Card, IconButton, Tooltip, Typography, Zoom } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { logoutRequest } from "store/usersSlice";
import EditProfileForm from "components/profile/EditProfileForm";
import FollowList from "components/profile/FollowLIst";

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
const ListButton = styled(Box)`
  width: 140px;
  padding: 10px;
  transition: all .2s;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 20, 135, .04);
    border-radius: 10px;
  }
`

const ProfileInfo: FC<{ myInfo: UserType }> = ({ myInfo }) => {
  const dispatch = useAppDispatch()
  const myPosts = useAppSelector(state => state.posts.myPosts)
  const router = useRouter()
  const [editing, setEditing] = useState<boolean>(false)
  const [openFollowers, setOpenFollowers] = useState<boolean>(false)
  const [openFollowings, setOpenFollowings] = useState<boolean>(false)

  const onEditProfile = () => {
    setEditing(true)
  }

  const onLogout = () => {
    const ok = window.confirm('Do you really want to log out?')
    if (!ok) return
    router.push('/')
    dispatch(logoutRequest())
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
              <Tooltip title="Edit Profile" placement="right" TransitionComponent={Zoom}>
                <IconButton onClick={onEditProfile}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </FlexBox>
            <Button 
              size="small" 
              variant="outlined"
              onClick={onLogout}
            >
              log out
            </Button>
          </FlexBox>
          <Typography variant="h6" gutterBottom>{myInfo.name}</Typography>
          <Typography>{myInfo.email}</Typography>
        </Box>
        <FlexBox sx={{ textAlign: 'center', mt: 2 }}>
          <ListButton>
            <Typography variant="overline" sx={{ fontSize: '14px' }}>Feeds</Typography>
            <Typography variant="h6">{myPosts.length}</Typography>
          </ListButton>
          <ListButton onClick={() => setOpenFollowers(true)}>
            <Typography variant="overline" sx={{ fontSize: '14px' }}>Follower</Typography>
            <Typography variant="h6">
              {myInfo.followers.length.toLocaleString("ko-KR")}
            </Typography>
          </ListButton>
          {openFollowers && (
            <FollowList 
              userId={myInfo.id}
              followers={myInfo.followers} 
              open={openFollowers} 
              setOpen={setOpenFollowers} 
            />
          )}
          <ListButton onClick={() => setOpenFollowings(true)}>
            <Typography variant="overline" sx={{ fontSize: '14px' }}>Following</Typography>
            <Typography variant="h6">
              {myInfo.followings.length.toLocaleString("ko-KR")}
            </Typography>
          </ListButton>
          {openFollowings && (
            <FollowList 
              userId={myInfo.id}
              followings={myInfo.followings} 
              open={openFollowings} 
              setOpen={setOpenFollowings} 
            />
          )}
        </FlexBox>
      </StyledInfo>
    </>
  )
}

export default ProfileInfo