import React from "react";
import {HTMLInputTypeAttribute} from "react";
import {useState, useEffect} from "react";
import NavBar from "../NavBar.jsx";
import {Link, Navigate} from "react-router-dom";
import {DiffFilled} from "@ant-design/icons";
import {Data} from "../data.jsx";
function StudentSearch(props)
{
    const [search, setSearch] = useState('')
    const [searchClass, setSearchClass] = useState('')
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleListOfClass = (e) => {
        setSearchClass(e.target.value)
    }
    return(
        <>
            <NavBar/>
            <div className='function_title'>
                <p>Tra cứu học sinh</p>
            </div>
            {/*<form>*/}
            <input className='searchBar' onChange={(e) => handleSearch(e)} placeholder='Ho ten hoc sinh' type='text'
                      name='searchStudent'/>
            <input className='search_student_class' placeholder="Chon lop" list="opts" onChange={(e) => handleListOfClass(e)} name='searchStudentClass'/>
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
            {/*</form>*/}
            <div className='searchStudent_container'>
                <div className='searchStudent_content'>
                    <table>
                        <thead>
                        <tr>
                            <th id='name'>Tên</th>
                            <th id='class'>Gioi tinh</th>
                            <th id='avgmid1'>Nam sinh</th>
                            <th id='avgmid2'>Dia chi</th>
                        </tr>
                        </thead>

                        <tbody>
                        {Data
                            .filter((item) => {
                                // return search.toLowerCase() === '' ? '' : item.first_name.toLowerCase().includes(search)
                                if(search === '' && searchClass ==='') {
                                    return ""
                                }
                                else if(search != '' && searchClass ==='') {
                                    return item.first_name.toLowerCase().includes(search.toLowerCase())
                                }
                            })
                            .map((item) => (
                                <tr key={item.id}>
                                    <td id='name'>{item.first_name}</td>
                                    <td id='class'>{item.class}</td>
                                    <td id='avgmid1'>{item.avgMid1}</td>
                                    <td id='avgmid2'>{item.avgMid2}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                        <tbody>
                        {Data
                            .filter((item) => {
                                // return searchClass === '' ? '' : item.class.includes(searchClass)
                                if(search === '' && searchClass ==='') {
                                    return ""
                                }
                                else if(search === '' && searchClass !='') {
                                    return item.class.includes(searchClass)
                                }
                            })
                            .map((item) => (
                                <tr key={item.id}>
                                    <td id='name'>{item.first_name}</td>
                                    <td id='class'>{item.class}</td>
                                    <td id='avgmid1'>{item.avgMid1}</td>
                                    <td id='avgmid2'>{item.avgMid2}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                        <tbody>
                        {Data
                            .filter((item) => {
                                    if(search === '' && searchClass ==='') {
                                        return ""
                                    }
                                    else if(search != '' && searchClass !='') {
                                        return  item.class.includes(searchClass) && item.first_name.toLowerCase().includes(search.toLowerCase())
                                    }

                            })
                            .map((item) => (
                                <tr key={item.id}>
                                    <td id='name'>{item.first_name}</td>
                                    <td id='class'>{item.class}</td>
                                    <td id='avgmid1'>{item.avgMid1}</td>
                                    <td id='avgmid2'>{item.avgMid2}</td>
                                </tr>
                            ))
                        }
                        </tbody>


                    </table>
                </div>
            </div>
        </>
    )
}

export default StudentSearch