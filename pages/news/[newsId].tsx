import APICall from 'lib/api';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { INewsDetails, TNewsPayload } from 'reducers/slices/newsReducer';
import { useAppSelector } from 'store';

function NewsItem() {
    const router = useRouter(),
    newsInfo = useAppSelector( state=> state.news[router.query.newsId as string] )
    return (
        router.isFallback
        ? 'loading...'
        : (
            <ul>
                {Object.values(newsInfo).map( newsInfoField=> (
                    <li key={newsInfoField}>{newsInfoField}</li>
                ) )}
            </ul>
        )
    )
}

export default NewsItem;


export const getStaticPaths: GetStaticPaths = async function() {
    const { data: { result: news } } = await APICall<TNewsPayload>({
        method: 'get',
        url: '/News/getnews',
    })
    
    const paths = news.map( item=> ({ params: { newsId: item.newsId } }) );

    return {
        paths: paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async function({ params }) {
    
    const { data: { result: newsInfo } } = await APICall<INewsDetails>({
        method: 'get',
        url: '/news/GetNewsInfo',
        params: { newsId: params?.newsId }
    })
      
    return {
        props: {
            initialReduxState: { news: { [newsInfo.newsId]: newsInfo } }
        },
    }
}
