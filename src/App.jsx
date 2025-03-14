import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage' 
import SelectGraph from './pages/SelectGraph'
import SelectPara from './pages/SelectPara'

function App() {

  return (
    <>
      {/* Routing */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/select-graph" element={<SelectGraph />} />
        <Route path="/select-parameter" element={<SelectPara />} />
      </Routes>
    </>
  )
}

export default App
