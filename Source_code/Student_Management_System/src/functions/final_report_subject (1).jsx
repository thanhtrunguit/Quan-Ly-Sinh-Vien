import React, {useEffect} from "react";
import {useState} from "react";
import NavBar from "../NavBar.jsx";

function FinalReportSub() {
    const [students, setStudents] = useState([]);
    const [limit, setLimit] = useState([0,10])
    const [subjectPicker, setSubjectPicker] = useState('')
    const [yearPicker, setYearPicker ] = useState('')
    const [hockyPicker, setHockyPicker] = useState('')
    const [fetchdata, setFetchdata] = useState([])
    const handleSearch = () => {
        let fdata = new FormData()
        fdata.append("SUBJECT", subjectPicker)
        fdata.append("HOCKY", hockyPicker)
        fdata.append("NAM", yearPicker)
        fetch('http://localhost:8000/baocao_mon.php', {method: 'POST', body: fdata})
            .then(response => response.json())
            .then(data => {
                setFetchdata(data)
                console.log(fetchdata)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    useEffect(() => {
        if (subjectPicker && hockyPicker && yearPicker) {
            handleSearch();
        }
    }, [subjectPicker, hockyPicker, yearPicker]);
    return (
        <>
        <NavBar/>
        <div className='function_title'>
                <p>Tổng kết môn</p>
        </div>
            <div className='select_container'>
                <div className='select_content'>
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
                </div>

                    <div className='studentScore_container score_container'>
                        <div className='studentScore_content searchStudent_content'>
                            <table>
                                <thead>
                                <tr>
                                    <th id='class'>Lớp</th>
                                    <th id='csize'>Sĩ số</th>
                                    <th id='qual'>Số lượng đạt</th>
                                    <th id='qualpercent'>Tỉ lệ</th>
                                </tr>
                                </thead>
                                <tbody>
                                {subjectPicker&& hockyPicker&&yearPicker &&fetchdata.map((student,index) => (
                                    <tr key={index}>
                                        <td>{student.ID_LOP}</td>
                                        <td>{student.SISO}</td>
                                        <td>{student.SO_LUONG_DAT}</td>
                                        <td>{student.TI_LE_DAT}</td>

                                    </tr>
                                ))}

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default FinalReportSub