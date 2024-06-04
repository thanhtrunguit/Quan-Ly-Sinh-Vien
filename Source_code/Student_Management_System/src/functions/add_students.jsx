import React from "react";
import {HTMLInputTypeAttribute} from "react";
import {useState, useEffect} from "react";
import NavBar from "../NavBar.jsx";
import {Link, Navigate} from "react-router-dom";
import axios from 'axios'
function AddStudents(props) {
    var currentTime = new Date()
    var year = currentTime.getFullYear()
    const [gender, setGender] = useState('')
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [email, setemail] = useState('')
    const [address, setAddress] = useState('')

    const addStudent = (e) => {
        e.preventDefault()
        const curD = new Date()
        const curY = curD.getFullYear()
        const intputY = new Date(dob).getFullYear();
        if(name == '' || gender == '' || dob == '' || email == "" || address == '')
        {
            alert('Không được để trống thông tin')
        }
        else
        {
            if(curY - intputY >= age.agemin && curY - intputY <= age.agemax)
            {
                let fdata = new FormData()
                fdata.append("name", name)
                fdata.append("gender", gender)
                fdata.append("dob", dob)
                fdata.append("email", email)
                fdata.append("address", address)
                axios.post('http://localhost:8000/AddStudents.php', fdata)
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
            else
            {
                alert('Nam sinh khong phu hop')
            }
        }
    }
    const [cancel, setCancel] = useState(false)

    const [age, setage] = useState('')
    useEffect(() => {
        fetch('http://localhost:8000/Age_get.php')
            .then(response => response.json())
            .then(data => setage(data))
            .catch(error => console.error('Error fetching class list:', error));
    }, []);
    if (cancel){
        return (
            <Navigate to= '/functions' />
        )
    }

    return (
        <>
            <NavBar/>
            <div className='function_title'>
                <p>TIẾP NHẬN HỌC SINH</p>
            </div>
            <div className='form_container'>
                <form onSubmit={addStudent}
                method='post'>
                    <div className='form_content'>
                        <div className='form_item'>
                            <p>Họ và Tên</p>
                            <input onChange={(e) => setName(e.target.value)} placeholder='Nguyễn Văn A' type='text' name='name'
                                   value={name}/>
                        </div>
                        <div className='form_item'>
                            <p>Giới tính</p>
                            <select onChange={(e) => setGender(e.target.value)}
                                    value={gender}>
                                <option value=''>Giới Tính</option>
                                <option value='nam'>Nam</option>
                                <option value='nu'>Nu</option>
                                <option value='khac'>other</option>
                            </select>
                        </div>
                        <div className='form_item'>
                            <p>Ngày sinh</p>
                            <input
                                className='date_time'
                                placeholder='Ngay sinh'
                                type='date'
                                value={(dob)} // Display in dd-mm-yyyy format by default
                                name='dob'
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                        <div className='form_item'>
                            <p>Email</p>
                            <input placeholder='test@gmail.com' type='text' onChange={(e) => setemail(e.target.value)}
                                   name='email'
                                   value={email}/>
                        </div>
                        <div className='form_item'>
                            <p>Địa chỉ</p>
                            <input placeholder='TP Ho Chi Minh' type='text' onChange={(e) => setAddress(e.target.value)}
                                   name='address'
                                   value={address}/>
                        </div>
                        <button className='btn login_btn submit_btn' type='submit'>Ghi nhận</button>
                        {/*<button className='btn cancel_btn' onClick={handleCancel}>Cancel</button>*/}
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddStudents