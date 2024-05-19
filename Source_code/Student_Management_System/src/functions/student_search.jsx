import React from "react";
import {HTMLInputTypeAttribute} from "react";
import {useState, useEffect} from "react";
import NavBar from "../NavBar.jsx";
import {Link, Navigate} from "react-router-dom";
import {DiffFilled} from "@ant-design/icons";
import {Data} from "../data.jsx";
function StudentSearch(props)
{
    const [searchClass, setSearchClass] = useState('')
    const [search, setSearch] = useState('')
    const [fetchdata, setFetchdata] = useState([])
    const handleSearch = (e) => {
        setSearch(e.target.value)
        let fdata = new FormData()
        fdata.append("name", search)
        fetch('http://localhost:8000/SearchSTD.php', {method: 'POST', body: fdata})
            .then(response => response.json())
            .then(data => setFetchdata(data))
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const handleListOfClass = (e) => {
        setSearch(e.target.value)
        let fdata = new FormData()
        fdata.append("class", search)
        fetch('http://localhost:8000/SearchSTDByClass.php', {method: 'POST', body: fdata})
            .then(response => response.json())
            .then(data => setFetchdata(data))
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    return(
        <>
            <NavBar/>
            <div className='function_title'>
                <p>Tra cứu học sinh</p>
            </div>
            <input className='searchBar' onChange={(e) => handleSearch(e)} placeholder='Ho ten hoc sinh' type='text'
                      name='searchStudent'/>
            <input className='search_student_class' placeholder="Chon lop" list="opts" onChange={(e) => handleListOfClass(e)}/>
            <datalist id="opts">
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
            <div className='searchStudent_container'>
                <div className='searchStudent_content'>
                    <table>
                        <thead>
                        <tr>
                            <th id='id'>Ma HS</th>
                            <th id='name'>Tên</th>
                            <th id='class'>Lop</th>
                            <th id='avgmid1'>TB HK1</th>
                            <th id='avgmid2'>TB HK2</th>
                        </tr>
                        </thead>

                        <tbody>
                        {search.length >0 && fetchdata.map(student => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.NAME}</td>
                                <td>{student.TENLOP}</td>
                                <td>{student.TBHK1}</td>
                                <td>{student.TBHK2}</td>

                            </tr>
                        ))}

                        </tbody>


                    </table>
                </div>
            </div>
        </>
    )
}

export default StudentSearch