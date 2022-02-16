import { getHomeData } from 'lib/players/get-home-data'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

export const getStaticProps: GetStaticProps = async () => {
  const response = await getHomeData()
  const result = response.message
  return {
    props: { result }
  }
}

const Home: NextPage<{result: string[]}> = ({ result }) => {

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