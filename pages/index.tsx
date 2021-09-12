import Test from 'components/Test'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>صفحه اصلی</title>
      </Head>
      <Test />
    </div>
  )
}

export default Home
