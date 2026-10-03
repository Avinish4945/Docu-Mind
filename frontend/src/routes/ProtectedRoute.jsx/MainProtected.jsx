import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import store from '../../app/store'

const MainProtected = () => {
  let {User}=useSelector((store)=>store.auth)

  

   if(User){
      if(User.role=="admin"){
        return <Navigate to={'/main/admin'}/>
      }

      else{
        return <Navigate to={'/main'}/>
      }
      
      }
  return (
    <Outlet/>
  )
}

export default MainProtected
