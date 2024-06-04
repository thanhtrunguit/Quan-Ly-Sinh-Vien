import React from "react";
import {HTMLInputTypeAttribute} from "react";
import {useState, useEffect, useContext} from "react";
import NavBar from "../NavBar.jsx";
import {Link, Navigate} from "react-router-dom";
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
    const [scoreState, setScoreState] = useState(true)
    const [year, setYear] = useState('')


    const handleListOfClass = (searchClass, subjectPicker, hockyPicker ,yearPicker) => {
        let fdata1 = new FormData()
        fdata1.append("class", searchClass)
        fdata1.append('MAMON', subjectPicker);
        fdata1.append('HOCKY', hockyPicker);
        fdata1.append('NAM', yearPicker);
        fetch('http://localhost:8000/SearchAllScore.php', {method: 'POST', body: fdata1})
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
    const handleClass = (searchClass) => {
        let fdata1 = new FormData()
        const date = new Date()
        setYearPicker(date.getFullYear() - 1 )
        fdata1.append("class", searchClass)
        fdata1.append('NAM', yearPicker);
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
        if (searchClass && subjectPicker && hockyPicker && yearPicker && scoreState ) {
            handleListOfClass(searchClass, subjectPicker, hockyPicker, yearPicker);
        }
    }, [searchClass, subjectPicker, hockyPicker, yearPicker]);

    useEffect(() => {
        if (searchClass && scoreState === false ) {
            handleClass(searchClass);
        }
    }, [searchClass]);

    const handleScoreChange = (studentId, scoreType, event) => {
        let { value } = event.target;
        if(value <= limit[1] && value >= limit[0])
        {
            setStudents(prevStudents => {
                return prevStudents.map(student => {
                    if (student.ID_HOCSINH === studentId) {
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
                        if (student.ID_HOCSINH === studentId) {
                            return {...student, [scoreType]: value};
                        }
                        return student;
                    });
                });
            }

        }
    };
    const studentScorings = async (e) => {
        e.preventDefault();
        const date = new Date();
        setYearPicker(date.getFullYear() - 1);
        let fdata;
        const promises = students.map((student) => {
            fdata = new FormData();
            fdata.append('id', student.ID_HOCSINH);
            fdata.append('score15', student.score15);
            fdata.append('score45', student.score45);
            fdata.append('scoretb', student.tbScore);
            fdata.append('MAMON', subjectPicker);
            fdata.append('HOCKY', hockyPicker);
            fdata.append('NAM', yearPicker);
            return axios.post('http://localhost:8000/UpdateStScore.php', fdata);
        });

        try {
            await Promise.all(promises);
            alert('Nhập điểm thành công!');
            setSubjectPicker('');
            setSearchClass('');
            setHockyPicker('');
        } catch (error) {
            console.error('Nhập điểm thất bại, thử lại sau, hoặc liên lạc với kĩ thuật viên!', error);
        }
    }
    const handleScoreState = () =>{
        if(scoreState == true)
        {
            setScoreState(false)
            setSubjectPicker('')
            setSearchClass('')
            setHockyPicker('')
        }
        else if(scoreState == false)
        {
            setScoreState(true)
            setSubjectPicker('')
            setSearchClass('')
            setHockyPicker('')
        }
    }
    const [listOfClass, setlistOfClass] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/dslop.php')
            .then(response => response.json())
            .then(data => setlistOfClass(data))
            .catch(error => console.error('Error fetching class list:', error));
    }, []);
    const [listOfSubs, setListOfSubs] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/MAMON_get.php')
            .then(response => response.json())
            .then(data => setListOfSubs(data))
            .catch(error => console.error('Error fetching class list:', error));
    }, []);

    return (
        <>
            <NavBar/>
            <div className='function_title'>
                {
                    scoreState == true ?
                        (<p>XEM ĐIỂM MÔN HỌC</p>)
                        :
                        (<p>NHẬP ĐIỂM MÔN HỌC</p>)
                }
            </div>
            <div className='select_container'>
                <div className='select_content'>
                    <div className='select_section'>
                        <select className='search_student_class'
                                onChange={(e) => setSearchClass(e.target.value)}
                                value={searchClass}>
                            <option value="">Chọn lớp</option>
                            {
                                listOfClass.length > 0 && userrole == 'admin' ? (
                                    listOfClass.map((className, index) => (
                                        <option key={index} value={className}>
                                            {className}
                                        </option>
                                    ))
                                ) : (
                                    <>
                                        <option value=''>Chọn lớp</option>
                                        <option value={malopgv}>{malopgv}</option>
                                    </>
                                )}
                        </select>
                    </div>
                    <div className='select_section'>
                        <select className='search_student_class'
                                onChange={(e) => setSubjectPicker(e.target.value)}
                                value={subjectPicker}>
                            <option value="">Chọn môn</option>
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
                    </div>
                    <div className='select_section'>
                        <select className='search_student_class' id="opts"
                                onChange={(e) => setHockyPicker(e.target.value)}
                                value={hockyPicker}>
                            <option value=''>Chọn học kỳ</option>
                            <option value='1'>Học kì 1</option>
                            <option value='2'>Học kì 2</option>
                        </select>
                    </div>
                    <div className='select_section'>
                        {
                            scoreState == true ?
                                (<select className='search_student_class' id="opts"
                                         onChange={(e) => setYearPicker(e.target.value)}
                                         value={yearPicker}>
                                    <option value=''>Chọn năm</option>
                                    <option value='2021'>2021</option>
                                    <option value='2022'>2022</option>
                                    <option value='2023'>2023</option>
                                </select>):
                                (
                                    <select className='search_student_class' id="opts"
                                            onChange={(e) => setYearPicker(e.target.value)}
                                            value={yearPicker}>
                                        <option value='2023'>2023</option>
                                    </select>
                                )
                        }
                    </div>
                    {
                        scoreState == true ?
                            (<button className='btn login_btn submit_btn submit_btn_createClass'
                                     onClick={handleScoreState}>Nhập điểm</button>)
                            :
                            (<button className='btn login_btn submit_btn submit_btn_createClass'
                                     onClick={handleScoreState}>Xem điểm</button>)

                    }
                </div>
            </div>
            <div className='studentScore_container score_container'>
                <form onSubmit={studentScorings}
                      method='post'>
                    <div className='studentScore_content searchStudent_content'>
                        <table>
                            <thead>
                            <tr>
                                <th>Mã </th>
                                <th>Họ và Tên</th>
                                <th>15 phút</th>
                                <th>45 phút</th>
                                <th>Điểm TB</th>
                            </tr>
                            </thead>
                            <tbody>
                            {scoreState && searchClass.length > 0 && fetchdataClass.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.ID_HOCSINH}</td>
                                    <td>{student.HOTEN}</td>
                                    <td>{student.DIEM15}</td>
                                    <td>{student.DIEM45}</td>
                                    <td>{student.DIEMTB}</td>
                                </tr>
                            ))}
                            {scoreState == false && searchClass.length > 0 && fetchdataClass.map((student) => (
                                <tr key={student.ID_HOCSINH}>
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
                                            onChange={(e) => handleScoreChange(student.ID_HOCSINH, 'score15', e)}
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
                                            onChange={(e) => handleScoreChange(student.ID_HOCSINH, 'score45', e)}
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
                                            onChange={(e) => handleScoreChange(student.ID_HOCSINH, 'tbScore', e)}
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <>{
                        scoreState == true ?
                            (<> </>)
                            :
                            (
                            <button className='btn login_btn submit_btn submit_btn_createClass' type='submit'>Ghi
                                nhận
                            </button>
                            )
                            }
                            </>
                </form>
            </div>
        </>
    );
};

export default SubjectScore;
