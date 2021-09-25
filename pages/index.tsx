import News from 'components/News'
import APICall from 'lib/api'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { TNewsReducerState } from 'reducers/slices/newsReducer'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>صفحه اصلی</title>
      </Head>
      <News />
    </>
  )
}

export const getStaticProps: GetStaticProps = async()=> {
  const { data: { result: news } } = await APICall<TNewsReducerState>({
    method: 'get',
    url: '/News/getnews',
    params: { page: 0, count: 10 }
  })
  
  return {
    props: {
      initialReduxState: { news }
    }
  }
} 

export default Home
