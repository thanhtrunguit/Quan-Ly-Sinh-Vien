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
                {/*<NavBar/>*/}
                <div className='function_title'>
                    <p>Admin</p>
                </div>

                <div className='adminSection'>
                    <div className='age_section'>
                        <p>Thay doi do tuoi</p>
                        <p>Do tuoi toi da</p>
                        <input className='inputBar' type='number' onChange={(e) => setageMax(e.target.value)}
                               value={ageMax}/>
                        <p>Do tuoi toi thieu</p>
                        <input className='inputBar' type='number' onChange={(e) => setageMin(e.target.value)}
                               value={ageMin}/>
                        <button className='btn login_btn submit_btn' onClick={handleSetChangeAge}>Submit</button>

                    </div>
                    <div className='class_section'>
                        <p>Thay doi lop</p>
                        <select className='search_student_class' id="opts"
                                onChange={(e) => setSearchClass(e.target.value)}
                                value={searchClass}>
                            <option value=''>Chon lop</option>
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
                        <p>Si so toi da</p>
                        <input className='inputBar' type='number' value={siso}
                               onChange={(e) => setSiso(e.target.value)}/>
                        <p>Ten lop moi</p>
                        <input className='inputBar' type='text' value={className}
                               onChange={(e) => setClassName(e.target.value)}/>
                        <button className='btn login_btn submit_btn'
                                onClick={handleSetChanegSiSo}>Submit
                        </button>

                    </div>
                    <div className='subject_section'>
                        <p>Thay doi mon hoc</p>
                        <select className='search_student_class' id="opts"
                                onChange={(e) => setSubjectPicker(e.target.value)}
                                value={subjectPicker}>
                            <option value=''>Chon mon</option>
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
                        <p>Ten mon hoc moi</p>
                        <input className='inputBar' type='text' value={subjectName}
                               onChange={(e) => setSubjectName(e.target.value)}/>
                        <button className='btn login_btn submit_btn' type='submit'
                                onClick={handleSetChanegMonHoc}>Submit
                        </button>

                    </div>
                    <div className='score_section'>
                        <p>Thay doi diem</p>
                        <select className='search_student_class' id="opts"
                                onChange={(e) => setSubjectPicker(e.target.value)}
                                value={subjectPicker}>
                            <option value=''>Chon mon</option>
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
                        <p>Diem dat mon toi thieu</p>
                        <input className='inputBar' type='number' value={score}
                               onChange={(e) => setScore(e.target.value)}/>
                        <button className='btn login_btn submit_btn'
                                onClick={handleSetChangeScore}>Submit
                        </button>

                    </div>
                </div>

            </>
        );

}

export default AdminFunctions