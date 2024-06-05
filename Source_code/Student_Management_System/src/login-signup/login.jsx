import React, {useEffect, useContext} from "react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Home from "../home.jsx";
import logo from '../assets/logo-header.png'
import APP from "../App.jsx";
import create_class from "../functions/create_class.jsx";
import CreateClass from "../functions/create_class.jsx";
import {MalopContext} from "../MalopContext.jsx";
import {UserRole} from "../UserRoleContext.jsx";

function Login({ setIsLoggedIn }){
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userrole, setUserrole] = useState('')
    const [malopgv, setMalopgV] = useState('')
    const navigate = useNavigate();
    const { setMalopgv } = useContext(MalopContext);
    const { setuserrole } = useContext(UserRole);

    const handleLogin = (e) => {
        e.preventDefault()
        let fdata = new FormData()
        // fdata.append("username", 'admin')
        // fdata.append("password", 'password')
        fdata.append("username", username)
        fdata.append("password", password)
        fetch('http://localhost:8000/login.php', {method: 'POST', body: fdata})
            .then(response => response.json())
            .then(data => {
                setUserrole(data)
                setuserrole(data)
                setIsLoggedIn(true)

            })
            .catch(error => {
                alert('Sai, tài khoản hoặc mật khẩu')
                setPassword('')
                setUsername('')
                setUserrole('')
            });


    }
    useEffect(() => {
        if (userrole === 'users') {
            let fdata1 = new FormData()
            fdata1.append("username", username)
            fetch('http://localhost:8000/MALOP_get.php', {method: 'POST', body: fdata1})
                .then(response => response.json())
                .then(data => {
                    setMalopgv(data)
                    navigate('/home', { state: { isLoggedIn: true } });
                    }
                )
                .catch(error => {
                    alert('tai khoan khong ton tai, dang nhap lai!')
                    setPassword('')
                    setUsername('')
                    setUserrole('')
                });
        }
        if (userrole === 'admin') {
            navigate('/home', { state: { isLoggedIn: true } });
        }
    }, [userrole]);

    return (
        <>
            <div className='login'>
                <div className='container_login'>
                    <form onSubmit={handleLogin}>
                        <div className='login_content'>
                            <img src={logo} typeof={'png'}/>
                            <input onChange={(e) => setUsername(e.target.value)}
                                   placeholder="username"
                                   value={username}
                            /> <br/>
                            <input onChange={(e) => setPassword(e.target.value)} placeholder="password"
                               value={password}
                                   type='password'
                            /> <br/>
                            <button className='btn login_btn' type='submit'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login