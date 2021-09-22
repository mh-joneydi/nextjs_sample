import useUser from 'lib/useUser'
import Head from 'next/head';
import React from 'react'

function Profile() {
    const { isLogin, userInfo } = useUser();
    
    if(!isLogin) {
        return 'loading.....'
    }

    return (
        <div dir='ltr'>
            <Head>
                <title>پروفایل</title>
            </Head>
            {
            Object.entries(userInfo!).map(([key,val]: any) => (
                <div key={key}>
                    <strong>{key}</strong>&nbsp;:&nbsp;&nbsp;<span>{JSON.stringify(val)}</span>
                </div>
            ))
            }
        </div>
    )
}

export default Profile
