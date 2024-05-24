import {Navigate, useLocation} from "react-router-dom";
import {useState} from "react";
import NavBar from "./NavBar.jsx";
import Login from "./login-signup/login.jsx";
function Home({ isLoggedIn }){
    const [logout, setLogout] = useState(false)
    const location = useLocation();

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
                <div className='home_container'>
                    <div className='home_content'>
                        <p>Status: {isLoggedIn ? 'Logged In' : 'Logged Out'}</p>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                </div>

            </>
        )
    }
}

export default Home
