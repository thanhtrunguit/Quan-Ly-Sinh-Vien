import React from "react";
import {HTMLInputTypeAttribute} from "react";
import {useState, useEffect} from "react";
import NavBar from "../NavBar.jsx";
import {Link, Navigate} from "react-router-dom";
import {DiffFilled} from "@ant-design/icons";
import axios from "axios";

function AdminFunctions()
{
    const [ageMax, setageMax] = useState('')
    const [ageMin, setageMin] = useState('')
    const [siso, setSiso] = useState('')
    const [className, setClassName] = useState('')
    const [classNameNew, setClassNameNew] = useState('')
    const [subjectName, setSubjectName] = useState('')
    const [addSubject, setAddsubject] = useState('')
    const [addClass, setaddClass] = useState('')
    const [dellSubject, setDellSubject] = useState('')
    const [dellClass, setDellClass] = useState('')
    const [score, setScore] = useState('')

    const [searchClass, setSearchClass] = useState('')
    const [subjectPicker, setSubjectPicker] = useState('')
    const [subjectPickerScore, setSubjectPickerScore] = useState('')
    const [delsubjectPicker, setDellSubjectPicker] = useState('')

    const [listOfClass, setlistOfClass] = useState([])

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch('http://localhost:8000/dslop.php');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setlistOfClass(data);
            } catch (error) {
                console.error('Error fetching class list:', error);
            }
        };

        fetchClasses();
    }, []);
    const [listOfSubs, setListOfSubs] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/MAMON_get.php')
            .then(response => response.json())
            .then(data => setListOfSubs(data))
            .catch(error => console.error('Error fetching class list:', error));
    }, []);



    const handleSetChangeAge = () => {
        let fdata = new FormData()
        fdata.append("ageMax", ageMax)
        fdata.append("ageMin", ageMin)
        axios.post('http://localhost:8000/handleChangeSetting.php', fdata)
            .then(() => {
                alert('Thay doi thanh cong')
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const handleSetChanegLop = () => {
        let fdata = new FormData()
        if(searchClass != ""){
            fdata.append("nhanlop", searchClass)
        }
        if(siso != '')
        {
            fdata.append("nhansiso", siso)
        }
        if(classNameNew != '')
        {
            fdata.append("tenlopmoi", classNameNew)
        }
        if(addClass != '')
        {
            fdata.append("lopthem", addClass)
        }
        if(dellClass != '')
        {
            fdata.append("lopxoa", dellClass)
        }
        axios.post('http://localhost:8000/class_settings.php', fdata)
            .then(() => {
                alert('Đã thay đổi thành công')
                setSiso('')
                setSearchClass('')
                setClassNameNew('')
                setaddClass('')
                setDellClass('')
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const handleSetChanegMonHoc = () => {

        let fdata = new FormData()
        if(subjectName != "")
        {
            fdata.append("subjectName", subjectName)
            fdata.append("id_monhoc", subjectPicker)
        }

        if(addSubject != ""){
            fdata.append("actions_add", '1')
            fdata.append("TEN_MONHOC_add", addSubject)
        }
        if(addSubject != "") {
            fdata.append("actions_dell", '2')
            fdata.append("id_monhoc_dell", subjectPicker)
        }
        axios.post('http://localhost:8000/SubjectChangeSetting.php', fdata)
            .then(() => {
                alert('Đã thay đổi thành công')
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const handleSetChangeScore = () => {
        let fdata = new FormData()

        fdata.append("score", score)
        fdata.append('MAMON', subjectPickerScore)
        axios.post('http://localhost:8000/handleChangeSetting.php', fdata)
            .then(() => {
                alert('Đã thay đổi thành công')
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
                        <p>Tuổi tối đa:</p>
                        <input className='inputBar' type='number' onChange={(e) => setageMin(e.target.value)}
                               value={ageMin}/>
                        <button className='btn login_btn submit_btn' onClick={handleSetChangeAge}>Submit</button>
                    </div>
                    <div className="adminTitle"><b>THAY ĐỔI LỚP</b></div>
                    <div className='class_section'>
                        <select className='search_student_class'
                                onChange={(e) => setSearchClass(e.target.value)}
                                value={searchClass}>
                            <option value="">Chon Lop</option>
                            {
                                listOfClass.length > 0 ? (
                                    listOfClass.map((className, index) => (
                                        <option key={index} value={className}>
                                            {className}
                                        </option>
                                    ))
                                ) : (
                                    <>
                                    </>
                                )}
                        </select>
                        <p>Sĩ số tối đa:</p>
                        <input className='inputBar' type='number' value={siso}
                               onChange={(e) => setSiso(e.target.value)}/>
                        <p>Tên lớp mới:</p>
                        <input className='inputBar' type='text' value={classNameNew}
                               onChange={(e) => setClassNameNew(e.target.value)}/>
                        <p>Thêm lớp:</p>
                        <input className='inputBar' type='text' value={addClass}
                               onChange={(e) => setaddClass(e.target.value)}/>
                        <p>Xóa lớp:</p>
                        <select className='search_student_class'
                                onChange={(e) => setDellClass(e.target.value)}
                                value={dellClass}>
                            <option value="">Chon Lop</option>
                            {
                                listOfClass.length > 0 ? (
                                    listOfClass.map((className, index) => (
                                        <option key={index} value={className}>
                                            {className}
                                        </option>
                                    ))
                                ) : (
                                    <>
                                    </>
                                )}
                        </select>
                        <button className='btn login_btn submit_btn'
                                onClick={handleSetChanegLop}>Submit
                        </button>

                    </div>
                    <div className="adminTitle"><b>THAY ĐỔI MÔN HỌC</b></div>
                    <div className='subject_section'>
                        <select className='search_student_class'
                                onChange={(e) => setSubjectPicker(e.target.value)}
                                value={subjectPicker}>
                            <option value="">Chon Mon</option>
                            {
                                listOfSubs.length > 0 ? (
                                    listOfSubs.map((className, index) => (
                                        <option key={index} value={className.ID_MONHOC}>
                                            {className.TEN_MONHOC}
                                        </option>
                                    ))
                                ) : (
                                    <>
                                    </>
                                )}
                        </select>
                        <p>Tên môn mới:</p>
                        <input className='inputBar' type='text' value={subjectName}
                               onChange={(e) => {
                                   setSubjectName(e.target.value)
                               }}/>
                        <p>Thêm môn:</p>
                        <input className='inputBar' type='text' value={addSubject}
                               onChange={(e) => {
                                   setAddsubject(e.target.value)
                               }}/>
                        <p>Xóa môn:</p>
                        <input className='inputBar' type='text' value={dellSubject}
                               onChange={(e) => {
                                   setDellSubject(e.target.value)
                               }}/>
                        <button className='btn login_btn submit_btn' type='submit'
                                onClick={handleSetChanegMonHoc}>Submit
                        </button>

                    </div>
                    <div className="adminTitle"><b>THAY ĐỔI ĐIỂM</b></div>
                    <div className='score_section'>
                        <select className='search_student_class'
                                onChange={(e) => setSubjectPickerScore(e.target.value)}
                                value={subjectPickerScore}>
                            <option value="">Chon Mon</option>
                            {
                                listOfSubs.length > 0 ? (
                                    listOfSubs.map((className, index) => (
                                        <option key={index} value={className.ID_MONHOC}>
                                            {className.TEN_MONHOC}
                                        </option>
                                    ))
                                ) : (
                                    <>
                                    </>
                                )}
                        </select>
                        <p>Điểm đạt tối thiểu:</p>
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