import Head from "next/head"
import { useEffect } from "react"
import { GetServerSideProps, NextPage } from "next"
import { Stack, useMediaQuery } from "@mui/material"
import { Grid, useTheme } from "@mui/material"
import axios from "axios"
import Feed from "components/talk/Feed"
import Sidebar from "components/talk/Sidebar"
import { PostTypes } from "types/postTypes"
import { useAppDispatch } from "store/hooks"
import { addPostsData } from "store/postsSlice"
import FeedForm from "components/talk/FeedForm"

const Talk: NextPage<{ postsData: PostTypes[] }> = ({ postsData }) => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    dispatch(addPostsData(postsData))
  }, [dispatch, postsData])

  return (
    <>
      <Head>
        <title>Talk with other Blues | Chelstagram</title>
      </Head>
      <Grid container>
        <Grid item md={8} sm={12} xs={12}>
          <Stack spacing={4}>
            <FeedForm />
            {postsData.map((post, i) => <Feed key={i} post={post} />)}
          </Stack>
        </Grid>
        <Grid item md={4} sx={downMd ? { display: 'none' } : { paddingLeft: 2 }}>
          <Sidebar />
        </Grid>
      </Grid>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get('http://localhost:3000/posts').then(res => res.data)
  const postsData = res.posts
  if (!postsData) return (<div>Loading...</div>)
  return {
    props: { postsData }
  }
}

export default Talk