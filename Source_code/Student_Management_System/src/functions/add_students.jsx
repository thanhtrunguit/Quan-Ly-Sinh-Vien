import React from "react";
import {HTMLInputTypeAttribute} from "react";
import {useState, useEffect} from "react";
import NavBar from "../NavBar.jsx";
import {Link, Navigate} from "react-router-dom";
import axios from 'axios'
function AddStudents(props) {
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    const { id, placeHolder } = props;
    const [student, setStudent] = useState({
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
        setStudent({...student, [e.target.name]: e.target.value})
    }
    const addStudent = (e) => {
        console.log('submitted')
        e.preventDefault()

        const data = {
            name: student.name,
            gender: student.gender,
            email: student.email,
            address: student.address
        }

        // axios.post().then()
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
    return (
        <>
            <NavBar/>
            <div className='function_title'>
                <p>Thêm học sinh</p>
            </div>
            <div className='form_container'>
                <form onSubmit={addStudent}>
                <div className='form_content'>
                    <div className='form_item'>
                        <p>Họ và Tên</p>
                        <input onChange={(e) => handleName(e)} placeholder='Ngo Thanh Trung' type='text' name='name'
                               value={student.name}/>
                    </div>
                    <div className='form_item'>
                        <p>Gioi tinh</p>
                        <input placeholder="Nam" list="opts" onChange={(e) => handleGender(e)} name='gender'
                               value={student.gender}/>
                        <datalist id="opts">
                            <option value='male'>Nam</option>
                            <option value='femal'>Nu</option>
                            <option value='other'>Khac</option>
                        </datalist>
                    </div>
                    <div className='form_item'>
                        <p>Ngay sinh</p>
                        <input className='date_time' placeholder='Ngay sinh' type='date'
                               onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")}
                               value={student.dob} name='dob' onChange={(e) => handleDob(e)}/>
                    </div>
                    <div className='form_item'>
                        <p>Email</p>
                        <input placeholder='test@gmail.com' type='text' onChange={(e) => handleEmail(e)} name='email'
                               value={student.email}/>
                    </div>
                    <div className='form_item'>
                        <p>Dia chi</p>
                        <input placeholder='TP Ho Chi Minh' type='text' onChange={(e) => handleAddress(e)} name='address'
                               value={student.address}/>
                        {/*<p><span className="textarea" role="textbox" contentEditable></span></p>*/}
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