import React, {useContext} from "react";
import {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import NavBar from "../NavBar.jsx";
import { IoIosPersonAdd } from "react-icons/io";
import { SiGoogleclassroom } from "react-icons/si";
import { FaSearchDollar } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { GrScorecard } from "react-icons/gr";
import {UserRole} from "../UserRoleContext.jsx";

function Functions() {
    const { userrole } = useContext(UserRole);
    const handleClick = () => {
        console.log('hello')
    }
    return (
        <>
            <NavBar/>
            <div className= 'function_items'>
                <Link to ='/addStudent' className='box item1'><p>Tiếp nhận học sinh</p><IoIosPersonAdd className='function_icons'/></Link>
                <Link to ='/createClass' className='box item2'>
                    <p>Lập danh sách lớp</p>
                    <SiGoogleclassroom className='function_icons'/>
                </Link>
                <Link to ='/studentSearch' className='box item3'><p>Tra cứu học sinh</p><FaSearchDollar className='function_icons'/> </Link>
                <Link to ='/subjectScore' className='box item4'><p>Nhập bảng điểm</p><FaRegPenToSquare className='function_icons'/> </Link>
                <Link to = '/finalReport' className='box item5'><p>Báo cáo tổng kết</p><GrScorecard className='function_icons'/> </Link>
                {userrole === 'admin' ?
                        (
                            <>
                                <Link to='/adminFunctions' className='box item5'><p>Chỉnh sửa</p><GrScorecard
                                className='function_icons'/> </Link>
                            </>
                        )
                        :
                        (
                            <></>
                        )
                }

            </div>
        </>

    )
}

export default Functions