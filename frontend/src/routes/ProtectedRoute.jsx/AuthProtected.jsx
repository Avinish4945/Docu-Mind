import React from 'react'
import { useSelector } from 'react-redux'


import { Navigate, Outlet } from 'react-router'

const AuthProtected = () => {
    let{User}=useSelector((store)=>store.auth)

    if(!User){
    return <Navigate to={'/'}/>
  }
    
  return (
    <Outlet/>
  )
}

export default AuthProtected

