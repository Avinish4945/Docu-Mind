import axios from "axios"
import { axiosInstance } from "../../../app/axios/AxiosInstance"

export const LoginUser=async(credentials)=>{
    try {
        let res= await axiosInstance.post('/api/auth/login',credentials)
        console.log(res);
        return res.data.user;
    } catch (error) {
        console.log("erron in login",error)
    
        
    }
}

export const hydrating=async()=>{
    try {
        let res =await axiosInstance.get('/api/auth/me');
        console.log(res);
        return res.data.user;

        
    } catch (error) {
        console.log("error in hydration",error);
        
    }
}

    export const registerUser=async(credentials)=>{
         try {
        let res= await axiosInstance.post('/api/auth/register',credentials)
        console.log(res);
        alert('registered');
        return res.data.user;
    } catch (error) {
        console.log("erron in register",error)
    
        
    }
}

export const logoutUser = async () => {
    try {
        const res = await axiosInstance.get("/api/auth/logout");
        console.log(res);
        return res;
    } catch (error) {
        console.log("error in logout", error);
        
    }
};