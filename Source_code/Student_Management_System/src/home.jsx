import {Navigate} from "react-router-dom";
import {useState} from "react";
import NavBar from "./NavBar.jsx";
function Home(){
    const [logout, setLogout] = useState(false)

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
                        <p>home </p>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                </div>

            </>
        )
    }
}

export default Home
