import Login from "./login-signup/login.jsx";
import Home from "./home.jsx";
import { Route, Routes} from "react-router-dom";
import Functions from "./functions/function_hub.jsx";
import AddStudents from "./functions/add_students.jsx";
import CreateClass from "./functions/create_class.jsx";
import StudentSearch from "./functions/student_search.jsx";
import SubjectScore from "./functions/subject_score.jsx";
import NavBar from "./NavBar.jsx";
function APP(){
    return(
        <>
            {/*<NavBar/>*/}
            <div className='container'><Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/functions' element={<Functions/>}/>
                <Route path='/addStudent' element={<AddStudents/>}/>
                <Route path='/createClass' element={<CreateClass/>}/>
                <Route path='/studentSearch' element={<StudentSearch/>}/>
                <Route path='/subjectScore' element={<SubjectScore/>}/>
                <Route path='/finalReport' element={<Functions/>}/>
                {/*<Route path='/credit' element={<Home/>}/>*/}
            </Routes></div>


        </>
    )
}
export default APP