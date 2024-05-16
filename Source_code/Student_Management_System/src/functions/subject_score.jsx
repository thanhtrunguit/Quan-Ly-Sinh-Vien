import React from "react";
import {HTMLInputTypeAttribute} from "react";
import {useState, useEffect} from "react";
import NavBar from "../NavBar.jsx";
import {Link, Navigate} from "react-router-dom";
import {Data} from "../data.jsx";

const SubjectScore = () => {
    const [students, setStudents] = useState([]);
    const [limit, setLimit] = useState([0,10])
    const [std, setStd] = useState([]) //store value of students
    const [filteredStudents, setFilteredStudents] = useState([])
    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    useEffect(() => {
        setStd(Data);
    }, []);

    useEffect(() => {
        if(search.length > 0)
        {
            const stfiltered = std.filter(student => student.class.includes(search))
            setFilteredStudents(stfiltered)
        }

    }, [search]);

    useEffect(() => {
        if(search.length > 0){
            setStudents(filteredStudents);
        }
        if(search.length === 0){
            setStudents([]);
        }
    }, [search, filteredStudents]);
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
    console.log(students)
    return (
        <>
            <NavBar/>
            <div className='function_title'>
                <p>Nhập điểm môn học</p>
            </div>
            <div className='select_container'>
                <div className='select_content'>
                    <div className='select_section'>
                        <input className= '' placeholder="Chon lop" list="classOpts"
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
                    </div>
                    <div className='select_section'>
                        <input className='' placeholder="Chon mon" list="subjectOpts"
                               onChange={(e) => handleListOfClass(e)} name='subject_picker'/>
                        <datalist id="subjectOpts">
                            <option value='Toan'>Toan</option>
                            <option value='Ly'>Ly</option>
                            <option value='Hoa'>Hoa</option>
                            <option value='Sinh'>Sinh</option>
                            <option value='Su'>Su</option>
                            <option value='Dia'>Dia</option>
                            <option value='Van'>Van</option>
                            <option value='Dao duc'>Dao duc</option>
                            <option value='The duc'>The duc</option>
                        </datalist>
                    </div>
                    <div className='select_section'>
                        <input className='' placeholder="Hoc ky" list="periodOpts"
                               onChange={(e) => handleListOfClass(e)} name='period_picker'/>
                        <datalist id="periodOpts">
                            <option value='ky1'>Hoc ky 1</option>
                            <option value='ky2'>Hoc ky 2</option>
                        </datalist>
                    </div>
                </div>
            </div>
            <div className='studentScore_container score_container'>
                <form>
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
                            {students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.first_name}</td>
                                    <td>
                                        <input
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            type="number"
                                            min = '1'
                                            max = '10'
                                            id='score15'
                                            value={student.score15 || ''}
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
                                            value={student.score45 || ''}
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
                                            value={student.tbScore || ''}
                                            onChange={(e) => handleScoreChange(student.id, 'tbScore', e)}
                                        />
                                    </td>
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

export default SubjectScore;
