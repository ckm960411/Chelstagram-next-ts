import { getHomeData } from 'lib/players/get-home-data'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await getHomeData()
  const result = response.message
  return {
    props: { result }
  }
}

const Home: NextPage<{ result: string }> = ({ result }) => {
  if (!result) return (<div>loading...</div>)

  return (
    <div>
      <Head>
        <title>Chelstagram</title>
      </Head>
      {result}
    </div>
  )
}

export default Home
