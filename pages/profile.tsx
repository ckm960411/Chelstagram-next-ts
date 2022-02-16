import { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useRouter } from "next/router";
import ProfileCard from "components/profile/ProfileCard";
import { Divider, Stack, Typography } from "@mui/material";
import Feed from "components/feeds/Feed";
import styled from "styled-components";
import axios from "axios";
import { loadMyPosts } from "store/postsSlice";

const StyledDivider = styled(Divider)`
  border: 1px solid #001487;
  margin-bottom: 16px;
`

const Profile: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)
  const myPosts = useAppSelector(state => state.posts.myPosts)

  useEffect(() => {
    if (!myInfo) {
      router.push('/')
      alert('Only logged-in users can access.')
      return
    }
    dispatch(loadMyPosts(myInfo!.id))
  }, [myInfo, router])

  return (
    <>
      <Head>
        <title>My Profile | Chelstagram</title>
      </Head>
      <ProfileCard />
      <Typography variant="h5" sx={{ color: '#001487', fontWeight: 600, mt: 2 }}>My Feeds</Typography>
      <StyledDivider />
      <Stack spacing={4}>
        {myPosts && myPosts.map(post => <Feed key={post.id} post={post} />)}
      </Stack>
    </>
  );
};

export default Profile;
