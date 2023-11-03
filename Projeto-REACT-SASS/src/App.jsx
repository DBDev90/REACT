import { useState } from 'react'
import MainComtent from './components/MainComtent'
import Sidebar from './components/Sidebar'
import "./styles/components/app.sass"

function App() {
  return (
    <div id='portfolio'>
     <h1>Douglas Bordinassi</h1>
     <Sidebar/>
     <MainComtent/>
    </div>
  )
}

export default App
