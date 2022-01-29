import axios from 'axios'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await axios.get('http://localhost:3000/').then(res => res.data)
  const result = res.message
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
