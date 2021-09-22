import { useEffect } from 'react'
import Router from 'next/router'
import { useAppSelector } from 'store'

export default function useUser(redirectTo: string = '/') {
  const { isLogin, userInfo } = useAppSelector( state=> state.user )

  useEffect(() => {
    if(!isLogin) Router.replace(redirectTo)
  }, [isLogin, userInfo, redirectTo])

  return { isLogin, userInfo }
}