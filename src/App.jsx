import { Route, Routes } from 'react-router-dom'
import './App.css'
import FrontPage from './components/FrontPage' 
import SecondPage from './components/SecondPage'

function App() {

  return (
    <>
      {/* Routing */}
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/SecondPage" element={<SecondPage />} />
      </Routes>
    </>
  )
}

export default App
