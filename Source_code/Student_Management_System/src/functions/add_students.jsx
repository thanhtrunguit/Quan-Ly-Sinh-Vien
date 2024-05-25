import React from "react";
import {HTMLInputTypeAttribute} from "react";
import {useState, useEffect} from "react";
import NavBar from "../NavBar.jsx";
import {Link, Navigate} from "react-router-dom";
import axios from 'axios'
function AddStudents(props) {
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    var currentTime = new Date()
    var year = currentTime.getFullYear()
    const { id, placeHolder } = props;
    const [student, setStudent] = useState({
        id: '',
        name: '',
        gender: '',
        dob: '',
        email: '',
        address: ''
    })
    const handleName = (e) => {
        e.persist()
        setStudent({...student, [e.target.name]: e.target.value})
    }
    const handleGender = (e) => {
        setStudent({...student, [e.target.name]: e.target.value})
    }
    const handleEmail = (e) => {
        setStudent({...student, [e.target.name]: e.target.value})
    }
    const handleAddress = (e) => {
        setStudent({...student, [e.target.name]: e.target.value})
    }
    const handleDob = (e) => {
        const dateFormated = formatDateToDisplay(e.target.value)
        setStudent({...student, [e.target.name]: e.target.value})
    }
    const addStudent = (e) => {
        e.preventDefault()

        let fdata = new FormData()
        // fdata.append("id", )
        fdata.append("name", student.name)
        fdata.append("gender", student.gender)
        fdata.append("dob", student.dob)
        fdata.append("email", student.email)
        fdata.append("address", student.address)
        axios.post('http://localhost:8000/themhsvippro.php', fdata)
            .then(response => {
                let ans = confirm("submitted")
                if(ans){
                    setCancel(true)
                }
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }
    const [cancel, setCancel] = useState(false)
    const handleCancel = () => {
        for (let [key, value] of Object.entries(student)) {
            if( value != "")
            {
                let ans =  confirm('you want to cancel, there seems to be data in the form')
                if (ans){
                    setCancel(true)
                    break;
                }
                break
            }
        }
    }
    if (cancel){
        // setStudent('', '', '', '' ,'')
        return (
            <Navigate to= '/functions' />
        )
    }
    const formatDateToDisplay = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    return (
        <>
            <NavBar/>
            <div className='function_title'>
                <p>Thêm học sinh</p>
            </div>
            <div className='form_container'>
                <form onSubmit={addStudent}
                method='post'>
                    <div className='form_content'>
                        <div className='form_item'>
                            <p>Họ và Tên</p>
                            <input onChange={(e) => handleName(e)} placeholder='Ngo Thanh Trung' type='text' name='name'
                                   value={student.name}/>
                        </div>
                        <div className='form_item'>
                            <p>Họ và Tên</p>
                            <select onChange={(e) => handleGender(e.target.value)}
                                    value={student.gender}>
                                <option value=''>Gioi tinh</option>
                                <option value='nam'>Nam</option>
                                <option value='nữ'>Nu</option>
                                <option value='khác'>other</option>
                            </select>
                        </div>
                        <div className='form_item'>
                            <p>Ngày sinh</p>
                            <input
                                className='date_time'
                                placeholder='Ngay sinh'
                                type='date'
                                value={(student.dob)} // Display in dd-mm-yyyy format by default
                                name='dob'
                                onChange={(e) => handleDob(e)}
                            />
                        </div>
                        <div className='form_item'>
                            <p>Email</p>
                            <input placeholder='test@gmail.com' type='text' onChange={(e) => handleEmail(e)}
                                   name='email'
                                   value={student.email}/>
                        </div>
                        <div className='form_item'>
                            <p>Địa chỉ</p>
                            <input placeholder='TP Ho Chi Minh' type='text' onChange={(e) => handleAddress(e)}
                                   name='address'
                                   value={student.address}/>
                        </div>
                        <button className='btn login_btn submit_btn' type='submit'>Submit</button>
                        <button className='btn cancel_btn' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddStudents