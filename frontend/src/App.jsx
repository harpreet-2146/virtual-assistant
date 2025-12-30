import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customize from './pages/Customize'
import Assistant from './pages/Assistant'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Assistant />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/customize' element={<Customize />} />
        </Routes>
    )
}

export default App