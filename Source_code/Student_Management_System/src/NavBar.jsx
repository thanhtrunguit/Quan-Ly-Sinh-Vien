import Nav from 'react-bootstrap/Nav';
import {Navigate} from "react-router-dom";
import {useState} from "react";
import login from "./login-signup/login.jsx";
import {Link} from "react-router-dom";
import React from "react";
import Login from "./login-signup/login.jsx";
import {HomeOutlined} from '@ant-design/icons'
import {UnorderedListOutlined} from "@ant-design/icons";
import {ForkOutlined} from "@ant-design/icons";
import {OpenAIOutlined} from "@ant-design/icons";
import {SlackOutlined} from "@ant-design/icons";
import {LogoutOutlined} from "@ant-design/icons";
import { LuLogOut } from "react-icons/lu";
function NavBar(){

    return(
        <>
            <nav className='navBar'>
                <SlackOutlined className='navbar_logo' />
                <ul>
                    {/*<li> <HomeOutlined id='icons'/> <div id='title'><Link to='/home' title='Home' >Home</Link></div></li>*/}
                    <li><HomeOutlined id='icons'/>
                        <Link to='/home' title='Home' id='title'>Home</Link>
                    </li>
                    <li><UnorderedListOutlined id='icons'/>
                        <Link to='/functions' title='Functions' id='title'>Function</Link>
                    </li>
                    {/*<li className='login_section_navbar'><Link to='/login'>Login</Link></li>*/}
                    <li><ForkOutlined id='icons'/>
                        <Link to='/credit' id='title'>Credit</Link>
                    </li>
                    <li className='logout_btn'>
                        <LuLogOut id='icons'/>
                        <Link to='/' id='title'>Log out</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar