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
    const [fetchdataName, setFetchdataName] = useState([])
    const [fetchdataClass, setFetchdataClass] = useState([])
    const [yearPicker, setYearPicker] = useState('')
    const handleSearch = () => {
        // setSearch(e.target.value)
        let fdata = new FormData()
        fdata.append("name", search)
        fdata.append("NAM", yearPicker)
        if(yearPicker)
        {
            fetch('http://localhost:8000/SearchSTD.php', {method: 'POST', body: fdata})
                .then(response => response.json())
                .then(data => {
                    setFetchdataName(data)
                    console.log(fetchdataName)
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }
    const handleListOfClass = () => {
        let fdata1 = new FormData()
        fdata1.append("class", searchClass)
        fdata1.append("NAM", yearPicker)
        if(yearPicker)
        {
            fetch('http://localhost:8000/SearchSTDByClass.php', {method: 'POST', body: fdata1})
                .then(response => response.json())
                .then(data => {
                    setFetchdataClass(data)
                    console.log(fetchdataClass)
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }
    useEffect(() => {
        if (searchClass) {
            handleListOfClass();
        }
    }, [searchClass]);
    useEffect(() => {
        if (search) {
            handleSearch();
        }
    }, [search]);
    useEffect(() => {
        if (yearPicker && search != '' ) {
            handleSearch();
        }
    }, [yearPicker]);
    useEffect(() => {
        if (yearPicker && searchClass != '' ) {
            handleListOfClass();
        }
    }, [yearPicker]);

    const [listOfClass, setlistOfClass] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/dslop.php')
            .then(response => response.json())
            .then(data => setlistOfClass(data))
            .catch(error => console.error('Error fetching class list:', error));
    }, []);

    return(
        <>
            <NavBar/>
            <div className='function_title'>
                <p>Tra cứu học sinh</p>
            </div>
            <input className='searchBar'
                   onChange={(e) => setSearch(e.target.value)} placeholder='Ho ten hoc sinh' type='text'
                   name='searchStudent'
                   value={search}
            />
            <select className='search_student_class'
                    onChange={(e) => setSearchClass(e.target.value)}
                    value={searchClass}>
                <option value="">Chon Lop</option>
                {
                    listOfClass.length > 0 ? (
                        listOfClass.map((className, index) => (
                            <option key={index} value={className}>
                                {className}
                            </option>
                        ))
                    ) : (
                        <>
                        </>
                    )}
            </select>
            <div className='select_section'>
                <select className='search_student_class' id="opts"
                        onChange={(e) => setYearPicker(e.target.value)}
                        value={yearPicker}>
                    <option value=''>Năm</option>
                    <option value='2021'>2021-2022</option>
                    <option value='2022'>2022-2023</option>
                    <option value='2023'>2023-2024</option>
                </select>
            </div>
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
                        {search.length > 0 && fetchdataName.map(student => (
                            <tr key={student.id}>
                                <td>{student.ID_HOCSINH}</td>
                                <td>{student.HOTEN}</td>
                                <td>{student.ID_LOP}</td>
                                <td>{student.TBHK1}</td>
                                <td>{student.TBHK2}</td>

                            </tr>
                        ))}

                        </tbody>
                        <tbody>
                        {searchClass.length > 0 && fetchdataClass.map(student => (
                            <tr key={student.id}>
                                <td>{student.ID_HOCSINH}</td>
                                <td>{student.HOTEN}</td>
                                <td>{student.ID_LOP}</td>
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