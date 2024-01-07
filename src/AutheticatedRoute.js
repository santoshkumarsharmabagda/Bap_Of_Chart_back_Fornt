import { Navigate, Outlet } from "react-router-dom"

export const AuthenticatedRoute = ()=>{
    if(!localStorage.getItem('token')){
        return<Navigate to='/login'/>
    }else{
return<Outlet/>
    }
}