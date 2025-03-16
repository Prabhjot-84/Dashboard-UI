import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage' 
import SelectGraph from './pages/SelectGraph'
import SelectPara from './pages/SelectPara'
import { useEffect, useState } from 'react'

function App() {

  const [selectedGraph, setSelectedGraph] = useState(null);
  const [graphName, setGraphName] = useState("");
  const [Xaxis, setXAxis] = useState(null); // stores X parameter
  const [Yaxis, setYAxis] = useState(null); // store Y parameter
  const [Xlabel, setXlabel] = useState(Xaxis); // stores X label name
  const [Ylabel, setYlabel] = useState(Yaxis); // stores Y label name
  const [Zaxis, setZAxis] = useState(null); // stores parameter for pie & doughnut chart
  const [Zlabel, setZlabel] = useState(Zaxis); // stores label for pie & doughnut chart
  const [filters, setFilters] = useState([]); // Stores selected filters
  
  useEffect(() => {
    setXlabel(Xaxis);
    setYlabel(Yaxis);
    setZlabel(Zaxis);
  }, [Xaxis, Yaxis, Zaxis]);

  return (
    <>
      {/* Routing */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/select-graph" element={<SelectGraph selectedGraph={selectedGraph} setSelectedGraph={setSelectedGraph} />} />
        <Route path="/select-parameter" element={<SelectPara selectedGraph={selectedGraph} setSelectedGraph={setSelectedGraph} graphName={graphName} setGraphName={setGraphName} Xaxis={Xaxis} setXAxis={setXAxis} Yaxis={Yaxis} setYAxis={setYAxis} Xlabel={Xlabel} setXlabel={setXlabel} Ylabel={Ylabel} setYlabel={setYlabel} Zaxis={Zaxis} setZAxis={setZAxis} Zlabel={Zlabel} setZlabel={setZlabel} filters={filters} setFilters={setFilters} />} />
      </Routes>
    </>
  )
}

export default App
