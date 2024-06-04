import React, {useEffect} from "react";
import {useState} from "react";
import NavBar from "../NavBar.jsx";


function FinalReportSem() {
    const [students, setStudents] = useState([]);
    const [limit, setLimit] = useState([0,10])
    const [yearPicker, setYearPicker ] = useState('')
    const [hockyPicker, setHockyPicker] = useState('')
    const [fetchdata, setFetchdata] = useState([])
    const handleSearch = () => {
        let fdata = new FormData()
        fdata.append("HOCKY", hockyPicker)
        fdata.append("NAM", yearPicker)
        fetch('http://localhost:8000/baocaotongket.php', {method: 'POST', body: fdata})
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
        if (hockyPicker && yearPicker) {
            handleSearch();
        }
    }, [hockyPicker, yearPicker]);

    return (
        <>
            <NavBar/>
            <div className='function_title'>
                <p>TỔNG KẾT HỌC KỲ</p>
            </div>
            <div className='select_content final_report'>
            <div className='select_section'>
                <select className='search_student_class' id="opts"
                        onChange={(e) => setHockyPicker(e.target.value)}
                        value={hockyPicker}>
                    <option value=''>Chọn học kỳ</option>
                    <option value='1'>Học kỳ 1</option>
                    <option value='2'>Học kỳ 2</option>
                </select>
            </div>

            <div className='select_section'>
                <select className='search_student_class' id="opts"
                        onChange={(e) => setYearPicker(e.target.value)}
                        value={yearPicker}>
                    <option value=''>Chọn năm</option>
                    <option value='2021'>2021</option>
                    <option value='2022'>2022</option>
                    <option value='2023'>2023</option>
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
                        {yearPicker && hockyPicker && fetchdata.map((student, index) => (
                            <tr key={index}>
                                {/*<td>{student.ID_HOCSINH}</td>*/}
                                <td>{student.ID_LOP}</td>
                                <td>{student.SISO}</td>
                                <td>{student.soluongdat}</td>
                                <td>{student.tiledat}</td>

                            </tr>
                        ))}

                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
}

export default FinalReportSem