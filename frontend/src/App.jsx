import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Customize from './pages/Customize'
import Assistant from './pages/Assistant'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Assistant />} />
            <Route path='/customize' element={<Customize />} />
        </Routes>
    )
}

export default App