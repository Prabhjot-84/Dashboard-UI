import { Route, Routes } from 'react-router-dom'
import './App.css'
import FirstPage from './components/FirstPage' 
import SecondPage from './components/SecondPage'
import ThirdPage from './components/ThirdPage'
import ForthPage from './components/ForthPage'

function App() {

  return (
    <>
      {/* Routing */}
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/SecondPage" element={<SecondPage />} />
        <Route path="/ThirdPage" element={<ThirdPage />} />
        <Route path="/ForthPage" element={<ForthPage />} />
      </Routes>
    </>
  )
}

export default App
