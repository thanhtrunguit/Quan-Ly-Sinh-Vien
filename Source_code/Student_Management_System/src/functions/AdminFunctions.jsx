import React, { useState, useEffect } from "react";
import NavBar from "../NavBar.jsx";
import axios from "axios";

function AdminFunctions() {
    const [ageMax, setageMax] = useState('');
    const [ageMin, setageMin] = useState('');
    const [siso, setSiso] = useState('');
    const [classNameNew, setClassNameNew] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [addSubject, setAddsubject] = useState('');
    const [addClass, setaddClass] = useState('');
    const [dellSubject, setDellSubject] = useState('');
    const [dellClass, setDellClass] = useState('');
    const [score, setScore] = useState('');
    const [searchClass, setSearchClass] = useState('');
    const [subjectPicker, setSubjectPicker] = useState('');
    const [subjectPickerScore, setSubjectPickerScore] = useState('');
    const [listOfAccounts, setListOfAccounts] = useState([]);
    const [listOfClass, setlistOfClass] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [editIdx, setEditIdx] = useState(-1);
    const [editableRow, setEditableRow] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/dslop.php')
            .then(response => response.json())
            .then(data => setlistOfClass(data))
            .catch(error => console.error('Error fetching class list:', error));
    }, [addClass, classNameNew, dellClass, searchClass]);

    const [listOfSubs, setListOfSubs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/MAMON_get.php')
            .then(response => response.json())
            .then(data => setListOfSubs(data))
            .catch(error => console.error('Error fetching class list:', error));
    }, [dellSubject, addSubject, subjectPicker, subjectName]);

    useEffect(() => {
        fetch('http://localhost:8000/ACCOUNT_get.php')
            .then(response => response.json())
            .then(data => setListOfAccounts(data))
            .catch(error => console.error('Error fetching class list:', error));
    }, [role, account, password]);

    const handleCheckEmpty = () => {
        setMenuVisible(true);
    };

    const handleSetChangeAge = () => {
        let fdata = new FormData();
        fdata.append("ageMax", ageMax);
        fdata.append("ageMin", ageMin);
        axios.post('http://localhost:8000/handleChangeSetting.php', fdata)
            .then(() => {
                alert('Thay đổi thành công');
                setageMax('');
                setageMin('');
            })
            .catch(error => {
                console.error('Lỗi phát sinh, thử lại sau', error);
            });
    };

    const handleSetChanegLop = () => {
        let fdata = new FormData();
        if (searchClass !== "") {
            fdata.append("nhanlop", searchClass);
        }
        if (siso !== '') {
            fdata.append("nhansiso", siso);
        }
        if (classNameNew !== '') {
            fdata.append("tenlopmoi", classNameNew);
        }
        if (addClass !== '') {
            fdata.append("lopthem", addClass);
        }
        if (dellClass !== '') {
            fdata.append("lopxoa", dellClass);
        }
        axios.post('http://localhost:8000/class_settings.php', fdata)
            .then(() => {
                alert('Đã thay đổi thành công');
                setSiso('');
                setSearchClass('');
                setClassNameNew('');
                setaddClass('');
                setDellClass('');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const handleSetChanegMonHoc = () => {
        let fdata = new FormData();
        if (subjectName !== "") {
            fdata.append("subjectName", subjectName);
            fdata.append("id_monhoc", subjectPicker);
        }
        if (addSubject !== "") {
            fdata.append("actions_add", '1');
            fdata.append("TEN_MONHOC_add", addSubject);
        }
        if (dellSubject !== "") {
            fdata.append("actions_dell", '2');
            fdata.append("id_monhoc_dell", dellSubject);
        }
        axios.post('http://localhost:8000/SubjectChangeSetting.php', fdata)
            .then(() => {
                alert('Đã thay đổi thành công');
                setSubjectName('');
                setSubjectPicker('');
                setAddsubject('');
                setDellSubject('');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const handleSetChangeScore = () => {
        let fdata = new FormData();
        fdata.append("score", score);
        fdata.append('MAMON', subjectPickerScore);
        axios.post('http://localhost:8000/handleChangeSetting.php', fdata)
            .then(() => {
                alert('Đã thay đổi thành công');
                setScore('');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const addAccount = (e) => {
        e.preventDefault();
        if (role !== '' && account !== '' && password !== '') {
            let fdata = new FormData();
            fdata.append('account', account);
            fdata.append('password', password);
            fdata.append('role', role);
            axios.post('http://localhost:8000/AddAccount.php', fdata)
                .then(response => {
                    alert('Hoàn tất');
                    setRole('');
                    setAccount('');
                    setPassword('');
                    setMenuVisible(false);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            setMenuVisible(false);
        }
    };



    const handleEdit = (index) => {
        setEditIdx(index);
        setEditableRow({ ...listOfAccounts[index] });
    };

    const handleChange = (e, field) => {
        const { value } = e.target;
        setEditableRow({ ...editableRow, [field]: value });
    };

    const handleSave = (index) => {
        const updatedAccounts = [...listOfAccounts];
        updatedAccounts[index] = editableRow;
        setListOfAccounts(updatedAccounts);
        let fdata = new FormData();
        fdata.append('account', editableRow.ID_TAIKHOAN);
        fdata.append('role', editableRow.LOAI_TAIKHOAN);
        // fdata.append('idGV', editableRow.ID_GIAOVIEN);
        axios.post('http://localhost:8000/ChangeRole.php', fdata)
            .then(response => {
                alert('Hoàn tất');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        setEditIdx(-1);
    };
    const handleDelete = (index) => {
        const accountToDelete = listOfAccounts[index];
        let fdata = new FormData();
        fdata.append('accountID', accountToDelete.ID_TAIKHOAN);
        axios.post('http://localhost:8000/DeleteAccount.php', fdata)
            .then(() => {
                const updatedAccounts = listOfAccounts.filter((_, i) => i !== index);
                setListOfAccounts(updatedAccounts);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const handleCancel = () => {
        setEditIdx(-1);
        setEditableRow(null);
    };

    return (
        <>
            <NavBar />
            <div className='function_title'>
                <p>Admin</p>
            </div>
            <div className='adminSection'>
                <div className="adminTitle"><b>THAY ĐỔI ĐỘ TUỔI</b></div>
                <div className='age_section'>
                    <p>Tuổi tối thiểu:</p>
                    <input className='inputBar' type='number' onChange={(e) => setageMax(e.target.value)} value={ageMax} />
                    <p>Tuổi tối đa:</p>
                    <input className='inputBar' type='number' onChange={(e) => setageMin(e.target.value)} value={ageMin} />
                    <button className='btnA' onClick={handleSetChangeAge}>Ghi nhận</button>
                </div>
                <div className="adminTitle"><b>THAY ĐỔI LỚP</b></div>
                <div className='class_section'>
                    <select className='search_student_class' onChange={(e) => setSearchClass(e.target.value)} value={searchClass}>
                        <option value="">Chọn Lớp</option>
                        {listOfClass.length > 0 ? (
                            listOfClass.map((className, index) => (
                                <option key={index} value={className}>
                                    {className}
                                </option>
                            ))
                        ) : null}
                    </select>
                    <p>Sĩ số tối đa:</p>
                    <input className='inputBar' type='number' value={siso} onChange={(e) => setSiso(e.target.value)} />
                    <p>Tên lớp mới:</p>
                    <input className='inputBar' type='text' value={classNameNew} onChange={(e) => setClassNameNew(e.target.value)} />
                    <p>Thêm lớp:</p>
                    <input className='inputBar' type='text' value={addClass} onChange={(e) => setaddClass(e.target.value)} />
                    <p>Xóa lớp:</p>
                    <select className='search_student_class' onChange={(e) => setDellClass(e.target.value)} value={dellClass}>
                        <option value="">Chọn Lớp</option>
                        {listOfClass.length > 0 ? (
                            listOfClass.map((className, index) => (
                                <option key={index} value={className}>
                                    {className}
                                </option>
                            ))
                        ) : null}
                    </select>
                    <button className='btnA' onClick={handleSetChanegLop}>Ghi nhận</button>
                </div>

                <div className="adminTitle"><b>THAY ĐỔI MÔN HỌC</b></div>
                <div className='subject_section'>
                    <select className='search_student_class' onChange={(e) => setSubjectPicker(e.target.value)} value={subjectPicker}>
                        <option value="">Chọn Môn</option>
                        {listOfSubs.length > 0 ? (
                            listOfSubs.map((className, index) => (
                                <option key={index} value={className.ID_MONHOC}>
                                    {className.TEN_MONHOC}
                                </option>
                            ))
                        ) : <> </>}
                    </select>
                    <p>Tên môn mới:</p>
                    <input className='inputBar' type='text' value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
                    <p>Thêm môn:</p>
                    <input className='inputBar' type='text' value={addSubject} onChange={(e) => setAddsubject(e.target.value)} />
                    <p>Xóa môn:</p>
                    <select className='search_student_class' onChange={(e) => setDellSubject(e.target.value)} value={dellSubject}>
                        <option value="">Chọn Môn</option>
                        {listOfSubs.length > 0 ? (
                            listOfSubs.map((className, index) => (
                                <option key={index} value={className.ID_MONHOC}>
                                    {className.TEN_MONHOC}
                                </option>
                            ))
                        ) : null}
                    </select>
                    <button className='btnA' onClick={handleSetChanegMonHoc}>Ghi nhận</button>
                </div>

                {/* Score Section */}
                <div className="adminTitle"><b>THAY ĐỔI ĐIỂM ĐẠT</b></div>
                <div className='score_section'>
                    <select className='search_student_class' onChange={(e) => setSubjectPickerScore(e.target.value)} value={subjectPickerScore}>
                        <option value="">Chọn Môn</option>
                        {listOfSubs.length > 0 ? (
                            listOfSubs.map((className, index) => (
                                <option key={index} value={className.ID_MONHOC}>
                                    {className.TEN_MONHOC}
                                </option>
                            ))
                        ) : null}
                    </select>
                    <p>Điểm đạt tối thiểu:</p>
                    <input className='inputBar' type='number' value={score} onChange={(e) => setScore(e.target.value)} />
                    <button className='btnA' onClick={handleSetChangeScore}>Ghi nhận</button>
                </div>

                {/* Accounts Section */}
                <div className="adminTitle">
                    <b>DANH SÁCH TÀI KHOẢN</b>
                </div>
                <button className='btnA btnB' onClick={handleCheckEmpty}>Tạo tài khoản</button>
                <div className='studentScore_content searchStudent_content'>
                    {menuVisible && (
                        <div className="dim">
                            <div className="reg">
                                <div className="regTitle">TẠO TÀI KHOẢN</div>
                                <div className="classlessBox">
                                    <form onSubmit={addAccount} method='post'>
                                        <div className='form_content form_contentA'>
                                            <div className='form_item regT'>
                                                <p>Tên tài khoản</p>
                                                <input placeholder='GV' onChange={(e) => setAccount(e.target.value)} value={account} />
                                            </div>
                                            <div className='form_item regT'>
                                                <p>Mật khẩu</p>
                                                <input placeholder='123' type='text' onChange={(e) => setPassword(e.target.value)} value={password} />
                                            </div>
                                            <div className='form_item regT'>
                                                <p>Quyền hạn</p>
                                                <select className='search_student_class' id="opts" onChange={(e) => setRole(e.target.value)} value={role}>
                                                    <option value=''>Quyền hạn</option>
                                                    <option value='admin'>admin</option>
                                                    <option value='user'>user</option>
                                                </select>
                                            </div>
                                            <button className='btn login_btn submit_btn reg_btn' type='submit'>Ghi nhận</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    <table>
                        <thead>
                        <tr>
                            <th>ID Tài Khoản</th>
                            <th>ID Giáo Viên</th>
                            <th>Loại tài khoản</th>
                            <th>Thay đổi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listOfAccounts.map((accounts, index) => (
                            <tr key={index}>
                                {editIdx === index ? (
                                    <>
                                        <td>{editableRow.ID_TAIKHOAN}</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={editableRow.ID_GIAOVIEN}
                                                onChange={(e) => handleChange(e, 'ID_GIAOVIEN')}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={editableRow.LOAI_TAIKHOAN}
                                                onChange={(e) => handleChange(e, 'LOAI_TAIKHOAN')}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={() => handleSave(index)}>Save</button>
                                            <button onClick={handleCancel}>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{accounts.ID_TAIKHOAN}</td>
                                        <td>{accounts.ID_GIAOVIEN}</td>
                                        <td>{accounts.LOAI_TAIKHOAN}</td>
                                        <td>
                                            <button onClick={() => handleEdit(index)}>Edit</button>
                                            {/*<button onClick={() => handleDelete(index)}>Delete</button>*/}
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AdminFunctions;
