import React from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// function to authonticate user
const Auth = ({children})=>{
const [cookies, setCookie, removeCookie] = useCookies(['token']);
let inLogin = useSelector(state => state.inLogin);
inLogin = inLogin || cookies.token;

return inLogin ? children : <Navigate to={"/login"}/>
}

export default Auth;