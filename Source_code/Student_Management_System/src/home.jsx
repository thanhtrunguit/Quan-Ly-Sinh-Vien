import {Navigate, useLocation} from "react-router-dom";
import {useState, useContext, useEffect} from "react";
import NavBar from "./NavBar.jsx";
import Login from "./login-signup/login.jsx";
import {MalopContext} from "./MalopContext.jsx";
import {UserRole} from "./UserRoleContext.jsx";

function Home({ isLoggedIn }){
    const [logout, setLogout] = useState(false)
    const location = useLocation();
    const { malopgv } = useContext(MalopContext);
    const { userrole } = useContext(UserRole);
    const [tengv, settengv] = useState('')

    useEffect(() => {
        let fdata = new FormData()
        fdata.append('malop', malopgv)
        fetch('http://localhost:8000/TENGV_get.php', {method: "POST", body: fdata})
            .then(response => response.json())
            .then(data => settengv(data))
            .catch(error => console.error('Error fetching class list:', error));
    }, []);
    const handleClick = () =>
    {
        setLogout(true)
    }
    if (logout){

        return(
            <Navigate to= '/' />
        )

    }
    else {
        return (
            <>
                <NavBar/>
                <div className='function_title'><p>TRANG CHỦ</p></div>
                <div className='home_container'>
                    <div className='home_content'>
                        <div className='HelloGv'>
                            {
                                userrole === 'admin' ?
                                    (
                                        <div className=''><p>{userrole}</p></div>
                                    )
                                    :
                                    (
                                        <div className=''><p>Giáo viên {tengv} </p></div>
                                    )
                            }
                        </div>
                        <p>Trạng thái: {isLoggedIn ? 'Hoạt động' : 'Logged Out'}</p>
                    </div>
                </div>
                <div className='bottomLine'><p>Website giáo viên - Trường THPT Abc, kênh thông tin hữu ích cho giáo viên </p></div>
            </>
        )
    }
}

export default Home
