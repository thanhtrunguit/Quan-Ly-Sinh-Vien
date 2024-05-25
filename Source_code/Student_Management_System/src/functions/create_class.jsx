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
import {useState, useEffect, useContext} from "react";
import NavBar from "../NavBar.jsx";
import {Link, Navigate} from "react-router-dom";
import {Data} from "../data.jsx";
import axios from "axios";
import {MalopContext} from "../MalopContext.jsx";
import {UserRole} from "../UserRoleContext.jsx";



const CreateClass = (props) => {
    const { malopgv } = useContext(MalopContext);
    const { userrole } = useContext(UserRole);
    const [limit, setLimit] = useState([0,10])
    const [search, setSearch] = useState('')
    const [siso, setSiso] = useState(1)
    const [assignClass, setAssignClass] = useState([]);
    const [fetchdata, setFetchdata] = useState([])
    const [fetchdataSiSo, setFetchdataSiSo] = useState([])
    const [noclass, setNoclass] = useState()
    const [fetchnoclass, setFetchnoclass] = useState([])
    const [studentID, setStudentID] = useState()
    const [checkedStates, setCheckedStates] = useState({});
    const [menuVisible, setMenuVisible] = useState(false)

    const handleChange = async (id) => {
        let fdata = new FormData()
        fdata.append("class", search)
        fetch('http://localhost:8000/SearchSiSoLop.php', {method: 'POST', body: fdata})
            .then(response => response.json())
            .then(data => setFetchdataSiSo(data))
            .catch(error => {
                console.error('There was an error!', error);
            });
        try {
            const response = await fetch('http://localhost:8000/index.php', {method: 'POST', body: fdata});
            const data = await response.json();
            setFetchdata(data);
            const currentStudentsCount = data.length;
            if (currentStudentsCount < fetchdataSiSo || checkedStates[id]) {
                const newCheckedStates = {
                    ...checkedStates,
                    [id]: !checkedStates[id]
                };
                setCheckedStates(newCheckedStates);

                if (!checkedStates[id]) {
                    onTick(id);
                } else {
                    onUntick(id)
                }
            } else {
                alert('full hoc sinh')
            }
        }catch (error) {
            console.error('errors', error);
        }
    };
    const onTick = (id) => {
        // e.preventDefault()
        let fdata = new FormData()
        fdata.append('id', id );
        fdata.append('MALOP', search);
        axios.post('http://localhost:8000/Update.php', fdata)
            .then(response => {
                console.log(response.data);

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };
    const onUntick = (id) => {
        // e.preventDefault()
        let fdata = new FormData()
        fdata.append('id', id);
        fdata.append('MALOP', '0');
        axios.post('http://localhost:8000/Update.php', fdata)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const handleSearch = (e) => {
        let fdata = new FormData()
            fdata.append("class", search)
            fetch('http://localhost:8000/index.php', {method: 'POST', body: fdata})
                .then(response => response.json())
                .then(data => setFetchdata(data))
                .catch(error => {
                    console.error('There was an error!', error);
                });
            fetch('http://localhost:8000/SearchSiSoLop.php', {method: 'POST', body: fdata})
            .then(response => response.json())
            .then(data => setFetchdataSiSo(data))
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const handleSiSo = (e) => {
        setSiso(e.target.value)
    }
    const createClass = (e) => {
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
    useEffect(() => {
        if (search) {
            handleSearch();
        }
    }, [search]);
    // useEffect(() => {
    //     if (noclass == 0) {
    //         let fdata = new FormData()
    //         fdata.append("class", noclass)
    //         fetch('http://localhost:8000/index.php', {method: 'POST', body: fdata})
    //             .then(response => response.json())
    //             .then(data => setFetchnoclass(data))
    //             .catch(error => {
    //                 console.error('There was an error!', error);
    //             });
    //     }
    // }, [noclass]);
    const handleCheckEmpty = () => {
        // setNoclass(0)
        setMenuVisible(true)
    let fdata = new FormData()
    fdata.append("class", 0)
    fetch('http://localhost:8000/index.php', {method: 'POST', body: fdata})
        .then(response => response.json())
        .then(data => setFetchnoclass(data))
        .catch(error => {
            console.error('There was an error!', error);
        });

    }
    const hideMenu = () => {
        setMenuVisible(false)
    }
    const [listOfClass, setlistOfClass] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/dslop.php')
            .then(response => response.json())
            .then(data => setlistOfClass(data))
            .catch(error => console.error('Error fetching class list:', error));
    }, []);
    return (
        <>
            <NavBar/>
            <div className='function_title'>
                <p>Lập danh sách lớp</p>
            </div>
            <div className='select_container'>
                <div className='select_content'>
                    <div className='select_section'>
                        <select className='search_student_class'
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}>
                            <option value="">Chon Lop</option>
                            {
                                listOfClass.length > 0 && userrole == 'admin' ? (
                                listOfClass.map((className, index) => (
                                <option key={index} value={className}>
                            {className}
                        </option>
                        ))
                            ) : (
                                    <>
                                        <option value=''>Chon lop</option>
                                        <option value={malopgv}>{malopgv}</option>
                                    </>
                            )}
                        </select>
                        
                        {
                            search.length > 0 ?
                                (<div className='siso search_student_class '>{fetchdataSiSo}</div>)
                                :
                                (
                                    <></>
                                )
                        }
                        <button className="Copen" onClick={handleCheckEmpty}>Add HS</button>

                        {menuVisible && (
                            <div className="dim">
                                <div className="classless">
                                    <div className="classlessTitle">DANH SÁCH HỌC SINH CHƯA CÓ LỚP</div>
                                    <div className="classlessBox">
                                        <table className='Ctitle'>
                                            <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên</th>
                                                <th>Gioi tinh</th>
                                                <th>Nam sinh</th>
                                                <th>Dia chi</th>
                                                <th>Ghi chu</th>
                                            </tr>
                                            </thead>
                                            <tbody className="Cbody">
                                            {fetchnoclass.map((student) => (
                                                <tr key={student.ID_HOCSINH}>
                                                    <td>{student.ID_HOCSINH}</td>
                                                    <td>{student.HOTEN}</td>
                                                    <td>{student.GIOI_TINH}</td>
                                                    <td>{student.NGAY_SINH}</td>
                                                    <td>{student.DIACHI}</td>
                                                    <input type='checkbox'
                                                           checked={!!checkedStates[student.ID_HOCSINH]}
                                                           onChange={() => {
                                                               handleChange(student.ID_HOCSINH)
                                                           }}
                                                    />
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <button className="Cclose" onClick={hideMenu}>Done</button>
                                </div>
                            </div>
                        )}
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
                            {search.length > 0 && fetchdata.map((student) => (
                                <tr key={student.ID_HOCSINH}>
                                    <td>{student.ID_HOCSINH}</td>
                                    <td>{student.HOTEN}</td>
                                    <td>{student.GIOI_TINH}</td>
                                    <td>{student.NGAY_SINH}</td>
                                    <td>{student.DIACHI}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateClass;
