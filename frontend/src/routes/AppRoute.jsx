import React from 'react'
import {RouterProvider,createBrowserRouter} from 'react-router'
import AuthLayout from '../app/Layout/AuthLayout'
import LoginPage from '../features/auth/ui/pages/LoginPage'
import RegisterPage from '../features/auth/ui/pages/RegisterPage'
import { AuthHook } from '../features/auth/hooks/AuthHook'
import { useEffect } from 'react'
import { hydrating } from '../features/auth/api/authApi'
import { useDispatch } from 'react-redux'
import { addUsers } from '../features/auth/state/AuthSlice'

import AdminDashboard from '../features/admin/ui/pages/AdminDasboard'
import AuthProtected from './ProtectedRoute.jsx/AuthProtected'
import Home from '../features/home/ui/pages/Home'
import MainProtected from './ProtectedRoute.jsx/MainProtected'
import MainLayout from '../app/Layout/MainLayout'
import AdminLayout from '../app/Layout/AdminLayout'
import Documents from '../features/admin/ui/pages/Documents'
import Attention from '../features/admin/ui/pages/Attention'
import AttentionDetail from '../features/admin/ui/pages/AttentionDetail'

import UserAttention from '../features/home/ui/pages/UserAttention'
import UserAttentiondetail from '../features/home/ui/pages/UserAttentiondetail'
import UserDocument from '../features/home/ui/pages/UserDocument'
import Chat from '../features/home/ui/pages/Chat'

const AppRoute = () => {
    let dispatch=useDispatch()
   
    useEffect(()=>{
        (async()=>{
         let res=await hydrating();
         dispatch(addUsers(res));

        })()

    },[])
    let routes=
        createBrowserRouter([{
            path:'',
            element:<MainProtected/>,
            children:[{
                path:'',
                  element:<AuthLayout/>,
            children:[{
                path:'',
                element:<LoginPage/>
            },{
                path:'register',
                element:<RegisterPage/>
            }]
            }]
        },{
           path:'/main',
           element:<AuthProtected/>,
           children:[{
            path:'',
            element:<MainLayout/>,
            children:[{
            path:'',
            element:<Home/>
           },{
            path:'attention',
            element:<UserAttention/>
           },{
             path:"documents/:id",
                element:<UserAttentiondetail/>
           },{
            path:"documents",
            element:<UserDocument/>
           },{
            path:'chat',
            element:<Chat/>
           }]
           },{
            path:'admin',
            element:<AdminLayout/>,
            children:[{
                path:'',
                element:<AdminDashboard/>
            },{
                path:'documents',
                element:<Documents/>
            },{
                path:'attention',
                element:<Attention/>
            },{
                path:"documents/:id",
                element:<AttentionDetail/>
            }]
           }]
        }])
    
 

  return <RouterProvider router={routes}/>
}

export default AppRoute

