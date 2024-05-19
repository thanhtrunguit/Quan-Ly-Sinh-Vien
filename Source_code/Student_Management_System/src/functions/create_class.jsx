// import React from "react";
// import {HTMLInputTypeAttribute} from "react";
// import {useState, useEffect} from "react";
// import NavBar from "../NavBar.jsx";
// import {Link, Navigate} from "react-router-dom";
// import { FaQuestion } from "react-icons/fa";
// import Select from "react-select";
// import {Data} from "../data.jsx";
// import axios from 'axios'
// function CreateClass() {
//     // <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
//     const [search, setSearch] = useState('')
//     const [noClassTrigger, setNoClassTrigger] = useState(false)
//     const handleListOfClass = (e) => {
//         setSearch(e.target.value)
//     }
//     const handleNoClassStd = () => {
//         e.preventDefault()
//         setNoClassTrigger(true)
//         let fdata = new FormData()
//         fdata.append("status", noClassTrigger)
//         axios.post('http://localhost:8000/index.php', fdata)
//             .then(response => {
//                 console.log(response.data);
//             })
//             .catch(error => {
//                 console.error('There was an error!', error);
//             });
//     }
//     return (
//         <>
//             <NavBar/>
//             <div className='function_title'>
//                 <p>Lập danh sách lớp</p>
//             </div>
//             <div><input className='search_student_class class_picker' placeholder="Chon lop" list="classOpts"
//                       onChange={(e) => handleListOfClass(e)} name='searchStudent'/>
//                 <datalist id="classOpts">
//                     <option value='10CA'>10CA</option>
//                     <option value='10A1'>10A1</option>
//                     <option value='10A2'>10A2</option>
//                     <option value='10A3'>10A3</option>
//                     <option value='10A4'>10A4</option>
//                     <option value='11A1'>11A1</option>
//                     <option value='11A2'>11A2</option>
//                     <option value='11A3'>11A3</option>
//                     <option value='12A1'>12A1</option>
//                     <option value='12A2'>12A2</option>
//                 </datalist>
//                     {
//                         search && <div onClick={handleNoClassStd} className='checkStudentNoClass'><FaQuestion/></div>
//                     }
//             </div>
//             <div className=' searchStudent_container'>
//                 <table className='form_note'>
//                     <thead>
//                     <tr>
//                         {/*<th id='id'>STT</th>*/}
//                         <th id='name'>Tên</th>
//                         <th id='gender'>Gioi tinh</th>
//                         <th id='dob'>Nam sinh</th>
//                         <th id='ip_address'>Dia chi</th>
//                         <th id='note'>Ghi chu</th>
//                     </tr>
//                     </thead>
//                 </table>
//                 <div className=' searchStudent_content'>
//                     <form>
//                         <div className='show_students_create_class'>
//                             <div className='form_item'>
//                                 <input type='text' name='fullname' placeholder='ngo thanh trung'/>
//                             </div>
//                             <div className='form_item'>
//                                 <input placeholder="Gioi tinh" list="genderOpts"/>
//                                 <datalist id="genderOpts">
//                                     <option value='male'>Nam</option>
//                                     <option value='femal'>Nu</option>
//                                     <option value='other'>Khac</option>
//                                 </datalist>
//                             </div>
//                             <div className='form_item'>
//                                 <input type='text' name='dob' placeholder='11/01/2008'/>
//                             </div>
//                             <div className='form_item'>
//                                 <input placeholder='15, duong A, TP.HCM' type='text'/>
//                             </div>
//
//                         </div>
//                     </form>
//                 </div>
//
//             </div>
//         </>
//     )
// }
//
// export default CreateClass

import React from "react";
import {HTMLInputTypeAttribute} from "react";
import {useState, useEffect} from "react";
import NavBar from "../NavBar.jsx";
import {Link, Navigate} from "react-router-dom";
import {Data} from "../data.jsx";
import axios from "axios";

const CreateClass = () => {
    const [students, setStudents] = useState([]);
    const [limit, setLimit] = useState([0,10])
    const [std, setStd] = useState([]) //store value of students
    const [filteredStudents, setFilteredStudents] = useState([])
    const [search, setSearch] = useState('')
    const [siso, setSiso] = useState(1)
    const [assignClass, setAssignClass] = useState([]);
    const [fetchdata, setFetchdata] = useState([])
    const handleSearch = (e) => {
        setSearch(e.target.value)
        let fdata = new FormData()
            fdata.append("class", search)
            fetch('http://localhost:8000/index.php', {method: 'POST', body: fdata})
                .then(response => response.json())
                .then(data => setFetchdata(data))
                .catch(error => {
                    console.error('There was an error!', error);
                });
    }
    const addRow = () => {
        const newRows = Array.from({ length: siso }, (_, index) => ({
            id: '',
            name: '',
            gender: '',
            dob: '',
            address: ''
        }));
        setAssignClass([...assignClass, ...newRows]);
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const newSt = [...assignClass];
        newSt[index][name] = value;
        setAssignClass(newSt);
    };
    const handleSiSo = (e) => {
        setSiso(e.target.value)
    }
    const removeRow = (index) => {
        const newDynamicRows = assignClass.filter((_, i) => i !== index);
        setAssignClass(newDynamicRows);
    };
    const createClass = (e) => {
        console.log(typeof search)
        e.preventDefault()
        let fdata = new FormData()
        assignClass.forEach((student) => {
            fdata.append('id', student.id);
            fdata.append('MALOP', search);
            axios.post('http://localhost:8000/Update.php', fdata)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        })
    }


    return (
        <>
            <NavBar/>
            <div className='function_title'>
                <p>Lập danh sách lớp</p>
            </div>
            <div className='select_container'>
                <div className='select_content'>
                    <div className='select_section'>
                        <input className='' placeholder="Chon lop" list="classOpts"
                                  onChange={(e) => handleSearch(e)} name='class_picker'/>
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
                        <button type="button" onClick={addRow}>Add Row</button>
                        <input className='' placeholder="Si so"
                               onChange={(e) => handleSiSo(e)} name='class_number'/>
                    </div>
                </div>
            </div>
            <div className='studentScore_container score_container'>
                <form onSubmit={createClass}
                      method='post'>
                    <div className='studentScore_content searchStudent_content'>
                        <table>
                            <thead>
                            <tr>
                                <th>Student Id</th>
                                <th>Student Name</th>
                                <th>Gender</th>
                                <th>Nam sinh</th>
                                <th>Dia chi</th>
                            </tr>
                            </thead>
                            <tbody>
                            {search.length >0 && fetchdata.map(student => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.NAME}</td>
                                    <td>{student.GENDER}</td>
                                    <td>{student.DOB}</td>
                                    <td>{student.ADDRESS}</td>

                                </tr>
                            ))}
                            {search.length >0 && assignClass.map((row, index) => (
                                <tr key={row.index}>
                                    <td>
                                        <input
                                            type="number"
                                            name='id'
                                            value={row.id}
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="name"
                                            value={row.name}
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="gender"
                                            value={row.gender}
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="dob"
                                            value={row.dob}
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="address"
                                            value={row.address}
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => removeRow(index)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>
                    <button className='btn login_btn submit_btn submit_btn_createClass' type='submit'>Submit</button>
                </form>
            </div>
        </>
    );
};

export default CreateClass;
