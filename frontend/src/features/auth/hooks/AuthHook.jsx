import { useNavigate } from "react-router"
import { LoginUser,logoutUser,registerUser} from "../api/authApi";
import { useDispatch } from "react-redux";
import { addUsers, removeUser } from "../state/AuthSlice";


export const AuthHook=()=>{
    let navigate=useNavigate();
    let dispatch=useDispatch()

    const handleLogin=async(data)=>{
        
     let result = await LoginUser(data);
      console.log(result)
     dispatch(addUsers(result));



    }

      const handleRegister=(data)=>{
        registerUser(data);

    }

    const handleLogout = async () => {
    try {
        await logoutUser();

        dispatch(removeUser());

        window.location.href = "/";
    } catch (error) {
        console.error("Logout failed:", error);
    }
};
   


    return{
        navigate,
        handleLogin,
        handleRegister,
        handleLogout
    }

}
