import { useMediaQuery } from "@mui/material"
import { Grid, useTheme } from "@mui/material"
import Feed from "components/talk/Feed"
import Sidebar from "components/talk/Sidebar"
import { NextPage } from "next"
import Head from "next/head"

const Talk: NextPage = () => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <>
      <Head>
        <title>Talk with other Blues | Chelstagram</title>
      </Head>
      <Grid container>
        <Grid item md={8} xs={12}>
          <Feed />
        </Grid>
        <Grid item md={4} sx={downMd ? { display: 'none' } : { paddingLeft: 2 }}>
          <Sidebar />
        </Grid>
      </Grid>
    </>
  )
}

export default Talk