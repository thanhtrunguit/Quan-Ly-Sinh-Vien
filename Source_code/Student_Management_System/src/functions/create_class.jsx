import React from "react";
import {HTMLInputTypeAttribute} from "react";
import {useState, useEffect} from "react";
import NavBar from "../NavBar.jsx";
import {Link, Navigate} from "react-router-dom";

import Select from "react-select";
import {Data} from "../data.jsx";
function CreateClass() {
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    const [search, setSearch] = useState('')
    const handleListOfClass = (e) => {
        setSearch(e.target.value)
    }
    return (
        <>
            <NavBar/>
            <div className='function_title'>
                <p>Lập danh sách lớp</p>
            </div>
            <div><input className='search_student_class class_picker' placeholder="Chon lop" list="classOpts"
                      onChange={(e) => handleListOfClass(e)} name='searchStudent'/>
                <datalist id="classOpts">
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
                </datalist>
            </div>
            <div className=' searchStudent_container'>
                <table className='form_note'>
                    <thead>
                    <tr>
                        {/*<th id='id'>STT</th>*/}
                        <th id='name'>Tên</th>
                        <th id='gender'>Gioi tinh</th>
                        <th id='dob'>Nam sinh</th>
                        <th id='ip_address'>Dia chi</th>
                        <th id='note'>Ghi chu</th>
                    </tr>
                    </thead>
                </table>
                <div className=' searchStudent_content'>
                    <form>
                        <div className='show_students_create_class'>
                            <div className='form_item'>
                                <input type='text' name='fullname' placeholder='ngo thanh trung'/>
                            </div>
                            <div className='form_item'>
                                <input placeholder="Gioi tinh" list="genderOpts"/>
                                <datalist id="genderOpts">
                                    <option value='male'>Nam</option>
                                    <option value='femal'>Nu</option>
                                    <option value='other'>Khac</option>
                                </datalist>
                            </div>
                            <div className='form_item'>
                                <input type='text' name='dob' placeholder='11/01/2008'/>
                            </div>
                            <div className='form_item'>
                                <input placeholder='15, duong A, TP.HCM' type='text'/>
                            </div>

                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default CreateClass