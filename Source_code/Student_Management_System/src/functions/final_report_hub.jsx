import React from "react";
import NavBar from "../NavBar.jsx";
import {Link} from "react-router-dom";
import { RiBarChartGroupedFill } from "react-icons/ri";
import { FaChartColumn } from "react-icons/fa6";

function FinalReport() {
    return (
    <>
        <NavBar/>
        <div className='function_title'>
                <p>BÁO CÁO TỔNG KẾT</p>
        </div>
        <div className = 'frItems'>
            <Link to ='/finalReportSub' className='box item6'><p>Tổng kết môn</p><RiBarChartGroupedFill  className='function_icons'/></Link>
            <Link to = '/finalReportSem' className='box item7'><p>Tổng kết học kì</p><FaChartColumn className='function_icons' /></Link>
        </div>
    </>
    );
}

export default FinalReport