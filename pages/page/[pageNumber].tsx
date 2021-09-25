import News from 'components/News'
import APICall from 'lib/api'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import Head from 'next/head'
import { TNewsPayload, TNewsReducerState } from 'reducers/slices/newsReducer'
import { mapkeys } from 'lib/functions'

function HomePage() {
    return (
        <div>
            <Head>
                <title>صفحه اصلی</title>
            </Head>
            <News />
        </div>
    )
}

export default HomePage


export const getStaticPaths: GetStaticPaths = async function() {
    const testingCountAllNews = 11;
    const perPage = 10;

    const paths = [...Array(Math.floor(testingCountAllNews/perPage))].map((item,index)=> ({ params: { pageNumber: String(index+2) } }))
    
    return {
        paths: paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async function({ params }) {
    
    const { data: { result: news } } = await APICall<TNewsPayload>({
        method: 'get',
        url: '/News/getnews',
        params: { page: +params?.pageNumber!-1, count: 10 }
      })
      
      return {
        props: {
          initialReduxState: { news: mapkeys(news,'newsId') }
        },
      }
}