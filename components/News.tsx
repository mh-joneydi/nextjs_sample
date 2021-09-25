import { useRouter } from 'next/router'
import React from 'react'
import { useAppSelector } from 'store'
import RouterLink from './customized/RouterLink'
import Text from './customized/Text'

function News() {
    const news = useAppSelector( state=> Object.values(state.news)),
    // تصور میکنیم که از سرور مقدار کل را گرفته و در استور قرار دادیم
    count = 11,
    router = useRouter(),
    page = router.query.pageNumber;

    return (
        <div>
            <Text variant='h2'>جدید ترین اخبار</Text>
            <ul>
                {news.map( item=>(
                    <li key={item.newsId}><RouterLink variant='h5' href={`/news/${item.newsId}`}>{item.title}</RouterLink></li>
                ) )}
            </ul>
            pagination: 
            <ul style={{ fontSize: 20 }}>
                { 
                    [...Array(Math.ceil(count/10))].map((item,index)=> {
                        if(index===0) {
                            return (
                                <li key={index}>
                                    { page? <RouterLink href={`/`}>{index+1}</RouterLink> : index+1}
                                </li>
                            )
                        }
                        return (
                            <li key={index}>
                                { (+page!)!==index+1? <RouterLink href={`/page/${index+1}`}>{index+1}</RouterLink> : index+1}
                            </li>
                        )
                    }) 
                }
            </ul>
        </div>
    )
}

export default News
