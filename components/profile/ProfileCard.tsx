import { FC } from "react";
import { Card, CardContent, Grid } from "@mui/material";
import ProfileImage from "components/profile/ProfileImage";
import ProfileInfo from "components/profile/ProfileInfo";

const ProfileCard: FC = () => {
  return (
    <>
      <Card raised>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <ProfileImage />
            </Grid>
            <Grid item xs={12} md={8}>
              <ProfileInfo />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default ProfileCard