import React from "react";
import SignUp from "./Compo/signup";
import Dashboard from "./Compo/Dashboard";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"


export default function App() {
    return (
        <>
            <BrowserRouter >
                <Routes>
                    <Route path="/signin" element={<SignUp />}></Route>
                    <Route path="/dashboard" element={<Dashboard />} ></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}