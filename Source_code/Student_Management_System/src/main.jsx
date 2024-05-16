import {createRoot} from "react-dom/client";
import React from "react";
import APP from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import './index.css'

createRoot(document.getElementById('root')).render(
    <BrowserRouter><APP/></BrowserRouter>
)