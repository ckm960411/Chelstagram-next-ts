import { FC } from "react";
import { Card, CardContent, Grid } from "@mui/material";
import { useAppSelector } from "store/hooks";
import ProfileImage from "components/profile/ProfileImage";
import ProfileInfo from "components/profile/ProfileInfo";

const ProfileCard: FC = () => {
  const myInfo = useAppSelector(state => state.users.myInfo)

  if (!myInfo) return <div>No User Information</div>

  return (
    <>
      <Card raised>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <ProfileImage profileImg={myInfo.profileImg} nickname={myInfo.nickname} />
            </Grid>
            <Grid item xs={12} md={8}>
              <ProfileInfo myInfo={myInfo} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default ProfileCard