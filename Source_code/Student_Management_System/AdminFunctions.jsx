import React from "react";
import {HTMLInputTypeAttribute} from "react";
import {useState, useEffect} from "react";
import NavBar from "../NavBar.jsx";
import {Link, Navigate} from "react-router-dom";
import {DiffFilled} from "@ant-design/icons";

function AdminFunctions()
{
    const [ageMax, setageMax] = useState('')
    const [ageMin, setageMin] = useState('')
    const [siso, setSiso] = useState('')
    const [className, setClassName] = useState('')
    const [subjectName, setSubjectName] = useState('')
    const [score, setScore] = useState('')

    const [searchClass, setSearchClass] = useState('')
    const [subjectPicker, setSubjectPicker] = useState('')
    const [addStatus, setaddStatus] = useState('')
    const [dellStatus, setdellStatus] = useState('')

    const handleSetChangeAge = () => {
        let fdata = new FormData()
        fdata.append("ageMax", ageMax)
        fdata.append("ageMin", ageMin)
        fetch('http://localhost:8000/handleChangeSetting.php', {method: 'POST', body: fdata})
            .then(response => response.json())
            .then(() => {
                console.log('submitted')
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const handleSetChanegSiSo = () => {
        let fdata = new FormData()
        fdata.append("siso", siso)
        if(className != ""){
            fdata.append("className", className)
        }
        else if(className === ""){
            fdata.append("className", searchClass)
        }
        fdata.append('ID_LOP', searchClass)
        fetch('http://localhost:8000/handleChangeSetting.php', {method: 'POST', body: fdata})
            .then(response => response.json())
            .then(() => {
                console.log('submitted')
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const handleSetChanegMonHoc = () => {
        let fdata = new FormData()
        fdata.append("subjectName", subjectName)
        fdata.append("actions", )
        fdata.append("subjectName", subjectName)

        fetch('http://localhost:8000/baocao_mon.php', {method: 'POST', body: fdata})
            .then(response => response.json())
            .then(() => {
                console.log()
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const handleSetChangeScore = () => {
        let fdata = new FormData()
        fdata.append("score", score)
        fetch('http://localhost:8000/handleChangeSetting.php', {method: 'POST', body: fdata})
            .then(response => response.json())
            .then(() => {
                console.log()
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

        return (
            <>
                <NavBar/>
                <div className='function_title'>
                    <p>Admin</p>
                </div>

                <div className='adminSection'>
                    <div className="adminTitle"><b>THAY ĐỔI ĐỘ TUỔI</b></div>
                    <div className='age_section'>
                        <p>Tuổi tối thiểu:</p>
                        <input className='inputBar' type='number' onChange={(e) => setageMax(e.target.value)}
                               value={ageMax}/>
                        <p>Tuổi tối thiểu:</p>
                        <input className='inputBar' type='number' onChange={(e) => setageMin(e.target.value)}
                               value={ageMin}/>
                        <button className='btnA login_btn submit_btn' onClick={handleSetChangeAge}>Submit</button>

                    </div>
                    <div className="adminTitle"><b>THAY ĐỔI LỚP</b></div>
                    <div className='class_section'>
                        <select className='admin_dropdown'
                                onChange={(e) => setSearchClass(e.target.value)}
                                value={searchClass}>
                            <option value=''>lớp</option>
                            <option value='10CA'>10CA</option>
                            <option value='10A1'>10A1</option>
                            <option value='10A2'>10A2</option>
                            <option value='10A3'>10A3</option>
                            <option value='10A4'>10A4</option>
                            <option value='11A1'>11A1</option>
                            <option value='11A2'>11A2</option>
                            <option value='11A3'>11A3</option>
                            <option value='12A1'>12A1</option>
                            <option value='12A2'>12A2</option>
                        </select>
                        <p>Sĩ số tối đa:</p>
                        <input className='inputBar' type='number' value={siso}
                               onChange={(e) => setSiso(e.target.value)}/>
                        <p>Tên lớp mới:</p>
                        <input className='inputBar' type='text' value={className}
                               onChange={(e) => setClassName(e.target.value)}/>
                        <p>Thêm lớp:</p>
                        <input className='inputBar' type='text' value={className}
                               onChange={(e) => setClassName(e.target.value)}/>
                        <p>Xóa lớp:</p>
                        <input className='inputBar' type='text' value={className}
                               onChange={(e) => setClassName(e.target.value)}/>
                        <button className='btnA login_btn submit_btn'
                                onClick={handleSetChanegSiSo}>Submit
                        </button>

                    </div>
                    <div className="adminTitle"><b>THAY ĐỔI MÔN HỌC</b></div>
                    <div className='subject_section'>
                        <select className='admin_dropdown'
                                onChange={(e) => setSubjectPicker(e.target.value)}
                                value={subjectPicker}>
                            <option value=''>Môn</option>
                            <option value='1'>Toan</option>
                            <option value='2'>Ly</option>
                            <option value='3'>Hoa</option>
                            <option value='4'>Sinh</option>
                            <option value='7'>Su</option>
                            <option value='8'>Dia</option>
                            <option value='6'>Van</option>
                            <option value='10'>Dao duc</option>
                            <option value='12'>The duc</option>
                        </select>
                        <p>Tên môn mới:</p>
                        <input className='inputBar' type='text' value={subjectName}
                               onChange={(e) => {
                                   setSubjectName(e.target.value)
                               }}/>
                        <p>Thêm môn:</p>
                        <input className='inputBar' type='text' value={subjectName}
                               onChange={(e) => {
                                   setSubjectName(e.target.value)
                                   setaddStatus('add')
                                  }}/>
                        <p>Xóa môn:</p>          
                        <input className='inputBar' type='text' value={subjectName}
                               onChange={(e) => {
                                   setSubjectName(e.target.value)
                                   setdellStatus('dell')
                               }}/>
                        <button className='btnA login_btn submit_btn' type='submit'
                                onClick={handleSetChanegMonHoc}>Submit
                        </button>

                    </div>
                    <div className="adminTitle"><b>THAY ĐỔI ĐIỂM</b></div>
                    <div className='score_section'>
                        <select className='admin_dropdown'
                                onChange={(e) => setSubjectPicker(e.target.value)}
                                value={subjectPicker}>
                            <option value=''>Môn</option>
                            <option value='1'>Toan</option>
                            <option value='2'>Ly</option>
                            <option value='3'>Hoa</option>
                            <option value='4'>Sinh</option>
                            <option value='7'>Su</option>
                            <option value='8'>Dia</option>
                            <option value='6'>Van</option>
                            <option value='10'>Dao duc</option>
                            <option value='12'>The duc</option>
                        </select>
                        <p>Điểm đạt tối thiểu:</p>
                        <input className='inputBar' type='number' value={score}
                               onChange={(e) => setScore(e.target.value)}/>
                        <button className='btnA login_btn submit_btn'
                                onClick={handleSetChangeScore}>Submit
                        </button>

                    </div>
                </div>

            </>
        );

}

export default AdminFunctions