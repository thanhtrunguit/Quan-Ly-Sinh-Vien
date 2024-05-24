import React from "react";
import {HTMLInputTypeAttribute} from "react";
import {useState, useEffect, useContext} from "react";
import NavBar from "../NavBar.jsx";
import {Link, Navigate} from "react-router-dom";
import {Data} from "../data.jsx";
import axios from "axios";
import {MalopContext} from "../MalopContext.jsx";
import {UserRole} from "../UserRoleContext.jsx";
const SubjectScore = () => {
    const [students, setStudents] = useState([]);
    const [limit, setLimit] = useState([0,10])
    const [searchClass, setSearchClass] = useState('')
    const [subjectPicker, setSubjectPicker] = useState('')
    const [hockyPicker, setHockyPicker] = useState('')
    const [yearPicker, setYearPicker] = useState('')
    const [fetchdataClass, setFetchdataClass] = useState([])
    const { malopgv } = useContext(MalopContext);
    const { userrole } = useContext(UserRole);

    const handleListOfClass = (searchClass) => {
        let fdata1 = new FormData()
        fdata1.append("class", searchClass)
        fetch('http://localhost:8000/SearchSTDByClass.php', {method: 'POST', body: fdata1})
            .then(response => response.json())
            .then(data => {
                setFetchdataClass(data)
                setStudents(data.map(student => ({
                    ...student,
                    score15: '',
                    score45: '',
                    tbScore: ''
                })));
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    useEffect(() => {
        if (searchClass) {
            handleListOfClass(searchClass);
        }
    }, [searchClass]);
    const handleScoreChange = (studentId, scoreType, event) => {
        let { value } = event.target;
        if(value <= limit[1] && value >= limit[0])
        {
            setStudents(prevStudents => {
                return prevStudents.map(student => {
                    if (student.id === studentId) {
                        return {...student, [scoreType]: value};
                    }
                    return student;
                });
            });
        }
        else{
            if(value > 10)
            {
                value = 10
                setStudents(prevStudents => {
                    return prevStudents.map(student => {
                        if (student.id === studentId) {
                            return {...student, [scoreType]: value};
                        }
                        return student;
                    });
                });
            }

        }
    };
    const studentScorings = (e) => {
        e.preventDefault()
        let fdata = new FormData()
        students.forEach((student) => {
            fdata.append('id', student.id);
            fdata.append('score15', student.score15);
            fdata.append('score45', student.score45);
            fdata.append('scoretb', student.tbScore);
            fdata.append('MAMON', subjectPicker);
            fdata.append('HOCKY', hockyPicker);
            fdata.append('NAM', yearPicker);
            axios.post('http://localhost:8000/UpdateStScore.php', fdata)
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
                <p>Nhập điểm môn học</p>
            </div>
            <div className='select_container'>
                <div className='select_content'>
                    <div className='select_section'>
                        <select className='search_student_class' id="opts"
                                onChange={(e) => setSearchClass(e.target.value)}
                                value={searchClass}>
                            {userrole == "admin" ?
                                (<>
                                    <option value=''>Chon lop</option>
                                    <option value='10A1'>10A1</option>
                                    <option value='10A2'>10A2</option>
                                    <option value='10A3'>10A3</option>
                                    <option value='10A4'>10A4</option>
                                    <option value='11A1'>11A1</option>
                                    <option value='11A2'>11A2</option>
                                    <option value='11A3'>11A3</option>
                                    <option value='12A1'>12A1</option>
                                    <option value='12A2'>12A2</option>
                                </>)
                                :
                                (
                                    <>
                                        <option value=''>Chon lop</option>
                                        <option value={malopgv}>{malopgv}</option>
                                    </>
                                )
                            }
                        </select>
                    </div>
                    <div className='select_section'>
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
                    </div>
                    <div className='select_section'>
                        <select className='search_student_class' id="opts"
                                onChange={(e) => setHockyPicker(e.target.value)}
                                value={hockyPicker}>
                            <option value=''>Chon hoc ky</option>
                            <option value='1'>Hoc ky 1</option>
                            <option value='2'>Hoc ky 2</option>
                        </select>
                    </div>
                    <div className='select_section'>
                        <select className='search_student_class' id="opts"
                                onChange={(e) => setYearPicker(e.target.value)}
                                value={yearPicker}>
                            <option value=''>Chon nam</option>
                            <option value='2021'>2021</option>
                            <option value='2022'>2022</option>
                            <option value='2023'>2023</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='studentScore_container score_container'>
                <form onSubmit={studentScorings}
                      method='post'>
                    <div className='studentScore_content searchStudent_content'>
                        <table>
                            <thead>
                            <tr>
                                <th>Student id</th>
                                <th>Student Name</th>
                                <th>15 Score</th>
                                <th>45 Score</th>
                                <th>TB Score</th>
                            </tr>
                            </thead>
                            <tbody>
                            {searchClass.length > 0 && fetchdataClass.map(student => (
                                <tr key={student.id}>
                                    <td>{student.ID_HOCSINH}</td>
                                    <td>{student.HOTEN}</td>
                                    <td>
                                        <input
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            type="number"
                                            min='1'
                                            max='10'
                                            id='score15'
                                            value={student.score15}
                                            onChange={(e) => handleScoreChange(student.id, 'score15', e)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            type="number"
                                            id='score45'
                                            value={student.score45}
                                            onChange={(e) => handleScoreChange(student.id, 'score45', e)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            type="number"
                                            id='scoreTB'
                                            value={student.tbScore}
                                            onChange={(e) => handleScoreChange(student.id, 'tbScore', e)}
                                        />
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

export default SubjectScore;
