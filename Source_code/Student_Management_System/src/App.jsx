import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./login-signup/login.jsx";
import Home from "./home.jsx";
import Functions from "./functions/function_hub.jsx";
import AddStudents from "./functions/add_students.jsx";
import CreateClass from "./functions/create_class.jsx";
import StudentSearch from "./functions/student_search.jsx";
import SubjectScore from "./functions/subject_score.jsx";
import FinalReport from "./functions/final_report_hub.jsx";
import FinalReportSem from "./functions/final_report_semester (1).jsx";
import FinalReportSub from "./functions/final_report_subject (1).jsx";
import PrivateRoute from "./PrivRoute.jsx";
import {MalopProvider} from "./MalopContext.jsx";
import {UserRoleProvider} from "./UserRoleContext.jsx";
import AdminFunctions from "./functions/AdminFunctions.jsx";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    return (
        <div className='container'>
            <UserRoleProvider>
            <MalopProvider>
                <Routes>
                    <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path='/home' element={<PrivateRoute isLoggedIn={isLoggedIn}><Home isLoggedIn={isLoggedIn} /></PrivateRoute>} />
                    <Route path='/functions' element={<PrivateRoute isLoggedIn={isLoggedIn}><Functions /></PrivateRoute>} />
                    <Route path='/addStudent' element={<PrivateRoute isLoggedIn={isLoggedIn}><AddStudents /></PrivateRoute>} />
                    <Route path='/createClass' element={<PrivateRoute isLoggedIn={isLoggedIn}><CreateClass /></PrivateRoute>} />
                    <Route path='/studentSearch' element={<PrivateRoute isLoggedIn={isLoggedIn}><StudentSearch /></PrivateRoute>} />
                    <Route path='/subjectScore' element={<PrivateRoute isLoggedIn={isLoggedIn}><SubjectScore /></PrivateRoute>} />
                    <Route path='/finalReport' element={<PrivateRoute isLoggedIn={isLoggedIn}><FinalReport /></PrivateRoute>} />
                    <Route path='/finalReportSub' element={<PrivateRoute isLoggedIn={isLoggedIn}><FinalReportSub /></PrivateRoute>} />
                    <Route path='/finalReportSem' element={<PrivateRoute isLoggedIn={isLoggedIn}><FinalReportSem /></PrivateRoute>} />
                    <Route path='/adminFunctions' element={<PrivateRoute isLoggedIn={isLoggedIn}><AdminFunctions /></PrivateRoute>} />
                    <Route path='/ageSettings' element={<PrivateRoute isLoggedIn={isLoggedIn}><AdminFunctions /></PrivateRoute>} />
                    <Route path='/classSettings' element={<PrivateRoute isLoggedIn={isLoggedIn}><AdminFunctions /></PrivateRoute>} />
                    <Route path='/subjectSettings' element={<PrivateRoute isLoggedIn={isLoggedIn}><AdminFunctions /></PrivateRoute>} />
                    <Route path='/scoreSettings' element={<PrivateRoute isLoggedIn={isLoggedIn}><AdminFunctions /></PrivateRoute>} />
                </Routes>
            </MalopProvider>
            </UserRoleProvider>
        </div>
    );
}

export default App;
