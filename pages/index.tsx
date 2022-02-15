import axios from 'axios'
import { getHomeData } from 'lib/players/get-home-data'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

// export const getStaticProps: GetStaticProps = async () => {
//   const response = await getHomeData()
//   const result = response.message
//   return {
//     props: { result }
//   }
// }

const Home: NextPage = () => {

  const print = async () => {
    const response = await fetch(`http://localhost:8080/api/v1/players`)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    console.log(print())
  }, [])

  return (
    <div>
      <Head>
        <title>Chelstagram</title>
      </Head>
      {/* {result} */}
    </div>
  )
}

export default Home
