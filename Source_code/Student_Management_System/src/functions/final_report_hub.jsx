import React from "react";
import NavBar from "../NavBar.jsx";
import {Link} from "react-router-dom";

function FinalReport() {
    return (
    <>
        <NavBar/>
        <div className='function_title'>
                <p>Báo cáo tổng kết</p>
        </div>
        <div className = 'frItems'>
            <Link to ='/finalReportSub' className='box item6'><p>Tổng kết môn</p></Link>
            <Link to = '/finalReportSem' className='box item7'><p>Tổng kết học kì</p></Link>
        </div>
    </>
    );
}

export default FinalReport