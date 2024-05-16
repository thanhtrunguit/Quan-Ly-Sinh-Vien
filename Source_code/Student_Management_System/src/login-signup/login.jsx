import React from "react";
import {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import Home from "../home.jsx";
import logo from '../assets/logo-header.png'
function Login(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleClick = () =>
    {
        // if(email == 'trung' && password == '123'){
        //     setIsLoggedIn(true)
        // }
        setIsLoggedIn(true)
        setPassword('')
        setEmail('')
    }
    const handleEmail = (e) =>
    {
        setEmail(e.target.value)
    }
    const handlePassword = (e) =>
    {
        setPassword(e.target.value)
    }
    if(isLoggedIn)
    {
        return(
            <Navigate to='/home'/>
        )
    }
    else{
        return (
            <>
                <div className='login'>
                    <div className='container_login'>
                        <div className='login_content'>
                            <img src={logo} typeof={'png'}/>
                            <input onChange={(e) => handleEmail(e)} placeholder="username"/> <br/>
                            <input onChange={(e) => handlePassword(e)} placeholder="password"/> <br/>
                            <button className='btn login_btn' onClick={handleClick}>Login</button>
                            <Link to = '/password_retrieve' className='password_forgot'>Forgot your password?</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Login